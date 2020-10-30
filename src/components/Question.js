import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import classNames from "classnames";
import { Link } from 'react-router-dom';

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
						Subjects {'>'} {subject} {'>'} {course}
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
						<Link key={i.id} to={{
							pathname: `/subject/${subject}/${course}/${i.id}`,
						}}>
							{i.title}
							<br />
						</Link>
					)}
				</ul>
			</div>
		</Container>
	);
}

export default Question;