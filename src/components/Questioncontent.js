import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import classNames from "classnames";
import styled from 'styled-components';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';

import axios from "axios";

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

	let htmlToEditor = '';

	useEffect(() => {

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
	}, []);

	return (
		<Container
			fluid
			className={classNames("content", { "is-open": { isOpen } })}
		>
			<div>
				<h1>
					Question Page ( {subject} - {course} )
        </h1>
				<MyBlock>
				<div className="input" style={{fontSize: "1.5rem"}}>{question.title}</div>
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
				</MyBlock>
				<Button 
				onClick={(e) => setHidden(false)}
				style={{marginBottom: '2rem'}}
				>정답 확인
				</Button>

				{!hidden && <ul>
					<div>
					{answer.map((i) =>	
					<div key="i">{i.content} <br /></div>
					)} 
					</div>
				</ul>}
			</div>
		</Container>
	);
}

export default Questioncontent;
