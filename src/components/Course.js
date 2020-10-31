import React, { useState, useEffect } from "react";
import { Container, Accordion, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import classNames from "classnames";
import { Link, useHistory } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import store from "../store";

import axios from "axios";

const Course = ({ subject, isOpen }) => {

	const [course, setCourse] = useState([]);
	const [state, setState] = useState(0);
	const [title, setTitle] = useState('');
	let history = useHistory();

	useEffect(() => {
		const subject_title = subject;

		axios.get(`/api/course?subject_title=${subject_title}`)
			.then(res => {
				console.log(res.data);

				setCourse(res.data.courses);

			})
	}, [state]);

	const onChange = (e) => {
		setTitle(e.target.value);
  }
  
  const submitHandler = (event) => {
		event.preventDefault();
		
		if(store.getState().isLoggedIn) {
		const data = {
			title: title,
			subject_title: subject,
		}

    axios.post('/api/course', data)
      .then(res => {
        console.log(res.data);

				setTitle('');
				setState(1);
			})
		} else {
			setTitle('');
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
				<h4>
					Subjects {'>'} {subject} 
        		</h4>
						<Accordion>
				<br/>
				<Card border = "info" className = "center" style = {{width: '70rem'}}>
				<Card.Header>
				<Accordion.Toggle className ="center" as={Button} variant="light"  block eventKey="0">
					코스 추가
				</Accordion.Toggle>
				</Card.Header>
				<Accordion.Collapse eventKey="0">

				<Card.Body style={{ backgroundColor:"white"}} >
				<br/>
				<div>
          <input type="text" id="title" className="input" value={title} placeholder="추가할 코스 이름을 입력하세요" fontSize="20" onChange={onChange}/>
          <Button
				  onClick={submitHandler}
			    >코스 등록</Button>
				</div>
				<br/> <br/>
				</Card.Body>
    			</Accordion.Collapse>		
				</Card>
				</Accordion>
				<hr />
				<ul>
					{course.map((i) =>
					<div className="container h-100" key={i.title}>
					<div className="row h-100 justify-content-center align-items-center">
					<Alert className = "text-center" variant="info" style={{ width: '25rem' }}
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
