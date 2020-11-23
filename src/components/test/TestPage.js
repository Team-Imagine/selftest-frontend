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
	const [Num, setNum] = useState(0);

	const [answerList, setAnswerList] = useState([]);

	const [submittedAnswer, setSubmittedAnswer] = useState([]);

	const [editorState, setEditorState] = useState([]);

	const [editorAnswer, setEditorAnswer] = useState(EditorState.createEmpty());

	const [question, setQuestion] = useState("");
	const [questionType, setQuestionType] = useState("");
	const [choiceList, setChoiceList] = useState([]);
	const [choiceColor, setChoiceColor] = useState([]);
	const [shortAnswer, setShortAnswer] = useState("");

	const [testEnd, setTestEnd] = useState(false);

	const [testResult, setTestResult] = useState([]);

	const [showExplanation, setShowExplanation] = useState(false);

	const [essayAnswerEditor, setEssayAnswerEditor] = useState(
		EditorState.createEmpty()
	);

	const [complete, setComplete] = useState(false);
	let htmlToEditor = "";
	let t_choiceColor = [];
	let htmlToEditor_answer = "";
	let short_answer = "";

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

		let t_state = [];
		let t_question = [];
		let t_type = [];
		for (var i = 0; i < test.test_questions.length; i++) {
			test.test_questions[i].question.content = convertUploadedImageUrls(test.test_questions[i].question.content);

			htmlToEditor = test.test_questions[i].question.content;

			const blocksFromHtml = htmlToDraft(htmlToEditor);
			if (blocksFromHtml) {
				const { contentBlocks, entityMap } = blocksFromHtml;

				const contentState = ContentState.createFromBlockArray(
					contentBlocks,
					entityMap
				);

				const t_editorState = EditorState.createWithContent(contentState);
				t_state.push(t_editorState);
			}

			t_question.push(test.test_questions[i].question);

			if (test.test_questions[i].question.type === "multiple_choice") {
				let t_colorList = [];
				for (var j = 0; j < test.test_questions[i].question.multiple_choice_items.length; j++) {
					t_colorList.push({ color: 'black' });
				}
				t_type.push({ choiceList: test.test_questions[i].question.multiple_choice_items, choiceColor: t_colorList });
			} else if (test.test_questions[i].question.type === "short_answer") {
				t_type.push({ answer: '' });
			} else {
				t_type.push({ essay_answer: EditorState.createEmpty() });
			}
		}
		setEditorState(t_state);
		setQuestion(t_question);
		setSubmittedAnswer(t_type);
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
			axios.get(`/api/answer?question_id=${test.test_questions[Num].question.id}`).then((res) => {
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

	const moveHandler = (value, e) => {
		e.preventDefault();

		if (value) {
			if (Num < test.test_questions.length - 1)
				setNum(Num + 1);
		} else {
			if (Num > 0)
				setNum(Num - 1);
		}
	}


	// 서술형 답변 작성 함수
	const onEditorStateChange = (editorState) => {
		setSubmittedAnswer(
			submittedAnswer.map((i, index) =>
				index === Num ? { ...i, essay_answer: editorState } : i
			)
		)
	};
	// 주관식 답변 작성 함수
	const makeAnswer = (e) => {
		setSubmittedAnswer(
			submittedAnswer.map((i, index) =>
				index === Num ? { ...i, answer: e.target.value } : i
			)
		)
	};
	// 객관식 답변 선택 함수
	const selectAnswer = (t_index, e) => {
		let t_answer = submittedAnswer;

		if (submittedAnswer[Num].choiceColor[t_index].color === 'black') {
			t_answer[Num].choiceColor[t_index].color = 'red';
		} else {
			t_answer[Num].choiceColor[t_index].color = 'black';
		}
		setSubmittedAnswer([...t_answer]);
	};

	// 시험 제출 후 정답을 확인하는 함수
	const testSubmitHandler = async () => {
		alert('시험 제출');

		console.log('test result:', submittedAnswer);

		axios.get(`/api/testset/${test.id}/answers`)
			.then(res => {
				console.log(res.data);

				let loadedQuestion = res.data.test_set.test_questions.rows;

				let t_answer = [];

				for (var i = 0; i < loadedQuestion.length; i++) {
					if (loadedQuestion[i].question.type === 'short_answer') {
						let t_short = [];
						for (var j = 0; j < loadedQuestion[i].question.short_answer_answers.length; j++) {
							t_short.push(loadedQuestion[i].question.short_answer_answers[j].item_text);
						}

						let t_editorState_answer = EditorState.createEmpty();
						if (loadedQuestion[i].question.answers.length !== 0) {
							htmlToEditor_answer = loadedQuestion[i].question.answers[0].content;

							const blocksFromHtml = htmlToDraft(htmlToEditor_answer);
							
							if (blocksFromHtml) {
								const { contentBlocks, entityMap } = blocksFromHtml;

								const contentState = ContentState.createFromBlockArray(
									contentBlocks,
									entityMap
								);

								t_editorState_answer = EditorState.createWithContent(
									contentState
								);
							}
						}

						t_answer.push({ answer: t_short, solution: t_editorState_answer });
					} else if (loadedQuestion[i].question.type === 'multiple_choice') {
						let t_choice = [];
						for (var j = 0; j < loadedQuestion[i].question.multiple_choice_answers.length; j++) {
							t_choice.push(loadedQuestion[i].question.multiple_choice_answers[j].item_text);
						}

						let t_editorState_answer = EditorState.createEmpty();
						if (loadedQuestion[i].question.answers.length !== 0) {
							htmlToEditor_answer = loadedQuestion[i].question.answers[0].content;

							const blocksFromHtml = htmlToDraft(htmlToEditor_answer);
							
							if (blocksFromHtml) {
								const { contentBlocks, entityMap } = blocksFromHtml;

								const contentState = ContentState.createFromBlockArray(
									contentBlocks,
									entityMap
								);

								t_editorState_answer = EditorState.createWithContent(
									contentState
								);
							}
						}
						t_answer.push({ answer: t_choice, solution: t_editorState_answer });

					} else {
						let t_editorState_answer = EditorState.createEmpty();
						
						if (loadedQuestion[i].question.answers.length !== 0) {
							
							htmlToEditor_answer = loadedQuestion[i].question.answers[0].content;

							const blocksFromHtml = htmlToDraft(htmlToEditor_answer);
							
							if (blocksFromHtml) {
								const { contentBlocks, entityMap } = blocksFromHtml;

								const contentState = ContentState.createFromBlockArray(
									contentBlocks,
									entityMap
								);

								t_editorState_answer = EditorState.createWithContent(
									contentState
								);
							}
						}
						
						t_answer.push({ answer: "", solution: t_editorState_answer });
					}
				}

				showScore(t_answer);
			})
			.catch((error) => {
				alert(error.response.data.message);
			});

	}

	const showScore = (answerLoaded) => {
		let t_testResult = [];

		console.log('answer:', answerLoaded);
		for (var i = 0; i < answerLoaded.length; i++) {
			if (question[i].type === "multiple_choice") {

				let count = 0;
				let check = false;
				for (var j = 0; j < submittedAnswer[i].choiceColor.length; j++) {
					for (var k = 0; k < answerLoaded[i].answer.length; k++) {
						if (submittedAnswer[i].choiceColor[j].color === 'red') {
							check = true;
							if(submittedAnswer[i].choiceList[j].item_text === answerLoaded[i].answer[k]) 
								count += 1;
						}
					}
				}
				if ((count === answerLoaded[i].answer.length) && answerLoaded[i].answer.length !== 0) {
					t_testResult.push(1);
				} else if (!check && answerLoaded[i].answer.length === 0) {
					t_testResult.push(1);
				} else {
					t_testResult.push(0);
				}
			} else if (question[i].type === "short_answer") {
				let check = false;
				for (var j = 0; j < answerLoaded[i].answer.length; j++) {
					if (answerLoaded[i].answer[j] === submittedAnswer[i].answer) {
						check = true;
					}
				}
				if (check) {
					t_testResult.push(1);
				} else {
					t_testResult.push(0);
				}
			} else {
				t_testResult.push(2);
			}
		}
		setTestResult(t_testResult);

		console.log(t_testResult);
	}

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
					{(state !== 'test') ? <div>
						<Button variant={buttonColor} style={{ width: '19rem', height: '2.5rem' }} onClick={modifyHandler}
						>문제 수정</Button>&nbsp;
						<Button variant="info" style={{ width: '19rem', height: '2.5rem' }} onClick={startHandler}
						>시험 시작</Button> </div> : <div>
							<Button variant="info" style={{ width: '19rem', height: '2.5rem' }} onClick={testSubmitHandler}
							>시험 제출</Button>
						</div>
					}
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
					: (state === 'test') ? <div style={{ width: "50rem", left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>

						<div style={{ width: "50rem", left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto' }}>

							<Card
								className="center"
								style={{
									height: "20rem !important",
									overflow: "auto",
								}}
							>
								<Card.Body>
									<div style={{ float: 'left', fontWeight: "bold" }}>제목: {question[Num].title} </div>
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
											editorState={editorState[Num]}
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
								<div style={{ width: "50rem", border: '0.1px ridge #dddddd' }}>
									{question[Num].type === "multiple_choice" && submittedAnswer[Num].choiceList !== null ? <div>
										<div style={{ textAlign: 'center' }}>위 문제에 대한 알맞은 정답을 선택하세요.</div><br />
										{submittedAnswer[Num].choiceList.map((i, index) => (
											//선택지 버튼 출력 부분
											<div key={index} style={{ textAlign: 'center', }}>
												<Button
													variant="outline-light"
													style={{
														color: submittedAnswer[Num].choiceColor[index].color,
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
										))} <br />
									</div> : question[Num].type === "short_answer" ? <div>
										<div style={{ textAlign: 'center' }}>
											<div>아래에 정답을 입력하세요.</div><br />

											<input
												type="text"
												value={submittedAnswer[Num].answer}
												id="title"
												className="input"

												style={{ height: "2rem", textAlign: 'center' }}
												onChange={(e) => makeAnswer(e)}
											/></div>
										<br />
									</div> : question[Num].type === "essay" ? <div style={{ height: "25rem auto" }}>
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
												editorState={submittedAnswer[Num].essay_answer}
												// 에디터의 값이 변경될 때마다 onEditorStateChange 호출
												onEditorStateChange={onEditorStateChange}
											/></div>
									</div> : <div></div>
									}
								</div>
								{Num !== 0 ?
									<Button
										variant="info"
										style={{
											width: '5rem',
										}}
										onClick={(e) => moveHandler(false, e)}
									>
										이전
						</Button> : <div style={{ width: '5rem' }}></div>
								}
						&nbsp;&nbsp;
						{Num !== test.test_questions.length - 1 ? <Button
									variant="info"
									style={{
										width: '5rem',
									}}
									onClick={(e) => moveHandler(true, e)}
								>
									다음
						</Button> : <div style={{ width: '5rem' }}></div>}
							</div>
							{testEnd && <div>

							</div>}
						</div>
					</div> : <div></div>}
			</ul>
		</Container >
	);
}

export default TestPage;