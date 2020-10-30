import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import classNames from "classnames";
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'

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
				<h2>
					Subjects {'>'} {subject} 
        		</h2>
				<hr />
				<ul>
					{course.map((i) =>
					<div className="container h-100" key={i.title}>
					<div className="row h-100 justify-content-center align-items-center">
					<Alert variant="info" style={{ width: '25rem' }}
        >
          				<br/>
						<Link key={i.title} to={{
							pathname: `/subject/${subject}/${i.title}`,
						}}>
						<div>
						{i.title}
						</div>
						<br />
						</Link>
					</Alert>
					<br/>
					</div>
					</div>
					)}
				</ul>
			</div>
		</Container>
	);
}

export default Course;
