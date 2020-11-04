import React, { useState, useEffect } from "react";
import { Container, Button, InputGroup, Dropdown, DropdownButton, FormControl } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import store from "../store";
import classNames from "classnames";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import styled from 'styled-components';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import axios from "axios";

const MyBlock = styled.div`
    .wrapper-class{
        width: 100%;
        margin: 0;
        margin-bottom: 1rem;
    }
  	.editor {
    height: 350px !important;
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

const MakeQuestion = ({ subject, course, isOpen }) => {
	// useState로 상태관리하기 초기값은 EditorState.createEmpty()
	// EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [editorChoice, setEditorChoice] = useState(EditorState.createEmpty());
	const [selectedFile, setSelectedFile] = useState('');
	const [title, setTitle] = useState('');
	const [questionType, setQuestionType] = useState('객관식');
	const [choices, setChoices] = useState([0]);
	const [checks, setChecks] = useState([false]);
	const [answer, setAnswer] = useState([]);

	let uploadedImages = [];
	let history = useHistory();

	let choiceNumber = [0];
	let answerList = [];

	let t_checkList = [];

	let checkedList = [];

	useEffect(() => {
		if (questionType == "객관식") {

		}
	}, [questionType]);

	const moveBack = () => {
		history.push(`/subject/${subject}/${course}`);
	}

	const onEditorStateChange = (editorState) => {
		// editorState에 값 설정
		setEditorState(editorState);
	};

	const onEditorChoiceChange = (editorState) => {
		// editorState에 값 설정
		setEditorChoice(editorState);
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

		let editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));

		let answer_items = [];
		let data;

		if(questionType === "주관식") {
			for(var i in answerList) {
				answer_items.push({item_text: answerList[i]});
			}

			data = {
				title: title,
				type: 'short_answer',
				content: editorToHtml,
				course_title: course,
				short_answer_items: answer_items,
			}
		} else if(questionType === "객관식") {
			for(var i in answerList) {
				answer_items.push({item_text: answerList[i], checked: checkedList[i]});
			}

			data = {
				title: title,
				type: 'multiple_choice',
				content: editorToHtml,
				course_title: course,
				multiple_choice_items: answer_items,
			}
		} else {
			let editorToHtml_answer = draftToHtml(convertToRaw(editorChoice.getCurrentContent()));

			answer_items.push({item_text: editorToHtml_answer});

			data = {
				title: title,
				type: 'essay',
				content: editorToHtml,
				course_title: course,
				short_answer_items: answer_items,
			}
		}

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
		/*
		let editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));

		let data = {
			title: title,
			content: editorToHtml,
			course_title: course
		};

		//console.log(editorToHtml.length)
		*/
		if (title && (editorToHtml.length > 15)) {
			axios.post(`/api/question/`, data)

				.then(res => {
					console.log(res);
					console.log(res.data);

					alert("문제가 성공적으로 등록되었습니다.");
					setEditorState("");

					moveBack();
				})
				.catch(error => {
					alert(error.response.data.message);
				})
		} else {
			alert('내용을 올바르게 입력하세요.');
		}
		
	}

	const onChange = (e) => {
		setTitle(e.target.value);
	}

	const handleSelect = (e) => {
		setChoices([0]);
		setChecks([false]);
		setQuestionType(e)
	}

	const makeAnswer = (index, e) => {
		answerList = choices;
		

		answerList[index] = e.target.value;
		
		console.log(answerList);
	}

	const controlCheck = (index, e) => {
		checkedList = checks;	
		checkedList[index] = e.target.checked
	}

	const addChoice = (e) => {
		choiceNumber = choices;
		choiceNumber.push(0);

		t_checkList = checks;
		t_checkList.push(false);

		setChoices([...choiceNumber]);
		setChecks([...t_checkList]);
	}

	return (
		<Container
			fluid
			className={classNames("content", { "is-open": { isOpen } })}
		>

			<div className="d-flex bd-highlight mb-3">
				<div className="mr-auto p-2 bd-highlight">
					<div style={{ height: "2.5rem" }}>
						<h4 style={{ fontWeight: "bolder" }}>
							과목 {'>'} {subject} {'>'} {course} {'>'} 문제 생성
			</h4>
					</div>
				</div></div>
			<InputGroup className="mb-3">
				<DropdownButton
					variant="outline-secondary"
					title={questionType}
					id="input-group-dropdown-1"
					onSelect={handleSelect}
				>
					<Dropdown.Item eventKey="객관식">객관식</Dropdown.Item>
					<Dropdown.Item eventKey="주관식">주관식</Dropdown.Item>
					<Dropdown.Item eventKey="서술형">서술형</Dropdown.Item>

				</DropdownButton>

			</InputGroup>
			<hr />
			<MyBlock>
				<input type="text" id="title" className="input" placeholder="문제 제목" fontSize="40" onChange={onChange} />
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
					<div>
			{
				(questionType === "객관식") ? 
				<div>
					<Button onClick={addChoice}>선택지 추가</Button> <hr />
					{choices.map((i, index) =>
						<div key={index}>
							<InputGroup className="mb-3">
    						<FormControl aria-label="Text input with checkbox" onChange={(e) => makeAnswer(index, e)}/>
								<InputGroup.Prepend>
      						<InputGroup.Checkbox aria-label="Checkbox for following text input" onChange={(e) => controlCheck(index, e)}/>
    						</InputGroup.Prepend>
  						</InputGroup>
						</div>
					)}
					<hr />
				</div>
				: (questionType === "주관식" ) ? 
				<div>
				<Button onClick={addChoice}>선택지 추가</Button> <hr />
				{choices.map((i, index) =>
					<div key={index}>
						<input type="text" id="title" className="input" style={{width: "50%", height: "3rem", border: "2px solid black"}} onChange={(e) => makeAnswer(index, e)}/>
			 <hr />
					</div> 
				)} 
				<hr />
				</div>
				: 
				<div style={{backgroundColor: 'white'}}> <Editor
				toolbarHidden
				wrapperClassName="wrapper-class"
				
				editorClassName="editor"
				placeholder="정답을 작성해주세요."
				
				toolbarClassName="toolbar-class"
				editorState={editorChoice}
				onEditorStateChange={onEditorChoiceChange}
				localization={{
					locale: 'ko',
				}}
			/> <hr /></div> 
			}
		</div>
			<Button className="btn-block" variant="info"
				onClick={submitHandler}
			>문제 등록</Button>

		</Container>
	);
}

export default MakeQuestion;
