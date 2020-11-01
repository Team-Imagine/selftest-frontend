import React, { useState, useEffect } from "react";
import { Container, Button, } from "react-bootstrap";
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
    height: 200px !important;
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

const MakeAnswer = ({ subject, course, question_id, isOpen }) => {
	// useState로 상태관리하기 초기값은 EditorState.createEmpty()
	// EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [editorAnswer, setEditorAnswer] = useState(EditorState.createEmpty());
	const [question, setQuestion] = useState('');
	const [title, setTitle] = useState('');
	let history = useHistory();
	let htmlToEditor = '';

	useEffect(() => {
		if (store.getState().isLoggedIn) {
			axios.get(`/api/question/${question_id}`)
				.then(res => {
					setQuestion(res.data.question);

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


	const submitHandler = async (event) => {
		event.preventDefault();

		let editorToHtml = draftToHtml(convertToRaw(editorAnswer.getCurrentContent()));

		let data = {
			content: editorToHtml,
			question_id: question_id,
		};

		//console.log(editorToHtml.length)

		if (editorToHtml.length > 15) {
			axios.post(`/api/answer/`, data)

				.then(res => {
					console.log(res);
					
					alert(res.data.message);
					setEditorAnswer("");

					moveBack();
				})
		} else {
			alert('내용을 올바르게 입력하세요.');
		}
	}

	const onChange = (e) => {
		setTitle(e.target.value);
	}

	return (
		<Container
			fluid
			className={classNames("content", { "is-open": { isOpen } })}
		>
			<div className = "d-flex bd-highlight mb-3">
        	<div className="mr-auto p-2 bd-highlight"> 
			<div style={{height:'2.5rem'}}>
			<h4 style={{fontWeight:"bolder"}}>
				과목 {'>'} {subject} {'>'} {course} {'>'} 정답 생성
			</h4>
			</div>
			</div></div>
			
			<hr />
			<div className="row justify-content-center align-items-center">
				<Card border="light" style={{ backgroundColor: "#f7feff" }}>
					<Card className="center" border="info" block style={{width:'85rem'}}>
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
					</Card>
				</Card>

				<br />
			<MyBlock style={{width:'86rem'}}>
			<br/>
			<div style={{height:'17rem'}}>
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
			<Button className="btn-block" variant="info" style={{width:'20rem'}}
				onClick={submitHandler}
			>정답 등록</Button>
			</div>
			

			

		</Container>
	);
}

export default MakeAnswer;
