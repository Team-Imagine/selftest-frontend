import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import classNames from "classnames";
import { Link } from 'react-router-dom';

import axios from "axios";

const Course = ({ subject, isOpen }) => {

	const [course, setCourse] = useState([]);

	useEffect(() => {
		const subject_title = subject;

		axios.get(`/api/course?subject_title=${subject_title}`)
			.then(res => {
				console.log(res.data);

				setCourse(res.data.courses);

			})
	}, []);

	return (
		<Container
			fluid
			className={classNames("content", { "is-open": { isOpen } })}
		>
			<div>
				<h1>
					Course Page ( {subject} )
        		</h1>
				<ul>
					{course.map((i) =>
						<Link key={i.title} to={{
							pathname: `/subject/${subject}/${i.title}`,
							subject: subject,
							course: i.title
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

export default Course;
