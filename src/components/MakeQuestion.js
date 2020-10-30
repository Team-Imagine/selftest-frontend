import React, { useState, useEffect } from "react";
import { Container, Button,  } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';

import classNames from "classnames";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import styled from 'styled-components';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
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
			height: 60px !important;
			border: 1px solid #f1f1f1 !important;
    	padding: 5px !important;
			border-radius: 2px !important;
			background-color: white;
		}
	`;

const MakeQuestion = ({ subject, course, isOpen }) => {
	// useState로 상태관리하기 초기값은 EditorState.createEmpty()
	// EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [selectedFile, setSelectedFile] = useState('');
	const [title, setTitle] = useState('');

	let uploadedImages = [];
	let history = useHistory();

	const moveBack = () => {
		history.push(`/subject/${subject}/${course}`);
	}

	const onEditorStateChange = (editorState) => {
		// editorState에 값 설정
		setEditorState(editorState);
	};


	const imageUploadCallback = file => {

		const imageObject = {
			file: file,
			localSrc: URL.createObjectURL(file),
		}
		uploadedImages.push(imageObject);
		setSelectedFile(file);

		return new Promise(
			(resolve, reject) => {
				resolve({ data: { link: imageObject.localSrc } })
			});
	};

	const submitHandler = async (event) => {
		event.preventDefault();

		/*
		const formData = new FormData();

		console.log(selectedFile);

		await formData.append("file", selectedFile);

		await axios.post('/api/image/upload', formData, {
			headers: {
				 Authorization: 'token',
				'Content-Type': 'multipart/form-data'
			}
		})
			.then(res => {
				console.log(res.data);
			})
			*/
		const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));

		const data = {
			title: title,
			content: editorToHtml,
			course_title: course
		};

		console.log(editorToHtml.length)

		if(title && (editorToHtml.length > 15)) {
			axios.post(`/api/question/`, data)
	
			.then(res => {
				console.log(res);
				console.log(res.data);
				
				alert("문제가 성공적으로 등록되었습니다.");
				setEditorState("");

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
			<h1>
				문제 생성 ( {subject} - {course})
      </h1>
			<br /><br /><br />
			<MyBlock>
				<input type="text" id="title" className="input" placeholder="문제 제목" fontSize="40" onChange={onChange}/>
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
						
						inline: {inDropdown: true},
						list: { inDropdown: true },
						textAlign: { inDropdown: true },
						link: { inDropdown: true },
						history: { inDropdown: true },

						image: {
							uploadCallback: imageUploadCallback,
							previewImage: true,
						},
					}}
					placeholder="내용을 작성해주세요."
					// 한국어 설정
					localization={{
						locale: 'ko',
					}}
					// 초기값 설정
					editorState={editorState}
					// 에디터의 값이 변경될 때마다 onEditorStateChange 호출
					onEditorStateChange={onEditorStateChange}
				/>
			</MyBlock>
			<Button
				onClick={submitHandler}
			>문제 등록</Button>

		</Container>
	);
}

export default MakeQuestion;
