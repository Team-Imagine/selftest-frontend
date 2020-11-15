import React, { useState, useEffect } from "react";
import { Container, Button, CardDeck, FormControl } from "react-bootstrap";
import classNames from "classnames";
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import Card from "react-bootstrap/Card";
import Accordion from 'react-bootstrap/Accordion'
import { faAppleAlt, faHeart, faStar, faThumbtack, faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import store from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";

const Questioncontent = ({ subject, course, question_id, isOpen }) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [items, setItems] = useState([]);

	const [question, setQuestion] = useState('');
	const [comments, setComments] = useState([]);
	const [commentCount, setCommentCount] = useState(0);
	const [pages, setPages] = useState([]);

	const [likes, setLikes] = useState(0);
	const [dislikes, setDislikes] = useState(0);
	const [freshness, setFreshness] = useState('blank');
	const [difficulty, setDifficulty] = useState('blank');
	const [isBookmarked, setIsbookmarked] = useState(false);
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
					//console.log('bookmarked',isBookmarked);
					//console.log('bookmarked(api_result)',res.data);
				})	
			axios.get(`/api/question/${question_id}`)
				.then(res => {
					console.log(res.data);

					setQuestion(res.data.question);

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

					console.log(htmlToEditor);

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
			<div>
				<div className="d-flex bd-highlight mb-3">
					<div className="mr-auto p-2 bd-highlight">
						<h4 style={{ fontWeight: "bolder" }}>
							과목 {'>'} {subject} {'>'} {course} {'>'} 문제
        			</h4>
					</div>
					<div className="p-2 bd-highlight">
						<div>
							<Button variant="info" style={{ width: '19rem', height: '2.5rem' }}
								href={`/subject/${subject}/${course}/${question_id}/problem_solving/${1}`}
							>문제 풀이</Button>
						</div>
					</div>
				</div>
				<hr />
				<div className="row h-100 justify-content-center align-items-center">

					<Card border="light" style={{ backgroundColor: "#f7feff" }}>
						<Card className="center" style={{ width: '70rem' }}>
							
							<Card.Header style={{height:"3.5rem"}}>
							<div className="d-flex bd-highlight mb-3">
								<div className="mr-auto p-2 bd-highlight">
								<div style={{ fontWeight: "bold", fontsize: "rem" }}>
									#{question.id} {subject} - {course}
								</div>
								</div>
								<Button variant="info" style={{ width: '2.4rem', height: '2rem' }}>
									<FontAwesomeIcon icon={faThumbtack} className="mr-2" onClick={AddBookmarks} style={isBookmarked?{transform: `rotate(90deg)`}:{}}/>
								</Button>
								</div>
							</Card.Header>
							
							<Card.Body>
								<div style={{ fontWeight: "bold" }}>제목: {question.title} </div>
								<br />

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
							<Card.Footer style={{paddingTop:"0rem", paddingBottom:"1rem"}}>
								<div className="d-flex bd-highlight mb-3" style={{ height: "0.8rem" }}>

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
										{freshness}

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
										{difficulty}

									</div>
								</div>
							</Card.Footer>
						</Card>
						<br />

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
																<Button onClick = {(e) => modifyComment(i.content, e)}>수정</Button>&nbsp;&nbsp;<Button onClick={(e) => deleteComment(i.id, e)}>삭제</Button></div> : <div></div>} <br/>
																<ul className="row justify-content-center align-items-center">
																	{pages.map((i, index) => 
																		<div key={index}>
																			<button onClick={(e) => loadCommentPerPage(i, e)}>{i}</button>
																		</div>)
																	}
																</ul>
													</div>
												
													<hr/>	
												</div>
											
											)}
										</div>
										<br />

										
									</Card.Body>
								</Accordion.Collapse>
							</Card>
						</Accordion>
						<FormControl placeholder="댓글 작성하기" onChange={(e) => inputCommentContent(e)} type="text" id="title" className="input" style={{ width: "100%", height: "3rem" }} />
						<Button variant="info" onClick={submitComment}>제출</Button>
					</Card>

				</div>
			</div>

		</Container>
	);
}

export default Questioncontent;
