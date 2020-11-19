import React, { useState, useEffect } from "react";
import { Container, Button, CardDeck } from "react-bootstrap";
import classNames from "classnames";
import { Link, useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import axios from "axios";
import store from "../store";
import { faAppleAlt, faHeart, faStar, faThumbsDown, faThumbsUp, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Bookmarkscontent = ({  isOpen, }) => {

  const[bookmarks, setBookmarks] = useState([]);
	let history = useHistory();

	useEffect(() => {
		axios.get(`/api/bookmark`)
			.then(res => {
				console.log(res.data);

				setBookmarks(res.data.bookmarks.rows);
			})
			.catch(error => {
				alert(error.response.data.message);
			})
  }, []);

  const DeleteBookmarks=id=> (e) => {
	e.preventDefault();
	
		console.log("id:",id);
		axios.delete(`/api/bookmark/${id}`)
		.then(res => {
			console.log(res.data.message);
			alert("문제가 즐겨찾기에서 삭제되었습니다")

			axios.get(`/api/bookmark`)
			.then(res => {
				console.log(res.data);

				setBookmarks(res.data.bookmarks.rows);
			})
			.catch(error => {
				alert(error.response.data.message);
			})
		})
		.catch(error => {
			alert(error.response.data.message);
		})
	
}

  
  

  /*
	const submitHandler = (event) => {
		event.preventDefault();
			
		if(store.getState().isLoggedIn) {
			history.push(`/subject/${subject}/${course}/make/${1}`);
			} else {
				alert('로그인이 필요한 기능입니다.');
				history.push("/login");
			}
	}
*/

	return (
		<Container
			fluid
			className={classNames("content", { "is-open": { isOpen } })}
		>
			<div>
					<div className = "d-flex bd-highlight mb-3">
        			<div className="mr-auto p-2 bd-highlight"> 
					<h4 style={{fontWeight:"bolder"}}>
						즐겨찾기
        			</h4>
					</div>
					
					</div>
				<hr/>
				<ul>
				<CardDeck>
					{bookmarks.map((i) =>
					 <div className="container h-100" key={i["question.id"]}>
					 <div className="row h-100 justify-content-center align-items-center">
						
						 <Card className="text-center" variant="info" style={{ width: '30rem' }}>
						<Link key={i["question.id"]}
						to={{
							pathname: `/subject/${i["question.course.subject.title"]}/${i["question.course.title"]}/${i["question.id"]}/problem_solving/${1}`,
						}}>
							<Card.Header style={{height:"3.5rem"}}>
							<div className="d-flex bd-highlight mb-3">
							<div className="mr-auto p-2 bd-highlight">
              				#{i["question.id"]} {i["question.course.subject.title"]} - {i["question.course.title"]}
							</div>
							<div >
							<Button variant="info" style={{ width: '2.4rem', height: '2rem' }} onClick={DeleteBookmarks(i["question.id"])}>
							<FontAwesomeIcon icon={faTrashAlt} className="ml-auto"  />
							</Button>
							</div>
							</div>

							</Card.Header>
							<Card.Body><div style={{fontWeight:"lighter"}}>{i["question.title"]}
							</div>
							</Card.Body>
							<Card.Footer>
							<div className="d-flex bd-highlight mb-3" style={{height:"0.8rem"}}>
							
							<div className="mr-auto p-2 bd-highlight">
							좋아요 &nbsp;
							<FontAwesomeIcon icon={faThumbsUp}className="ml-auto"/>&nbsp;
							{i["question.likeable_entity.total_likes"]}
							
							</div>

							<div className="mr-auto p-2 bd-highlight">
							싫어요 &nbsp;
							<FontAwesomeIcon icon={faThumbsDown} className="ml-auto" />&nbsp;
							{i["question.likeable_entity.total_dislikes"]}
							
							</div>
							
							<div className="mr-auto p-2 bd-highlight">
							신선해요 &nbsp;  
							<FontAwesomeIcon icon={faAppleAlt} className="ml-auto" />&nbsp;
							{!i["question.average_freshness"]?"0.0000":i["question.average_freshness"]}
							</div>

							<div className="mr-auto p-2 bd-highlight">
							난이도  &nbsp;
							<FontAwesomeIcon icon={faStar} className="ml-auto"  />&nbsp;
							{i["question.average_difficulty"]}
							</div>
							</div>
							</Card.Footer>
							{/*
							<Card.Footer>
							
							<div className="d-flex bd-highlight mb-3" style={{height:"0.8rem"}}>
							
							<div className="mr-auto p-2 bd-highlight">
							좋아요 &nbsp;
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
				
								 </Card.Footer>	*/}
						</Link>
						</Card>
						</div>
						<br />
						</div>
					)}
					</CardDeck>
				</ul>
			</div>
		</Container>
	);
}

export default Bookmarkscontent;