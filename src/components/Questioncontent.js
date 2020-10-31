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

const MyBlock = styled.div`
    .wrapper-class{
        width: 50%;
        margin: 0;
        margin-bottom: 4rem;
    }
  	.editor {
    height: 500px !important;
    border: 1px solid #f1f1f1 !important;
    padding: 5px !important;
		border-radius: 2px !important;
		background-color: white;
		}
		.input {
			width: 50%;
			margin: 0;
			margin-bottom: 1rem;
			margin-top: 2rem;
			height: 60px !important;
			border: 1px solid #f1f1f1 !important;
    	padding: 5px !important;
			border-radius: 2px !important;
			background-color: white;
		}`;

const Questioncontent = ({ subject, course, question_id, isOpen }) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [answer, setAnswer] = useState([]);
	const [question, setQuestion] = useState('');
	const [hidden, setHidden] = useState(true);
	let history = useHistory();

	let htmlToEditor = '';

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
				})


		} else {
			alert('로그인이 필요한 기능입니다.');
			history.push(`/subject/${subject}/${course}`);
			history.push("/login");
		}
	}, []);


	return (
		<Container
			fluid
			className={classNames("content", { "is-open": { isOpen } })}
		>
			<div>
				<h3>
					Subjects {'>'} {subject} {'>'} {course} {'>'} Question
        		</h3>
				<hr />
				<br />
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


						<Accordion>
							<br />
							<Card border="info" className="center" style={{ width: '70rem' }}>
								<Accordion.Toggle className="center" as={Button} variant="light" block eventKey="0">
								정답 확인
								</Accordion.Toggle>
								<Accordion.Collapse eventKey="0">
									<Card.Body style={{ backgroundColor: "white" }} >
										
										<div>
											{answer.map((i) =>
												<div key={i.id}>{i.content} <br /></div>
											)}
										</div>
										<br/>

										<Card.Footer>
											좋아요...
										</Card.Footer>
									</Card.Body>
								</Accordion.Collapse>
							</Card>
						</Accordion>
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
				{/*
				{!hidden && <ul>
					<div>
					{answer.map((i) =>	
					<div key={i.id}>{i.content} <br /></div>
					)} 
					</div>
				</ul>}
					*/}

			</div>

		</Container>
	);
}

export default Questioncontent;
