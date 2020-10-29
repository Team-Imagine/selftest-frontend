import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import classNames from "classnames";
import { Link } from 'react-router-dom';

import axios from "axios";

const Questioncontent = ({ subject, course, question_id, isOpen }) => {

	const [answer, setAnswer] = useState([]);

	useEffect(() => {

	
		axios.get(`/api/answer?question_id=${question_id}`)
			.then(res => {
				console.log(res.data);

				setAnswer(res.data.answers);

			})
	}, []);

	return (
		<Container
			fluid
			className={classNames("content", { "is-open": { isOpen } })}
		>
			<div>
				<h1>
					Question Page ( {course} - )
        </h1>
				<ul>
					{answer.map((i) =>			
						<Link key={i.content} to={{
							pathname: `/subject/${subject}/${course}/${i.id}`,
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

export default Questioncontent;
