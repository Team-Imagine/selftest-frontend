import React, { useState, useEffect } from "react";
import { Container, Button, Text, CardDeck } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';

import classNames from "classnames";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Card from "react-bootstrap/Card";
import styled from 'styled-components';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import store from "../store";

import axios from "axios";

const MyBlock = styled.div`
    .wrapper-class{
		width: 100%;
        margin: 0;
				margin-bottom: 1rem;
				justify-content: center;
    }
  	.editor {
    height: auto;
    border: 1px solid #f1f1f1 !important;
    padding: 5px !important;
		border-radius: 2px !important;
		background-color: white;
		}
		.input {
			width: 100%;
			margin: 0;
			margin-bottom: 1rem;
			height: 60px !important;
			border: 1px solid #f1f1f1 !important;
    	padding: 5px !important;
			border-radius: 2px !important;
			background-color: white;
		}
	`;

const SolveQuestion = ({ subject, course, question_id, isOpen }) => {
	// useState로 상태관리하기 초기값은 EditorState.createEmpty()
	// EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [editorAnswer, setEditorAnswer] = useState(EditorState.createEmpty());
	const [question, setQuestion] = useState('');
	const [questionType, setQuestionType] = useState('');
	const [choiceList, setChoiceList] = useState([]);
	const [choiceColor, setChoiceColor] = useState([]);
	const [shortAnswer, setShortAnswer] = useState('');
	const [title, setTitle] = useState('');
	const [isOwned, setIsOwned] = useState(false);
	const [showAnswer, setShowAnswer] = useState('');
	const [answerList, setAnswerList] = useState([]);
	const [essayAnswerEditor, setEssayAnswerEditor] = useState(EditorState.createEmpty());
	const [showExplanation, setShowExplanation] = useState(false);
	let history = useHistory();
	let htmlToEditor = '';
	let htmlToEditor_answer = '';
	let t_choiceColor = [];

	useEffect(() => {
		if (store.getState().isLoggedIn) {
			axios.get(`/api/question/${question_id}`)
				.then(res => {
					console.log(res.data);

					setQuestionType(res.data.question.type);
					setQuestion(res.data.question);

					if (res.data.question.type === "multiple_choice") {
						let t_choiceList = [];

						for (var i in res.data.question.multiple_choice_items) {
							t_choiceList.push({ item_text: res.data.question.multiple_choice_items[i].item_text });
							t_choiceColor.push('black');
						}
						setChoiceList([...t_choiceList]);
						setChoiceColor([...t_choiceColor]);
					}

					htmlToEditor = res.data.question.content;

					const blocksFromHtml = htmlToDraft(htmlToEditor);
					if (blocksFromHtml) {
						const { contentBlocks, entityMap } = blocksFromHtml;

						const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

						const t_editorState = EditorState.createWithContent(contentState);
						setEditorState(t_editorState);
					}
				})

		} else {
			alert('로그인이 필요한 기능입니다.');
			history.push(`/subject/${subject}/${course}`);
			history.push("/login");

		}
	}, []);

	const moveBack = () => {
		history.push(`/subject/${subject}/${course}/${question_id}`);
	}

	const onEditorStateChange = (editorState) => {
		// editorState에 값 설정
		setEditorAnswer(editorState);
	};

	useEffect(() => {
		console.log(choiceColor);
	}, [choiceList, choiceColor]);


	const submitHandler = (event) => {
		event.preventDefault();

		if (questionType === "multiple_choice") {
			let rightAnswer = true;

			for (var i in question.multiple_choice_items) {

				if (question.multiple_choice_items[i].checked === 1 && choiceColor[i] === 'black'
					|| question.multiple_choice_items[i].checked === 0 && choiceColor[i] === 'red') {
					rightAnswer = false;
				}
			}
			if (rightAnswer) {
				alert('정답입니다.');
			} else {
				alert('오답입니다.');
			}
		} else if (questionType === "short_answer") {
			let rightAnswer = false;
			for (var i in question.short_answer_items) {


				if (question.short_answer_items[i].item_text === shortAnswer) {
					rightAnswer = true;
					alert('정답입니다.');
				}
			}
			if (!rightAnswer) {
				alert('오답입니다.');
			}
		} else {
			alert('정답과 비교해보세요!');
			appearAnswer();
		}
	}

	const onChange = (e) => {
		setTitle(e.target.value);
	}

	const selectAnswer = (index, e) => {
		t_choiceColor = choiceColor;

		if (choiceColor[index] === 'black') {
			t_choiceColor[index] = 'red';
		} else {
			t_choiceColor[index] = 'black';
		}
		setChoiceColor([...t_choiceColor]);
	}

	const makeAnswer = (e) => {
		setShortAnswer(e.target.value);
	}

	const appearAnswer = () => {
		if(questionType ==="multiple_choice") {
			let answerArray = '';
			for(var i in question.multiple_choice_items) {
				if(question.multiple_choice_items[i].checked === 1) {
					i *= 1;
					i += 1;
					i += '';
	
					answerArray += i;
					answerArray += "번, "
				}
			}
			setAnswerList([answerArray.substring(0, answerArray.length -2)]);
			setShowAnswer(1);
		} else if(questionType ==="short_answer") {
			let answerList = [];
			
			for(var i in question.short_answer_items) {
				answerList.push(question.short_answer_items[i].item_text + " ");
			}
			
			setAnswerList([...answerList]);
			setShowAnswer(1);
		} else {
			axios.get(`/api/answer?question_id=${question_id}`)
			.then(res => {
				console.log(res.data);

				htmlToEditor_answer = res.data.answers.rows[0].content;

				const blocksFromHtml = htmlToDraft(htmlToEditor_answer);
				if (blocksFromHtml) {
					const { contentBlocks, entityMap } = blocksFromHtml;

					const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

					const t_editorState_answer = EditorState.createWithContent(contentState);
					setEssayAnswerEditor(t_editorState_answer);
				}
			})

			setShowAnswer(1);
		}
	}

	const isOwnedHandler = (e) => {
		e.preventDefault();

		setIsOwned(true);
		alert("문제가 소장되었습니다!")
	}

	const show_Explanation = () => {
		axios.get(`/api/answer?question_id=${question_id}`)
			.then(res => {
				console.log(res.data);

				htmlToEditor_answer = res.data.answers.rows[0].content;

				const blocksFromHtml = htmlToDraft(htmlToEditor_answer);
				if (blocksFromHtml) {
					const { contentBlocks, entityMap } = blocksFromHtml;

					const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

					const t_editorState_answer = EditorState.createWithContent(contentState);
					setEssayAnswerEditor(t_editorState_answer);
				}
		})

		setShowExplanation(true);
	}

	return (
		<Container
			fluid
			className={classNames("content", { "is-open": { isOpen } })}
		>
			<div className="d-flex bd-highlight mb-3">
				<div className="mr-auto p-2 bd-highlight">
					<div style={{ height: '2.5rem' }}>
						<h4 style={{ fontWeight: "bolder" }}>
							과목 {'>'} {subject} {'>'} {course} {'>'} 문제 풀이
			</h4>
					</div>
				</div>
				<div className="p-2 bd-highlight">
					<div>
						<Button variant="info" style={{ width: '19rem', height: '2.5rem'}} onClick={isOwnedHandler}
						>문제 소장</Button>
					</div>
				</div>
			</div>

			<hr />
			<div className="column justify-content-center align-items-center">
				<Card border="light" style={{ backgroundColor: "#f7feff" }}>
					<Card className="center" style={{ width: '85rem', height: '20rem' }}>
						<Card.Header>
						#{question.id} {subject} - {course}
						</Card.Header>
						<Card.Body>
						<div style={{fontWeight:"bold"}}>제목: {question.title} </div>
						<br/>
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
									locale: 'ko',
								}}
							/>
						</Card.Body>
					</Card>

				</Card>

				<div>
					<br />
					{
						(questionType === "multiple_choice" && choiceList !== null) ?
					
							<div>
									<div>
									<p> 위 문제에 대한 알맞은 정답을 선택하세요.</p>
									</div>
									
								{choiceList.map((i, index) =>
									
									<div key={index}>
										<Button variant="outline-light" style={{width: '40rem', color: choiceColor[index], backgroundColor:"lavender" }} onClick={(e) => { selectAnswer(index, e) }}>{'('}{index + 1}{')'} {i.item_text}</Button><br />
									</div>	
								)}
								<br/>
								
							</div>
							: (questionType === "short_answer") ? <div>
								<div>
									<p> 아래에 정답을 입력하세요.</p>
									</div>
								
								<div><input type="text" id="title" className="input" style={{ width: "85rem", height: "3rem"}} onChange={(e) => makeAnswer(e)} /><br/> </div> 
							</div> : <div>
								
									<MyBlock style={{ width: '85rem' }}>
										<br />
										<div style={{ height: '17rem' }}>
											<Editor
												// 에디터와 툴바 모두에 적용되는 클래스
												wrapperClassName="wrapper-class"
												// 에디터 주변에 적용된 클래스
												editorClassName="editor"
												// 툴바 주위에 적용된 클래스
												toolbarClassName="toolbar-class"
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
													locale: 'ko',
												}}
												// 초기값 설정
												editorState={editorAnswer}
												// 에디터의 값이 변경될 때마다 onEditorStateChange 호출
												onEditorStateChange={onEditorStateChange}
											/>
										</div>
									</MyBlock>

								</div>

					}

				</div>

				<Button className="btn-block" variant="info" style={{ width: '20rem' }}
					onClick={submitHandler}
				>풀이 제출 </Button>
				<Button className="btn-block" variant="info" style={{ width: '20rem'}}
					onClick={appearAnswer}
				>정답 확인 </Button>
				
				<div style={{height:"0.5rem"}}>
				{(showAnswer && (questionType === 'short_answer' || questionType === 'multiple_choice')) ?
					<div>
						{answerList.map((i, index) =>
							<div key={index}>
								<Card className="center" style={{ width: '70rem' }}>
									<Card.Body style={{ backgroundColor: "white" }} >
										{i}
										<br />
									</Card.Body>
								</Card>
								<br />
							</div>
						)}
					</div> :
					(showAnswer && questionType === 'essay') ?
					<div>
							<Card border="light" style={{ backgroundColor: "#f7feff" }}>
					<Card className="center" style={{ width: '80%', height: '20rem', overflow: 'auto' }}>
						<Card.Body>
						<br/>
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
									locale: 'ko',
								}}
							/>
						</Card.Body>
					</Card>

				</Card>
					</div> :
					<div>
					</div>
				}
				<Button className="btn-block" variant="info" style={{ width: '20rem' }}
					onClick={show_Explanation}
				>풀이 확인 </Button>
				{(showExplanation && (questionType === 'short_answer' || questionType === 'multiple_choice')) ? 
				<div>
					<Card border="light" style={{ backgroundColor: "#f7feff" }}>
					<Card className="center" style={{ width: '80%', height: '20rem', overflow: 'auto' }}>
						<Card.Body>
						<br/>
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
									locale: 'ko',
								}}
							/>
						</Card.Body>
					</Card>

				</Card>
				</div>
				: <div></div>
				}
			</div>
				
			</div>


		</Container>
	);
}

export default SolveQuestion;
