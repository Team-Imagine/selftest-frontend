import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import classNames from "classnames";
import { Link } from 'react-router-dom';

import axios from "axios";

const Question = ({ subject, course, isOpen }) => {

	const [question, setQuestion] = useState([]);

	useEffect(() => {
		const course_title = { course };

		axios.get(`/api/question/`, course_title)
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
				<h1>
					Question Page ( {course} )
        </h1>
				<ul>
					{question.map((i) =>			
						<Link key={i.content} to={{
							pathname: `/subject/${subject}/${course}/${i.content}`,
							subject: subject,
							course: course
						}}>
							{i.content}
							<br />
						</Link>
						
					)}
				</ul>
			</div>
		</Container>
	);
}

export default Question;
