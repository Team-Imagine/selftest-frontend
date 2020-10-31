import React, { useState, useEffect } from "react";
import { Container, Button, CardDeck } from "react-bootstrap";
import classNames from "classnames";
import { Link, useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import axios from "axios";
import store from "../store";

const Question = ({ subject, course, isOpen }) => {

	const [question, setQuestion] = useState([]);
	let history = useHistory();

	useEffect(() => {
		axios.get(`/api/question?course_title=${course}`)
			.then(res => {
				console.log(res.data);

				setQuestion(res.data.questions);
			
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
	
	return (
		<Container
			fluid
			className={classNames("content", { "is-open": { isOpen } })}
		>
			<div>
				<div style={{ display: 'flex' }}>
					<h4>
						Subjects {'>'} {subject} {'>'} {course} {'>'} Question
        			</h4>
					<hr/>
					<div>
						<Button onClick={submitHandler}
							href={`/subject/${subject}/${course}/make/${1}`}
						>문제 생성</Button>
					</div>

				</div>
				<hr/>
				<ul>
					
					{question.map((i) =>
					 <div className="container h-100" key={i.id}>
					 <div className="row h-100 justify-content-center align-items-center">
						
						 <Card className="text-center" variant="info" style={{ width: '50rem' }}>
						<Link key={i.id} 
						to={{
							pathname: `/subject/${subject}/${course}/${i.id}`,
						}}>
							<Card.Header>
							<div>
							{i.title}
							</div>
							</Card.Header>
							<Card.Body>Click to see details</Card.Body>
							<Card.Footer>좋아요    신선도 </Card.Footer>
						</Link>
						</Card>
						</div>
						<br />
						</div>
					)}
				</ul>
			</div>
		</Container>
	);
}

export default Question;