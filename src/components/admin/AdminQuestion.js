import React, { useState, useEffect } from "react";
import {
	Container,
	Button,
	Text,
	CardDeck,
	FormControl,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import classNames from "classnames";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import styled from "styled-components";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import {
	faAppleAlt,
	faHeart,
	faStar,
	faThumbtack,
	faThumbsDown,
	faThumbsUp,
	faAlignCenter,
} from "@fortawesome/free-solid-svg-icons";
import parse from "node-html-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import store from "../../store";

import axios from "axios";

const AdminQuestion = ({ question_id, isOpen }) => {
	// useState로 상태관리하기 초기값은 EditorState.createEmpty()
	// EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [editorAnswer, setEditorAnswer] = useState(EditorState.createEmpty());
	const [question, setQuestion] = useState("");
	const [questionType, setQuestionType] = useState("");
	const [choiceList, setChoiceList] = useState([]);
	const [choiceColor, setChoiceColor] = useState([]);
	const [shortAnswer, setShortAnswer] = useState("");
	const [title, setTitle] = useState("");
	const [answerList, setAnswerList] = useState([]);
	const [essayAnswerEditor, setEssayAnswerEditor] = useState(
		EditorState.createEmpty()
	);

	const [blocked, setBlocked] = useState(1);

	const [pages, setPages] = useState([]);

	let history = useHistory();
	let htmlToEditor = "";
	let htmlToEditor_answer = "";
	let t_choiceColor = [];

	useEffect(() => {
		if (store.getState().isLoggedIn) {

			axios.get(`/api/question/${question_id}`).then((res) => {
				console.log(res.data);

				res.data.question.content = convertUploadedImageUrls(
					res.data.question.content
				);
				console.log(res.data.question.content);

				setQuestionType(res.data.question.type);
				setQuestion(res.data.question);
				setBlocked(res.data.question.blocked);

				if (res.data.question.type === "multiple_choice") {
					let t_choiceList = [];

					for (var i in res.data.question.multiple_choice_items) {
						t_choiceList.push({
							item_text: res.data.question.multiple_choice_items[i].item_text,
						});
						if (res.data.question.multiple_choice_items[i].checked)
							t_choiceColor.push("red");
						else
							t_choiceColor.push("black");
					}
					setChoiceList([...t_choiceList]);
					setChoiceColor([...t_choiceColor]);
				} else if (res.data.question.type === "short_answer") {
					let answerList = [];

					for (var i in res.data.question.short_answer_items) {
						answerList.push(res.data.question.short_answer_items[i].item_text + " ");
					}
					console.log('answer:', answerList);

					setAnswerList([...answerList]);
				}

				htmlToEditor = res.data.question.content;

				const blocksFromHtml = htmlToDraft(htmlToEditor);
				if (blocksFromHtml) {
					const { contentBlocks, entityMap } = blocksFromHtml;

					const contentState = ContentState.createFromBlockArray(
						contentBlocks,
						entityMap
					);

					const t_editorState = EditorState.createWithContent(contentState);
					setEditorState(t_editorState);
				}

				// 해설 불러오기
				axios.get(`/api/answer?question_id=${question_id}`).then((res) => {
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
			});
		} else {
			alert("로그인이 필요한 기능입니다.");
			history.push("/login");
		}
	}, []);

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

	const onEditorStateChange = (editorState) => {
		// editorState에 값 설정
		setEditorAnswer(editorState);
	};

	useEffect(() => { }, [choiceList, choiceColor]);

	const selectHandler = (value, e) => {
		e.preventDefault();

		let data = {
			blocked: value,
		}

		axios.patch(`/api/question/${question_id}`, data)
		.then(res => {
			alert(res.data.message);
			history.push("/admin/blocked");
		})
		.catch((error) => {
			alert(error.response.data.message);
		});
	}

	return (
		<Container
			fluid
			className={classNames("content", { "is-open": { isOpen } })}
		>
			<div className="column justify-content-center align-items-center">
				<Card.Header style={{ width: "50%", left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto' }}>
					<div className="d-flex bd-highlight mb-3" style={{ height: "1rem" }}>
						<div className="mr-auto p-2 bd-highlight">
							<div style={{ fontWeight: "bold", fontsize: "rem"}}>
								#{question.id}
							</div>
						</div>
						
							{ blocked ?			
								<Button
									style={{ width: "4.8rem !important", height: "2.4rem" }}
									variant='success'
									onClick={(e) => {selectHandler(false, e)}}
								>Open</Button> : <Button
								style={{ width: "4.8rem !important", height: "2.4rem" }}
								variant='success'
								onClick={(e) => {selectHandler(true, e)}}
							>Block</Button>
								}
							
					</div>
				</Card.Header>
				<Card
					className="center"
					style={{
						width: "50%",
						left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto',
						height: "20rem !important",
						overflow: "auto",
					}}
				>
					<Card.Body>
						<div style={{ fontWeight: "bold" }}>제목: {question.title} </div>
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
								editorState={editorState}
								readOnly
								// 한국어 설정
								localization={{
									locale: "ko",
								}}
							/>
						</div>
					</Card.Body>
				</Card>
				<div>
					<br />
					{questionType === "multiple_choice" && choiceList !== null ? (
						//문제 푸는 곳
						<Card style={{ width: "50%", left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto'}}>
							<div className="container h">
								<div
									className="justify-content-center align-items-center"
									style={{ textAlign: "center", margin: 0 }}
								>
									<br />
									<div>
										<p style={{fontSize: '18px'}}>선택지</p>
									</div>
									<br />
									<div className="justify-content-center align-items-center">
										{choiceList.map((i, index) => (
											//선택지 버튼 출력 부분
											<div key={index}>
												<Button
													variant="outline-light"
													style={{
														height: "2rem",
														width: "60%",
														color: choiceColor[index],
														fontSize: "18px",
														backgroundColor: "lavender",
													}}
												>
													{"("}
													{index + 1}
													{")"} {i.item_text}
												</Button>
												<br />
												<br />
											</div>
										))}
										<br />
									</div>
								</div>
							</div>
						</Card>) : questionType === "short_answer" ?
							<div>
								<p style={{ fontSize: '18px', width: "50%",left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto', }}>주관식 답안</p>
              {answerList.map((i, index) => (
								<div key={index}>
									<Card className="center" style={{ width: "50%", left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto', }}>
										<Card.Body style={{ backgroundColor: "white" }}>
											{i}
											<br />
										</Card.Body>
									</Card>
									<br />
								</div>
							))}
							</div> : <div></div>}
					<br />
					<p style={{ fontSize: '18px', width: "50%",left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto', }}>해설</p>
					<Card
						className="center"
						style={{ width: "50%", height: "20rem", overflow: "auto", left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto', }}
					>
						<Card.Body>
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
									editorState={essayAnswerEditor}
									readOnly
									// 한국어 설정
									localization={{
										locale: "ko",
									}}
								/>
							</div>
						</Card.Body>
					</Card>
				</div>
			</div>
		</Container>
	);
};

export default AdminQuestion;
