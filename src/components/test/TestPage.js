import React, { useState, useEffect } from "react";
import { Container, Button, CardDeck, Card } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import classNames from "classnames";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import styled from 'styled-components';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from "html-to-draftjs";
import TestAutoMaking from './TestAutoMaking';
import parse from "node-html-parser";

import axios from "axios";

const TestPage = ({ isOpen, test_id }) => {
	const [test, setTest] = useState();
	const [title, setTitle] = useState('');
	const [state, setState] = useState('normal');
	const [buttonColor, setButtonColor] = useState('info');
	const [questionNum, setQuestionNum] = useState(0);

	const [answerList, setAnswerList] = useState([]);

	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [editorAnswer, setEditorAnswer] = useState(EditorState.createEmpty());
	const [question, setQuestion] = useState("");
	const [questionType, setQuestionType] = useState("");
	const [choiceList, setChoiceList] = useState([]);
	const [choiceColor, setChoiceColor] = useState([]);
	const [shortAnswer, setShortAnswer] = useState("");
	
	const [showExplanation, setShowExplanation] = useState(false);

	const [essayAnswerEditor, setEssayAnswerEditor] = useState(
		EditorState.createEmpty()
	);

	const [complete, setComplete] = useState(false);
	let htmlToEditor = "";
	let t_choiceColor = [];
	let htmlToEditor_answer = "";

	useEffect(() => {

		axios.get(`/api/testset/${test_id}`)
			.then(res => {
				console.log(res.data);
				setTest(res.data.test_set.rows[0]);
				setTitle(res.data.test_set.rows[0].title);
			})
			.catch(error => {
				alert(error.response.data.message);
			})
	}, []);

	useEffect(() => { }, [choiceList, choiceColor]);

	const modifyHandler = () => {
		if (state === 'normal') {
			setButtonColor('danger');
			setState('delete');
		} else {
			setButtonColor('info');
			setState('normal');
		}
	}
	const deleteHandler = (index, e) => {
		e.preventDefault();

		var result = window.confirm('해당 문제를 리스트에서 삭제 하시겠습니까?');

		if (result) {
			console.log(test.test_questions[index].id);
			let id = test.test_questions[index].id;

			axios.delete(`/api/testset/question/${id}`)
				.then(res => {
					alert(res.data.message);
					axios.get(`/api/testset/${test_id}`)
						.then(res => {
							setTest(res.data.test_set.rows[0]);
						})
						.catch(error => {
							alert(error.response.data.message);
						})
				})
				.catch(error => {
					alert(error.response.data.message);
				})

		}
	}

	const initVar = () => {
		htmlToEditor_answer = "";
		t_choiceColor = [];
		htmlToEditor = "";
		setComplete(false);
		setShortAnswer('');
	}

	const loadNextQuestion = () => {
		initVar();

		startHandler();
	}

	const convertUploadedImageUrls = function (content) {
		const root = parse(content);
		const img_tags = root.querySelectorAll("img");

		for (let i = 0; i < img_tags.length; i++) {

			let src_attribute = img_tags[i].getAttribute("src");

			img_tags[i].setAttribute("src", "http://localhost:8002" + src_attribute);
			img_tags[i].setAttribute("target", "_blank");
		}
		return root.toString();
	};

	const startHandler = () => {
		setState('test');

		axios.get(`/api/question/${test.test_questions[questionNum].question.id}`).then((res) => {
			console.log(res.data);

			res.data.question.content = convertUploadedImageUrls(res.data.question.content);
			console.log(res.data.question.content);

			setQuestionType(res.data.question.type);
			setQuestion(res.data.question);
			/*
			setPointControl({
				points_to_own: res.data.question.points_to_own, 
				points_to_solve: res.data.question.points_to_solve,
				points_to_unlock: res.data.question.points_to_unlock,
			})
			*/
			if (res.data.question.type === "multiple_choice") {
				let t_choiceList = [];


				for (var i in res.data.question.multiple_choice_items) {
					t_choiceList.push({
						item_text: res.data.question.multiple_choice_items[i].item_text,
					});
					t_choiceColor.push("black");
				}
				setChoiceList([...t_choiceList]);
				setChoiceColor([...t_choiceColor]);
			}

			htmlToEditor = res.data.question.content;

			const blocksFromHtml = htmlToDraft(htmlToEditor);
			if (blocksFromHtml) {
				const { contentBlocks, entityMap } = blocksFromHtml;

				const contentState = ContentState.createFromBlockArray(
					contentBlocks,
					entityMap
				);

				const t_editorState = EditorState.createWithContent(contentState);
				setEditorState(t_editorState);
			}

		});
	}

	// 정답을 불러오는 함수
	const loadAnswer = () => {
    if (questionType === "multiple_choice") {
      let answerArray = "";
      for (var i in question.multiple_choice_items) {
        if (question.multiple_choice_items[i].checked === 1) {
          i *= 1;
          i += 1;
          i += "";

          answerArray += i;
          answerArray += "번, ";
        }
      }
      setAnswerList([answerArray.substring(0, answerArray.length - 2)]);
    } else if (questionType === "short_answer") {
      let answerList = [];

      for (var i in question.short_answer_items) {
        answerList.push(question.short_answer_items[i].item_text + " ");
      }

      setAnswerList([...answerList]);
    } else {
      axios.get(`/api/answer?question_id=${test.test_questions[questionNum].question.id}`).then((res) => {
        console.log(res.data);

        htmlToEditor_answer = res.data.answers.rows[0].content;

        const blocksFromHtml = htmlToDraft(htmlToEditor_answer);
        if (blocksFromHtml) {
          const { contentBlocks, entityMap } = blocksFromHtml;

          const contentState = ContentState.createFromBlockArray(
            contentBlocks,
            entityMap
          );

          const t_editorState_answer = EditorState.createWithContent(
            contentState
          );
          setEssayAnswerEditor(t_editorState_answer);
        }
      });
    }
  };

	// 풀이 제출 - 정답 확인 함수
	const submitHandler = (event) => {
		event.preventDefault();

		var result;

		result = window.confirm("풀이를 제출하시겠습니까?");

		if (result) {

			console.log('testNum:', questionNum);

			axios
				.get(`/api/question/solve/${test.test_questions[questionNum].question.id}`)
				.then((res) => {
					console.log(res.data);

					if (questionType === "multiple_choice") {
						let rightAnswer = true;
		
						for (var i in question.multiple_choice_items) {
							if (
								(question.multiple_choice_items[i].checked === 1 &&
									choiceColor[i] === "black") ||
								(question.multiple_choice_items[i].checked === 0 &&
									choiceColor[i] === "red")
							) {
								rightAnswer = false;
							}
						}
						if (rightAnswer) {
							alert("정답입니다.");
						} else {
							alert("오답입니다.");
						}
					} else if (questionType === "short_answer") {
						let rightAnswer = false;
						for (var i in question.short_answer_items) {
							if (question.short_answer_items[i].item_text === shortAnswer) {
								rightAnswer = true;
								alert("정답입니다.");
							}
						}
						if (!rightAnswer) {
							alert("오답입니다.");
						}
					} else {
						alert("정답과 비교해보세요!");
						openAnswer();
					}
		
					setComplete(true);
					loadAnswer();
		
					// 문제 넘버 + 1
					if (questionNum + 1 < test.test_questions.length) {
						setQuestionNum(questionNum + 1);
					} else {
						alert('시험이 끝났습니다.');
					}
				})
				.catch((error) => {
					alert(error.response.data.message);
				});

		}
	};


	// 서술형 답변 작성 함수
	const onEditorStateChange = (editorState) => {
		// editorState에 값 설정
		setEditorAnswer(editorState);
	};

	// 주관식 답변 작성 함수
	const makeAnswer = (e) => {
		setShortAnswer(e.target.value);
	};

	// 서술형 답안 제출의 정답 확인 함수
	const openAnswer = () => {
		axios.get(`/api/answer?question_id=${test.test_questions[questionNum].question.id}`).then((res) => {
			console.log(res.data);

			htmlToEditor_answer = res.data.answers.rows[0].content;

			const blocksFromHtml = htmlToDraft(htmlToEditor_answer);
			if (blocksFromHtml) {
				const { contentBlocks, entityMap } = blocksFromHtml;

				const contentState = ContentState.createFromBlockArray(
					contentBlocks,
					entityMap
				);

				const t_editorState_answer = EditorState.createWithContent(
					contentState
				);
				setEssayAnswerEditor(t_editorState_answer);
			}
		});

		setShowExplanation(true);
	};

	// 객관식 문제 선택 함수
	const selectAnswer = (index, e) => {
		t_choiceColor = choiceColor;

		if (choiceColor[index] === "black") {
			t_choiceColor[index] = "red";
		} else {
			t_choiceColor[index] = "black";
		}
		setChoiceColor([...t_choiceColor]);
	};

	return (
		<Container
			fluid
			className={classNames("content", { "is-open": isOpen })}
		>
			<div className="d-flex bd-highlight mb-3">
				<div className="mr-auto p-2 bd-highlight">
					<h4 style={{ fontWeight: "bolder" }}>
						{title}
					</h4>
				</div>
				<div className="p-2 bd-highlight">

					<Button variant={buttonColor} style={{ width: '19rem', height: '2.5rem' }} onClick={modifyHandler}
					>문제 수정</Button>&nbsp;
						<Button variant="info" style={{ width: '19rem', height: '2.5rem' }} onClick={startHandler}
					>시험 시작</Button>
				</div>
			</div>
			<hr />
			<ul>
				{(state === 'delete') ? <div className="row h-100 justify-content-center align-items-center">
					<CardDeck style={{ width: '20rem', justifyContent: 'center', alignItems: 'center' }}>
						{test.test_questions.map((i, index) =>
							<div className="container h-100" key={i.id}>
								<div className="row h-100 justify-content-center align-items-center">

									<Card className="text-center" variant="info" style={{ width: '20rem' }}>
										<Card.Body><div style={{ fontWeight: "lighter" }}>{i.question.title}
										</div>
										</Card.Body>
									</Card>
									<Button
										variant='danger'
										onClick={(e) => deleteHandler(index, e)}
									>삭제</Button>

								</div>
								<br />
							</div>
						)}
					</CardDeck>
				</div>
					: (state === 'test') ? <div style={{ width: "50rem" }}>
						<Card.Header>
							<div className="d-flex bd-highlight mb-3" style={{ height: "1rem" }}>
								<div className="mr-auto p-2 bd-highlight">
									<div style={{ fontWeight: "bold", fontsize: "rem" }}>
										#{question.id}
									</div>
								</div>
							</div>
						</Card.Header>
						<Card
							className="center"
							style={{
								height: "20rem !important",
								overflow: "auto",
							}}
						>
							<Card.Body>
								<div style={{ fontWeight: "bold" }}>제목: {question.title} </div>
								<br />
								<div style={{ height: "200px !important" }}>
									<Editor
										toolbarHidden
										// 에디터와 툴바 모두에 적용되는 클래스
										wrapperClassName="wrapper-class"
										// 에디터 주변에 적용된 클래스
										editorClassName="editor"
										// 툴바 주위에 적용된 클래스
										toolbarClassName="toolbar-class"
										editorState={editorState}
										readOnly
										// 한국어 설정
										localization={{
											locale: "ko",
										}}
									/>
								</div>
							</Card.Body>
						</Card>
						<div className="row h-100 justify-content-center ">
							<div style={{ width: "25rem", border: '1px solid black' }}>
								{questionType === "multiple_choice" && choiceList !== null ? <div>
									<div style={{ textAlign: 'center', }}>위 문제에 대한 알맞은 정답을 선택하세요.</div><br />
									{choiceList.map((i, index) => (
										//선택지 버튼 출력 부분
										<div key={index} style={{ textAlign: 'center', }}>
											<Button
												variant="outline-light"
												style={{
													color: choiceColor[index],
													backgroundColor: "lavender",
													width: '10rem',
												}}
												onClick={(e) => {
													selectAnswer(index, e);
												}}
											>
												{"("}
												{index + 1}
												{")"} {i.item_text}
											</Button>
											<br />
										</div>
									))}
								</div> : questionType === "short_answer" ? <div>
									<div style={{ textAlign: 'center'}}>
										<div>아래에 정답을 입력하세요.</div><br />
	
									<input
										type="text"
										id="title"
										className="input"
										style={{ height: "2rem", textAlign: 'center' }}
										onChange={(e) => makeAnswer(e)}
									/></div>
									<br/>
								</div> : questionType === "essay" ? <div style={{ height: "25rem auto" }}>
									<div style={{ textAlign: 'center', }}>답변을 작성하세요.</div>
									<div style={{ height: "25rem", overflow: "auto" }}>
										<Editor
											// 툴바 설정
											toolbar={{
												// inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
												inline: { inDropdown: true },
												list: { inDropdown: true },
												textAlign: { inDropdown: true },
												link: { inDropdown: true },
												history: { inDropdown: true },
											}}
											placeholder="내용을 작성해주세요."
											// 한국어 설정
											localization={{
												locale: "ko",
											}}
											// 초기값 설정
											editorState={editorAnswer}
											// 에디터의 값이 변경될 때마다 onEditorStateChange 호출
											onEditorStateChange={onEditorStateChange}
										/></div>
								</div> : <div></div>
								}
							</div>
							<div style={{ width: "25rem", border: '1px solid black', textAlign: 'center', display: 'inline-block' }}>
								<div>
								<Button
									className="btn pull-right"
									variant="info"
									onClick={submitHandler}
								>
									풀이 제출
                </Button>&nbsp;
								{
									(complete) &&
									<Button
										className="btn pull-right"
										variant="info"
										onClick={loadNextQuestion}
									>
										다음 문제
                </Button>
								} </div>
								<br/>
								{
									(complete) &&
										(questionType === "short_answer" ||
											questionType === "multiple_choice") ? (
											<div>
												{answerList.map((i, index) => (
													<div key={index} >
														<Card className="center" style={{ width:'50%', textAlign: 'center'}}>
															<Card.Body style={{ backgroundColor: "white" }}>
																{i}
																<br />
															</Card.Body>
														</Card>
														<br />
													</div>
												))}
											</div>
										) : (complete) && questionType === "essay" ? (
											<div>
												<Card style={{ backgroundColor: "#f7feff" }}>
													<Card
														className="center"
														style={{ height: "20rem !important" }}
													>
														<Card.Body>
															<br />
															<Editor
																toolbarHidden
																// 에디터와 툴바 모두에 적용되는 클래스
																wrapperClassName="wrapper-class"
																// 에디터 주변에 적용된 클래스
																editorClassName="editor"
																// 툴바 주위에 적용된 클래스
																toolbarClassName="toolbar-class"
																editorState={essayAnswerEditor}
																readOnly
																// 한국어 설정
																localization={{
																	locale: "ko",
																}}
															/>
														</Card.Body>
													</Card>
												</Card>
											</div>
										) : (
											<div></div>
										)}
							</div>
							
						</div>
					</div> : <div></div>}
			</ul>
		</Container >
	);
}

export default TestPage;