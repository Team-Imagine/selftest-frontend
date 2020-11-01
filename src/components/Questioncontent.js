import React, { useState, useEffect } from "react";
import { Container, Button, CardDeck } from "react-bootstrap";
import classNames from "classnames";
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import Card from "react-bootstrap/Card";
import Accordion from 'react-bootstrap/Accordion'
import axios from "axios";
import store from "../store";

const Questioncontent = ({ subject, course, question_id, isOpen }) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [items, setItems] = useState([]);
	
	const [answer, setAnswer] = useState([]);
	const [question, setQuestion] = useState('');
	const [viewAnswer, setViewAnswer] = useState(false);
	let history = useHistory();

	let htmlToEditor = '';
	let htmlToEditorAnswer = [];
	let t_answer = [];
	
	useEffect(() => {
		if (store.getState().isLoggedIn) {
			axios.get(`/api/question/${question_id}`)
				.then(res => {
					setQuestion(res.data.question);

					htmlToEditor = res.data.question.content;

					console.log(htmlToEditor);


					const blocksFromHtml = htmlToDraft(htmlToEditor);
					if (blocksFromHtml) {
						const { contentBlocks, entityMap } = blocksFromHtml;

						const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

						const t_editorState = EditorState.createWithContent(contentState);
						setEditorState(t_editorState);
					}
				})

			axios.get(`/api/answer?question_id=${question_id}`)
				.then(res => {
					setAnswer(res.data.answers);

					for (var i in res.data.answers) {
					
						htmlToEditorAnswer.push(res.data.answers[i].content);

						const blocksFromHtml = htmlToDraft(htmlToEditorAnswer[i]);
						if (blocksFromHtml) {
							const { contentBlocks, entityMap } = blocksFromHtml;

							const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

							const t_editorState = EditorState.createWithContent(contentState);

							t_answer.push(t_editorState);

							setItems([...t_answer]);
							//setEditorState(t_editorState);
						}
						
					}

				})
		} else {
			alert('로그인이 필요한 기능입니다.');
			history.push(`/subject/${subject}/${course}`);
			history.push("/login");
		}
	}, []);

	const appearAnswer = (event) => {
		event.preventDefault();

		setViewAnswer(!viewAnswer);
	} 

	return (
		<Container
			fluid
			className={classNames("content", { "is-open": { isOpen } })}
		>
			<div>
				<div className = "d-flex bd-highlight mb-3">
        			<div className="mr-auto p-2 bd-highlight"> 
					<h4 style={{fontWeight:"bolder"}}>
					과목 {'>'} {subject} {'>'} {course} {'>'} 문제
        			</h4>
					</div>
					
					<div className = "p-2 bd-highlight">
					<div>
						<Button variant="info" style = {{width: '19rem', height: '2.5rem'}}
							href={`/subject/${subject}/${course}/${question_id}/make_answer/${1}`}
						>정답 생성</Button>
						</div>
						</div>
					</div>
				<hr/>

				<div className="row h-100 justify-content-center align-items-center">

					<Card border="light" style={{ backgroundColor: "#f7feff" }}>
						<Card className="center" border="info" style={{ width: '70rem' }}>
							<Card.Header>
								{question.title}
							</Card.Header>
							<Card.Body>
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
							<Card.Footer className="text-muted">좋아요.....   신선해요.....   난이도 </Card.Footer>
						</Card>
								<br />
						<button
              type="submit"
							className="btn btn-secondary"
							onClick={appearAnswer}
            >
              정답 확인</button>
								<br/>
						{viewAnswer && 
							<div>
							{items.map((i, index) =>
								<div key={index}>
							<Card border="info" className="center" style={{ width: '70rem' }}>
								
									<Card.Body style={{ backgroundColor: "white" }} >
									<Editor
									toolbarHidden
									// 에디터와 툴바 모두에 적용되는 클래스
									wrapperClassName="wrapper-class"
									// 에디터 주변에 적용된 클래스
									editorClassName="editor"

									// 툴바 주위에 적용된 클래스
									toolbarClassName="toolbar-class"
									editorState= {i}
									readOnly
									// 한국어 설정
									localization={{
										locale: 'ko',
									}}
								/>
										<br />
										<Card.Footer>
											좋아요...
										</Card.Footer>
									</Card.Body>
							</Card>
							<br />
							</div>
							)}</div>
						}
													
						<Accordion>
							<br />
							<Card border="info" className="center" style={{ width: '70rem' }}>
								<Accordion.Toggle className="center" as={Button} variant="light" block eventKey="0">
									댓글 보기
								</Accordion.Toggle>
								<Accordion.Collapse eventKey="0">

									<Card.Body style={{ backgroundColor: "white" }} >

										<div>
											댓글이 보여질 곳
										</div>
										<br />

										<Card.Footer>
											좋아요...
										</Card.Footer>
									</Card.Body>


								</Accordion.Collapse>

							</Card>
						</Accordion>
					</Card>
				</div>
			</div>

		</Container>
	);
}

export default Questioncontent;
