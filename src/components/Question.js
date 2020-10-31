import React, { useState, useEffect } from "react";
import { Container, Button, CardDeck } from "react-bootstrap";
import classNames from "classnames";
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import axios from "axios";

const Question = ({ subject, course, isOpen }) => {

	const [question, setQuestion] = useState([]);

	useEffect(() => {
		axios.get(`/api/question?course_title=${course}`)
			.then(res => {
				console.log(res.data);

				setQuestion(res.data.questions);
			
			})
	}, []);

	return (
		<Container
			fluid
			className={classNames("content", { "is-open": { isOpen } })}
		>
			<div>
				<div style={{ display: 'flex' }}>
					<h2>
						Subjects {'>'} {subject} {'>'} {course} {'>'} Question
        			</h2>
					<hr/>
					<div>
						<Button variant = "info"
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
						<Link key={i.id} to={{
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