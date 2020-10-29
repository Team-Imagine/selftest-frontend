import React, { useState, useEffect, useRef } from "react";
import { Container, Button } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';

import classNames from "classnames";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import styled from 'styled-components';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import axios from "axios";

const IntroduceContent = styled.div`
  position: relative;
  border: 0.0625rem solid #d7e2eb;
  border-radius: 0.75rem;
  overflow: hidden;
  padding: 1.5rem;
  width: 50%;
  margin: 0 auto;
  margin-bottom: 4rem;
`;

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
	`;

const MakeQuestion = ({ subject, course, isOpen }) => {
		// useState로 상태관리하기 초기값은 EditorState.createEmpty()
		// EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.
		const [editorState, setEditorState] = useState(EditorState.createEmpty());

		let history = useHistory();

  	const moveBack = () => {
      history.push(`/subject/${subject}/${course}`);
  	}

		const onEditorStateChange = (editorState) => {
			// editorState에 값 설정
			setEditorState(editorState);
		};

		const getFileBase64 = (file, callback) => {
			var reader = new FileReader();
			reader.readAsDataURL(file);
			// Since FileReader is asynchronous,
			// we need to pass data back.
			reader.onload = () => callback(reader.result);
			// TODO: catch an error
			reader.onerror = error => {};
		};
		
		const imageUploadCallback = file => new Promise(
			(resolve, reject) => getFileBase64(
				file,
				data => resolve({ data: { link: data } })
			)
		);

		const submitHandler = event => {
			event.preventDefault();

			const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
			
			const data = {
				content: editorToHtml,
				course_title: course
			};

			axios.post(`/api/question/`,data)
				.then(res => {
					console.log(res);
					console.log(res.data);
					
					alert("문제가 성공적으로 등록되었습니다.");
					setEditorState("");

					moveBack();
				})
		}
		
		return (
			<Container
				fluid
				className={classNames("content", { "is-open": { isOpen } })}
			>
			<h1>
				문제 생성 ( {subject} - {course})
      </h1>
			<br/><br/><br/>
				<MyBlock>
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
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
					history: { inDropdown: false },
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
