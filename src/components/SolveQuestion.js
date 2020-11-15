import React, { useState, useEffect } from "react";
import { Container, Button, Text, CardDeck, FormControl } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';

import classNames from "classnames";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Card from "react-bootstrap/Card";
import Accordion from 'react-bootstrap/Accordion'
import styled from 'styled-components';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { faAppleAlt, faHeart, faStar, faThumbtack, faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
	const [comments, setComments] = useState([]);
	const [pages, setPages] = useState([]);
	const [likes, setLikes] = useState(0);
	const [dislikes, setDislikes] = useState(0);
	const [freshness, setFreshness] = useState(0);
	const [difficulty, setDifficulty] = useState(0);
	const [isBookmarked, setIsbookmarked] = useState(false);
	const [bookmarkedColor,setbookmarkedColor] = useState("");
	const [likeable_entity_id, setLikeable_entity_id] = useState(0);
	const [commentable_entity_id, setCommentable_entity_id] = useState(0);

	const [freshPoint, setFreshPoint] = useState(0);
	const [viewInputFresh, setViewInputFresh] = useState(false);

	const [difficultyPoint, setDifficultyPoint] = useState(0);
	const [viewInputDifficulty, setViewInputDifficulty] = useState(false);

	const [username, setUsername] = useState('');
	const [inputComment, setInputComment] = useState('');
	const [modified, setModified] = useState(false);
	const [inputModifiedComment, setInputModifiedComment] = useState('');

	let history = useHistory();
	let htmlToEditor = '';
	let htmlToEditor_answer = '';
	let t_choiceColor = [];

	useEffect(() => {
		if (store.getState().isLoggedIn) {
			axios.get(`/api/user`)
				.then((res) => {
					setUsername(res.data.user.username);
					store.dispatch({ type: 'POINT', value: res.data.user.point });
			})

			axios.get(`/api/bookmark/${question_id}`)
				.then(res=>{
					setIsbookmarked(res.data.is_bookmarked);
					res.data.is_bookmarked?setbookmarkedColor("yellow"):setbookmarkedColor("");
					//console.log('bookmarked',res.data.is_bookmarked);
					//console.log('bookmarkedcolor',bookmarkedColor);
			})

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

					setLikeable_entity_id(res.data.question['likeable_entity.id']);
					setCommentable_entity_id(res.data.question['commentable_entity.id']);

					setLikes(res.data.question['likeable_entity.likes.total_likes']);

					setDislikes(res.data.question['likeable_entity.dislikes.total_dislikes']);

					if (res.data.question['difficulties.average_difficulty']) {
						setDifficulty(res.data.question['difficulties.average_difficulty']);
					}
					if (res.data.question['freshnesses.average_freshness']) {
						setFreshness(res.data.question['freshnesses.average_freshness']);
					}

					axios.get(`/api/comment?commentable_entity_id=${res.data.question['commentable_entity.id']}`)
						.then(res => {
							console.log(res.data);

							setComments(res.data.comments.rows);
						
							let count = res.data.comments.count / 10 + 1;

							let t_pages = [];

							for(var i = 1; i < count; i++) {
								t_pages.push(i);
							}
							setPages(t_pages);

						})
						.catch(error => {
							alert(error.response.data.message);
						})

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
	}, [choiceList, choiceColor]);

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

	const loadAnswer = () => {
		if (questionType === "multiple_choice") {
			let answerArray = '';
			for (var i in question.multiple_choice_items) {
				if (question.multiple_choice_items[i].checked === 1) {
					i *= 1;
					i += 1;
					i += '';

					answerArray += i;
					answerArray += "번, "
				}
			}
			setAnswerList([answerArray.substring(0, answerArray.length - 2)]);
		} else if (questionType === "short_answer") {
			let answerList = [];

			for (var i in question.short_answer_items) {
				answerList.push(question.short_answer_items[i].item_text + " ");
			}

			setAnswerList([...answerList]);
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

		}
	}

	// 풀이 제출
	const submitHandler = (event) => {
		event.preventDefault();

		var result = window.confirm('풀이를 제출하시겠습니까? 포인트 1점이 차감됩니다.');

		if (result) {
			axios.get(`/api/question/solve/${question_id}`)
			.then(res => {
				if(!res.data.point_decrement) {
					alert('이미 제출한 적이 있습니다.');
				} else {
					axios.get(`/api/user`)
					.then((res) => {
						store.dispatch({ type: 'POINT', value: res.data.user.point });
						console.log(store.getState().point);
					})
				}
			})
			.catch(error => {
				alert(error.response.data.message);
			})

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
				openAnswer();
			}
		} else {

		}
	}

	const isOwnedHandler = (e) => {
		e.preventDefault();

		setIsOwned(true);
		alert("문제가 소장되었습니다!")
	}

	const openAnswer = () => {
		
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
			loadAnswer();

			setShowExplanation(true);
	}

	// 해설 확인
	const show_Explanation = () => {
	
		var result = window.confirm('문제의 해설을 확인하시겠습니까? 2 포인트가 차감됩니다.');
	
		if (result) {
			axios.get(`/api/question/unlock/${question_id}`)
			.then(res => {
				if(!res.data.point_decrement) {
					alert(res.data.message);
				} else {
					axios.get(`/api/user`)
					.then((res) => {
						store.dispatch({ type: 'POINT', value: res.data.user.point });
						console.log(store.getState().point);
					})
				}
			})
			.catch(error => {
				alert(error.response.data.message);
			})
			
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
			loadAnswer();

			setShowExplanation(true);
		}
	}


	// 좋아요 처리
	const addLike = (e) => {
		e.preventDefault();

		axios.get(`/api/like/${likeable_entity_id}`)
			.then(res => {
				if (res.data.is_liked) {
					axios.delete(`/api/like/${likeable_entity_id}`)
						.then(res => {
							console.log(res.data.message);
							axios.get(`/api/question/${question_id}`)
								.then(res => {
									setLikes(res.data.question['likeable_entity.likes.total_likes']);
								})
						})
				} else {
					if (res.data.is_disliked) {
						axios.delete(`/api/dislike/${likeable_entity_id}`)
							.then(res => {
								console.log(res.data.message);
								axios.get(`/api/question/${question_id}`)
									.then(res => {
										setDislikes(res.data.question['likeable_entity.dislikes.total_dislikes']);
									})
							})
					}
					axios.post(`/api/like/${likeable_entity_id}`)
						.then(res => {
							console.log(res.data.message);
							axios.get(`/api/question/${question_id}`)
								.then(res => {
									setLikes(res.data.question['likeable_entity.likes.total_likes']);
								})
						})
				}
			})
	}

	// 싫어요 처리
	const addDislike = (e) => {
		e.preventDefault();

		axios.get(`/api/dislike/${likeable_entity_id}`)
			.then(res => {
				if (res.data.is_disliked) {
					axios.delete(`/api/dislike/${likeable_entity_id}`)
						.then(res => {
							console.log(res.data.message);
							axios.get(`/api/question/${question_id}`)
								.then(res => {
									setDislikes(res.data.question['likeable_entity.dislikes.total_dislikes']);
								})
						})
				} else {
					if (res.data.is_liked) {
						axios.delete(`/api/like/${likeable_entity_id}`)
							.then(res => {
								console.log(res.data.message);
								axios.get(`/api/question/${question_id}`)
									.then(res => {
										setLikes(res.data.question['likeable_entity.likes.total_likes']);
									})
							})
					}
					axios.post(`/api/dislike/${likeable_entity_id}`)
						.then(res => {
							console.log(res.data.message);
							axios.get(`/api/question/${question_id}`)
								.then(res => {
									setDislikes(res.data.question['likeable_entity.dislikes.total_dislikes']);
								})
						})
				}
			})
	}

	// 북마크 처리
	const AddBookmarks = (e) => {
		e.preventDefault();
		axios.post(`/api/bookmark/${question_id}`)
		.then(res => {
		console.log(res.data.message);
		alert("즐겨찾기에 추가되었습니다");
		})
		.catch(error => {
			alert(error.response.data.message);
		})
		setbookmarkedColor("yellow");
		setIsbookmarked(true);
		
	}

	const DeleteBookmarks = (e) => {
		e.preventDefault();
		axios.delete(`/api/bookmark/${question_id}`)
		.then(res => {
		console.log(res.data.message);
		alert("즐겨찾기에서 삭제되었습니다");
		})
		.catch(error => {
			alert(error.response.data.message);
		})
		setbookmarkedColor("");
		setIsbookmarked(false);
	}
	
	// 신선도 처리
	const addFreshness = (e) => {
		e.preventDefault();

		setViewInputFresh(false);
		setFreshPoint(0);

		axios.get(`/api/freshness/${question_id}`)
			.then(res => {
				//if(!res.data.is_freshness_evaluated) {
				const fresh = freshPoint;
				axios.post(`/api/freshness/${question_id}`, { fresh })
					.then(res => {
						console.log(res.data.message);
						axios.get(`/api/question/${question_id}`)
							.then(res => {
								console.log(res.data.question);
								setFreshness(res.data.question['freshnesses.average_freshness']);
							})
					})
					.catch(error => {
						alert(error.response.data.message);
					})
				//}
			})
	}
	const deleteFreshness = (e) => {
		e.preventDefault();

		setViewInputFresh(false);
		setFreshPoint(0);

		axios.get(`/api/freshness/${question_id}`)
			.then(res => {
				if (res.data.is_freshness_evaluated) {
					axios.delete(`/api/freshness/${question_id}`)
						.then(res => {
							console.log(res.data.message);
							axios.get(`/api/question/${question_id}`)
								.then(res => {
									console.log(res.data.question);
									setFreshness(res.data.question['freshnesses.average_freshness']);
								})
						})
				}
			})
			.catch(error => {
				alert(error.response.data.message);
			})
	}

	const inputFreshnessForm = (e) => {
		e.preventDefault();
		if (viewInputFresh) {
			setViewInputFresh(false);
		} else {
			setViewInputFresh(true);
		}
	}

	const inputFreshness = (e) => {
		e.preventDefault();

		setFreshPoint(e.target.value);
	}


	// 난이도 처리
	const addDifficulty = (e) => {
		e.preventDefault();

		setViewInputDifficulty(false);
		setDifficultyPoint(0);

		axios.get(`/api/difficulty/${question_id}`)
			.then(res => {
				//if(!res.data.is_Difficulty_evaluated) {
				const score = difficultyPoint;
				axios.post(`/api/difficulty/${question_id}`, { score })
					.then(res => {
						console.log(res.data.message);
						axios.get(`/api/question/${question_id}`)
							.then(res => {
								console.log(res.data.question);
								setDifficulty(res.data.question['difficulties.average_difficulty']);
							})
					})
					.catch(error => {
						alert(error.response.data.message);
					})
				//}
			})
	}
	const deleteDifficulty = (e) => {
		e.preventDefault();

		setViewInputDifficulty(false);
		setDifficultyPoint(0);

		axios.get(`/api/difficulty/${question_id}`)
			.then(res => {
				if (res.data.is_difficulty_evaluated) {
					axios.delete(`/api/difficulty/${question_id}`)
						.then(res => {
							console.log(res.data.message);
							axios.get(`/api/question/${question_id}`)
								.then(res => {
									console.log(res.data.question);
									setDifficulty(res.data.question['difficulties.average_difficulty']);
								})
						})
				}
			})
			.catch(error => {
				alert(error.response.data.message);
			})
	}

	const inputDifficultyForm = (e) => {
		e.preventDefault();
		if (viewInputDifficulty) {
			setViewInputDifficulty(false);
		} else {
			setViewInputDifficulty(true);
		}

	}

	const inputDifficulty = (e) => {
		e.preventDefault();

		setDifficultyPoint(e.target.value);
	}

	const inputCommentContent = (e) => {
		e.preventDefault();

		setInputComment(e.target.value);
	}

	// 문제 ID를 기반으로 댓글을 불러오는 함수
	const loadComments = () => {
		axios.get(`/api/comment?commentable_entity_id=${commentable_entity_id}`)
				.then(res => {
					setComments(res.data.comments.rows);
				})
				.catch(error => {
					alert(error.response.data.message);
				})
	}

	const loadCommentPerPage = (index, e) => {
		e.preventDefault();
		
		axios.get(`/api/comment/`, {
			params: {
				commentable_entity_id:commentable_entity_id,
				page: index,
			}
		})
		.then(res => {
			console.log(res.data);
			setComments(res.data.comments.rows);
		})
		.catch(error => {
			alert(error.response.data.message);
		})
	}

	// 댓글 작성
	const submitComment = (e) => {
		e.preventDefault();
		const content = inputComment;

		axios.post(`/api/comment/${commentable_entity_id}`, { content })
			.then(res => {
				setInputComment('');
				alert(res.data.message);

				loadComments();
			})
			.catch(error => {
				alert(error.response.data.message);
			})
	}

	const deleteComment = (id, e) => {
		e.preventDefault();

		console.log(id);
		axios.delete(`/api/comment/${id}`)
		.then(res => {
			alert(res.data.message);
			
			axios.get(`/api/comment?commentable_entity_id=${commentable_entity_id}`)
				.then(res => {
					console.log('comment:', res.data.comments);
					setComments(res.data.comments.rows);
			})
		})
	}

	const modifyComment = (comment, e) => {
		e.preventDefault();

		if(!modified) {
			setInputModifiedComment(comment);
			setModified(true);
		} else {
			setModified(false);
		}
	}

	const modifyCommentContent = (e) => {
		e.preventDefault();
		setInputModifiedComment(e.target.value);
	}

	const submitModifyComment = (id, e) => {
		e.preventDefault();

		const content = inputModifiedComment;

		console.log(id, content);

		axios.put(`/api/comment/${id}`, {content})
		.then(res => {
			alert(res.data.message);

			loadComments();
			setModified(false);
		})
		.catch(error => {
			alert(error.response.data.message);
		})
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
						<Button variant="info" style={{ width: '19rem', height: '2.5rem' }} onClick={isOwnedHandler}
						>문제 소장</Button>
					</div>
				</div>
			</div>

			<hr />
			<div className="column justify-content-center align-items-center">
				<Card border="light" style={{ backgroundColor: "#f7feff" }}>
					<Card className="center" style={{ width: '85rem', height: '20rem' , overflow: 'auto'}}>
						<Card.Header>
							<div className="d-flex bd-highlight mb-3">
								<div className="mr-auto p-2 bd-highlight">
								<div style={{ fontWeight: "bold", fontsize: "rem" }}>
									#{question.id} {subject} - {course}
								</div>
								</div>
								<Button variant="info" style={{ width: '2.4rem', height: '2rem' }} onClick={isBookmarked?DeleteBookmarks:AddBookmarks} >
									<FontAwesomeIcon icon={faThumbtack} className="mr-2" style={{color:bookmarkedColor}}/>
								</Button>
								</div>
						</Card.Header>
						<Card.Body>
							<div style={{ fontWeight: "bold"}}>제목: {question.title} </div>
							<br />
							<div style={{height: "200px !important"}}>
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
							</div>
						</Card.Body>

					</Card>
					<Card.Footer style={{paddingTop:"0rem", paddingBottom:"1rem", backgroundColor: "#ffffff", border:"light"}} >
								<div className="d-flex bd-highlight mb-3" style={{ height: "0.8rem"}}>

									<div className="mr-auto p-2 bd-highlight" style={{width:"25%"}}>
										<Button style={{padding:"9px", paddingRight:"2px", paddingTop:"2px", paddingBottom:"2px"}} 
											onClick={addLike}>
											
											<FontAwesomeIcon icon={faThumbsUp} className="mr-2"/>
							</Button>&nbsp;&nbsp;

										{likes}

									</div>
									<div className="mr-auto p-2 bd-highlight"style={{width:"25%"}}>
										<Button style={{paddingLeft:"9px", paddingRight:"2px", paddingTop:"4px", paddingBottom:"0px"}}
											onClick={addDislike}>
											<FontAwesomeIcon icon={faThumbsDown} className="mr-2"/>
							</Button>&nbsp;&nbsp;
										{dislikes}
									</div>
									<div className="mr-auto p-2 bd-highlight wrapper"style={{width:"25%"}}>
										<Button variant="danger" style={{padding:"9px", paddingRight:"2px", paddingTop:"3px", paddingBottom:"1px"}}
											onClick={inputFreshnessForm}>
											<FontAwesomeIcon icon={faAppleAlt} className="mr-2"/>
							</Button>&nbsp;&nbsp;
										{viewInputFresh && <div><input onChange={(e) => inputFreshness(e)} style={{ width: "15%" }}></input>
											<button onClick={addFreshness}>제출</button>
											<button onClick={deleteFreshness}>삭제</button>
										</div>}
										{Number(freshness).toFixed(2)}

									</div>
									<div className="mr-auto p-2 bd-highlight"style={{width:"25%"}}>
										<Button variant="warning" style={{padding:"7px", paddingRight:"0px", paddingTop:"3px", paddingBottom:"1px"}}
											onClick={inputDifficultyForm}>
											<FontAwesomeIcon icon={faStar} style={{color:"white"}} className="mr-2"/>
							</Button>&nbsp;&nbsp;
										
										{viewInputDifficulty && <div><input onChange={(e) => inputDifficulty(e)} style={{ width: "15%" }}></input>
											<button onClick={addDifficulty}>제출</button>
											<button onClick={deleteDifficulty}>삭제</button>
										</div>}
										{Number(difficulty).toFixed(2)}
									</div>
								</div>
										
							</Card.Footer>
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
										<Button variant="outline-light" style={{ width: '40rem', color: choiceColor[index], backgroundColor: "lavender" }} onClick={(e) => { selectAnswer(index, e) }}>{'('}{index + 1}{')'} {i.item_text}</Button><br />
									</div>
								)}
								<br />

							</div>
							: (questionType === "short_answer") ? <div>
								<div>
									<p> 아래에 정답을 입력하세요.</p>
								</div>

								<div><input type="text" id="title" className="input" style={{ width: "85rem", height: "3rem" }} onChange={(e) => makeAnswer(e)} /><br /> </div>
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
				
				<div style={{ height: "0.5rem" }}>
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
											<br />
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
					{(questionType !== 'essay') ?
						<Button className="btn-block" variant="info" style={{ width: '20rem' }}
							onClick={(e) => { show_Explanation(false, e) }}
						>풀이 확인 </Button>
						: <div></div>}
					{(showExplanation && (questionType === 'short_answer' || questionType === 'multiple_choice')) ?
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
							<Card border="light" style={{ backgroundColor: "#f7feff" }}>
								<Card className="center" style={{ width: '80%', height: '20rem', overflow: 'auto' }}>
									<Card.Body>
										<br />
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
							<Accordion>
							<Card className="center" style={{ width: '70rem' }}>

								<Accordion.Toggle className="center" as={Button} variant="light" block eventKey="0">
									댓글 보기
								</Accordion.Toggle>
								<Accordion.Collapse eventKey="0">

									<Card.Body style={{ backgroundColor: "white" }} >

										<div>
											{comments.map((i) =>
												<div key={i.id}>
													<div>
													<div style={{fontWeight:"bold"}}>작성자: {i.user.username} <br/></div>
														<br/><br/>
														{(username === i.user.username) ?
															(modified) ? 
															<div>
																<FormControl defaultValue={inputModifiedComment} onChange={(e) => modifyCommentContent(e)} type="text" id="title" className="input" style={{ width: "100%", height: "3rem" }} />
																<Button onClick = {(e) => submitModifyComment(i.id, e)}>제출</Button>
															</div>: <div>
																{i.content} 
																<Button onClick = {(e) => modifyComment(i.content, e)}>수정</Button>&nbsp;&nbsp;<Button onClick={(e) => deleteComment(i.id, e)}>삭제</Button></div> : 
															<div>
																{i.content} 
															</div>
														} <br/>
													</div>
												
													<hr/>	
												</div>
											)}
												<ul className="row justify-content-center align-items-center">
																	{pages.map((i, index) => 
																		<div key={index}>
																			<button onClick={(e) => loadCommentPerPage(i, e)}>{i}</button>
																		</div>)
																	}
												</ul>
										</div>
										<br />

										
									</Card.Body>
								</Accordion.Collapse>
							</Card>
						</Accordion>
						<FormControl placeholder="댓글 작성하기" onChange={(e) => inputCommentContent(e)} type="text" id="title" className="input" style={{ width: "100%", height: "3rem" }} />
						<Button variant="info" onClick={submitComment}>제출</Button>
						</div>
						: <div>
							<Accordion>
							<Card className="center" style={{ width: '70rem' }}>

								<Accordion.Toggle className="center" as={Button} variant="light" block eventKey="0">
									댓글 보기
								</Accordion.Toggle>
								<Accordion.Collapse eventKey="0">

									<Card.Body style={{ backgroundColor: "white" }} >

										<div>
											{comments.map((i) =>
												<div key={i.id}>
													<div>
													<div style={{fontWeight:"bold"}}>작성자: {i.user.username} <br/></div>
														<br/><br/>
														{(username === i.user.username) ?
															(modified) ? 
															<div>
																<FormControl defaultValue={inputModifiedComment} onChange={(e) => modifyCommentContent(e)} type="text" id="title" className="input" style={{ width: "100%", height: "3rem" }} />
																<Button onClick = {(e) => submitModifyComment(i.id, e)}>제출</Button>
															</div>: <div>
																{i.content} 
																<Button onClick = {(e) => modifyComment(i.content, e)}>수정</Button>&nbsp;&nbsp;<Button onClick={(e) => deleteComment(i.id, e)}>삭제</Button></div> : 
															<div>
																{i.content} 
															</div>
														} <br/>
													</div>
												
													<hr/>	
												</div>
											)}
												<ul className="row justify-content-center align-items-center">
																	{pages.map((i, index) => 
																		<div key={index}>
																			<button onClick={(e) => loadCommentPerPage(i, e)}>{i}</button>
																		</div>)
																	}
												</ul>
										</div>
										<br />

										
									</Card.Body>
								</Accordion.Collapse>
							</Card>
						</Accordion>
						<FormControl placeholder="댓글 작성하기" onChange={(e) => inputCommentContent(e)} type="text" id="title" className="input" style={{ width: "100%", height: "3rem" }} />
						<Button variant="info" onClick={submitComment}>제출</Button>
						</div>
					}
				</div>
			</div>


		</Container>
	);
}

export default SolveQuestion;
