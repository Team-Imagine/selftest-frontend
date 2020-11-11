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
import { faAppleAlt, faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import store from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";

const Questioncontent = ({ subject, course, question_id, commentable_entity_id, isOpen }) => {
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
			axios.get(`/api/user`)
				.then((res) => {
					store.dispatch({type:'POINT', value: res.data.user.point});
				})
			
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
			
				.catch(error => {
					alert(error.response.data.message);
				})
			
			/*
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
				.catch(error => {
					alert(error.response.data.message);
				})
			*/
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
							href={`/subject/${subject}/${course}/${question_id}/problem_solving/${1}`}
						>문제 풀이</Button>
						</div>
						</div>
					</div>
				<hr/>
				<div className="row h-100 justify-content-center align-items-center">

					<Card border="light" style={{ backgroundColor: "#f7feff" }}>
					<Card className="center" style={{ width: '70rem' }}>
							<Card.Header>
							<div style={{fontWeight:"bold", fontsize:"rem"}}>
							#{question.id} {subject} - {course}
							</div>	
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
							<Card.Footer >
							<div className="d-flex bd-highlight mb-3" style={{height:"0.8rem"}}>
							
							<div className="mr-auto p-2 bd-highlight">
							좋아요 &nbsp;
							<FontAwesomeIcon icon={faHeart} className="ml-auto" />&nbsp;
							<FontAwesomeIcon icon={faHeart} className="ml-auto" />&nbsp;  
							<FontAwesomeIcon icon={faHeart} className="ml-auto" />&nbsp;  
							<FontAwesomeIcon icon={faHeart} className="ml-auto" />&nbsp;  
							<FontAwesomeIcon icon={faHeart} className="ml-auto" />&nbsp;  
							</div>
							<div className="mr-auto p-2 bd-highlight">
							신선해요 &nbsp;  
							<FontAwesomeIcon icon={faAppleAlt} className="ml-auto" />&nbsp;
							<FontAwesomeIcon icon={faAppleAlt} className="ml-auto" />&nbsp;
							<FontAwesomeIcon icon={faAppleAlt} className="ml-auto" />&nbsp;
							<FontAwesomeIcon icon={faAppleAlt} className="ml-auto" />&nbsp;
							<FontAwesomeIcon icon={faAppleAlt} className="ml-auto" />&nbsp;
							</div>
							<div className="mr-auto p-2 bd-highlight">
							난이도  &nbsp;
							<FontAwesomeIcon icon={faStar} className="ml-auto" />&nbsp;
							<FontAwesomeIcon icon={faStar} className="ml-auto" />&nbsp;
							<FontAwesomeIcon icon={faStar} className="ml-auto" />&nbsp;
							<FontAwesomeIcon icon={faStar} className="ml-auto" />&nbsp;
							<FontAwesomeIcon icon={faStar} className="ml-auto" />&nbsp;
							</div>
							</div>
							</Card.Footer>
						</Card>
								<br />

						{/*	문제풀이에서 정답이 보여지므로 button 주석처리했습니다
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
									<Card className="center" style={{ width: '70rem' }}>
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
						
						 */}								
						<Accordion>
						<Card className="center" style={{ width: '70rem' }}>
							
								<Accordion.Toggle className="center" as={Button} variant="light" block eventKey="0">
									댓글 보기
								</Accordion.Toggle>
								<Accordion.Collapse eventKey="0">

									<Card.Body style={{ backgroundColor: "white" }} >

										<div>
											댓글이 보여질곳 입니다. {commentable_entity_id}
										</div>
										<br />

										<Card.Footer>
											좋아요 <FontAwesomeIcon icon={faHeart} className="ml-auto" />&nbsp;
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
