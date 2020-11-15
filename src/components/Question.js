import React, { useState, useEffect } from "react";
import { Container, Button, CardDeck } from "react-bootstrap";
import classNames from "classnames";
import { Link, useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import axios from "axios";
import store from "../store";
import { faAppleAlt, faHeart, faStar, faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Question = ({ subject, course, isOpen }) => {

	const [question, setQuestion] = useState([]);
	/*
	const [likeList, setLikeList] = useState([]);
	const [dislikeList, setDislikeList] = useState([]);
	const [freshList, setFreshList] = useState([]);
	const [difficutlyList, setDifficultyList] = useState([]);
	*/
	const [pages, setPages] = useState([]);
	let history = useHistory();

	useEffect(() => {
		axios.get(`/api/question?course_title=${course}`)
			.then(res => {
				console.log(res.data);

				setQuestion(res.data.questions.rows);

				let count = res.data.questions.count / 10 + 1;
				let t_pages = [];

				for(var i = 1; i < count; i++) {
					t_pages.push(i);
				}
				setPages(t_pages);

				/*
				let like_list = [];
				let dislike_list = [];
				let fresh_list = [];
				let difficulty_list = [];
				for(var i in res.data.questions) {
					like_list.push(res.data.questions[i]['likeable_entity.total_likes']);
					dislike_list.push(res.data.questions[i]['likeable_entity.total_dislikes']);
					fresh_list.push(res.data.questions[i]['average_freshness']);
					difficulty_list.push(res.data.questions[i]['average_difficulty']);
				}
				setLikeList(like_list);
				setDislikeList(dislike_list);
				setFreshList(fresh_list);
				setDifficutlyList(difficultyList);
				*/
			})
			.catch(error => {
				alert(error.response.data.message);
			})
	}, []);

	const submitHandler = (event) => {
		event.preventDefault();
			
		if(store.getState().isLoggedIn) {
			history.push(`/subject/${subject}/${course}/make/${1}`);
			} else {
				alert('로그인이 필요한 기능입니다.');
				history.push("/login");
			}
	}

	const loadQuestionPerPage = (index, e) => {
		e.preventDefault();
		
		axios.get(`/api/question/`, {
			params: {
				course_title: course,
				subject_title: subject,
				page: index,
			}
		})
		.then(res => {
			console.log(res.data);
			setQuestion(res.data.questions.rows);
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
					<div className = "d-flex bd-highlight mb-3">
        			<div className="mr-auto p-2 bd-highlight"> 
					<h4 style={{fontWeight:"bolder"}}>
						과목 {'>'} {subject} {'>'} {course} 
        			</h4>
					</div>
					<div className = "p-2 bd-highlight">
					<div>
						<Button variant="info" style = {{width: '19rem', height: '2.5rem'}} onClick={submitHandler}
							href={`/subject/${subject}/${course}/make/${1}`}
						>문제 생성</Button>
						</div>
						</div>
					</div>
				<hr/>
				<ul>
				<CardDeck>
					{question.map((i) =>
					 <div className="container h-100" key={i.id}>
					 <div className="row h-100 justify-content-center align-items-center">
						
						 <Card className="text-center" variant="info" style={{ width: '30rem' }}>
						<Link key={i.id} 
						to={{
							pathname: `/subject/${subject}/${course}/${i.id}`,
						}}>
							<Card.Header>
							<div>
							문제 #{i.id} {subject} - {course}  
							</div>


							</Card.Header>
							<Card.Body><div style={{fontWeight:"lighter"}}>{i.title}
							</div>
							</Card.Body>
							<Card.Footer>
							<div className="d-flex bd-highlight mb-3" style={{height:"0.8rem"}}>
							
							<div className="mr-auto p-2 bd-highlight">
							좋아요 &nbsp;
							<FontAwesomeIcon icon={faThumbsUp}className="ml-auto"/>&nbsp;
							{i["likeable_entity.total_likes"]}
							
							</div>

							<div className="mr-auto p-2 bd-highlight">
							싫어요 &nbsp;
							<FontAwesomeIcon icon={faThumbsDown} className="ml-auto" />&nbsp;
							{i["likeable_entity.total_dislikes"]}
							
							</div>
							
							<div className="mr-auto p-2 bd-highlight">
							신선해요 &nbsp;  
							<FontAwesomeIcon icon={faAppleAlt} className="ml-auto" />&nbsp;
							{i.average_freshness}
							</div>

							<div className="mr-auto p-2 bd-highlight">
							난이도  &nbsp;
							<FontAwesomeIcon icon={faStar} className="ml-auto"  />&nbsp;
							{i.average_difficulty}
							</div>
							</div>
								 </Card.Footer>
						</Link>
						</Card>
						</div>
						<br />
						</div>
					)}
					</CardDeck>
				</ul>
				<ul className="row justify-content-center align-items-center">
				{pages.map((i) => 
						<div>
							<button onClick={(e) => loadQuestionPerPage(i, e)}>{i}</button>
						</div>)
					}		
				</ul>
			</div>
		</Container>
	);
}

export default Question;