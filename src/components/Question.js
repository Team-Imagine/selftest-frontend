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
	const [pages, setPages] = useState([]);
	const [curPage, setCurPage] = useState(1);

	const [temp, setTemp] = useState(true);
	const [testState, setTestState] = useState("info");
	const [selected, setSelected] = useState([]);
	const [addTest, setAddTest] = useState([]);
	
	let history = useHistory();
	
	useEffect(() => {
		axios.get(`/api/question?course_title=${course}`)
			.then(res => {
				console.log(res.data);

				setQuestion(res.data.questions.rows);

				let count = res.data.questions.count / 10 + 1;
				let t_row = [];
				let t_col = [];

				for (var i = 1; i <= count; i++) {
					t_col = [];
					for(var j = 0; j< 10; j++) {
						if((i-1) * 10 + j < res.data.questions.count) {
							t_col.push({selected:"info", question_id: res.data.questions.rows[j].id});
						}
					}
					t_row.push(t_col);
				}

				console.log(t_row);
				setSelected(t_row);
				
				let t_pages = [];

				for (var i = 1; i < count; i++) {
					t_pages.push(i);
				}
				setPages(t_pages);
			})
			.catch(error => {
				alert(error.response.data.message);
			})
	}, []);
	
	const submitHandler = (event) => {
		event.preventDefault();

		if (store.getState().isLoggedIn) {
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
				
				let tSelected = selected;
				for(var col = 0; col < res.data.questions.rows.length; col++) {
					tSelected[index-1][col].question_id = res.data.questions.rows[col].id;
				}
				
				console.log("test:", selected);
				
				setQuestion(res.data.questions.rows);
				setSelected([...tSelected]);
				setCurPage(index);
			})
			.catch(error => {
				alert(error.response.data.message);
			})
			
	}

	const selectHandler = (index, e) => {
		e.preventDefault();

		let t_selected = selected;
		if(t_selected[curPage -1][index].selected === "info")
			t_selected[curPage -1][index].selected = "danger";
		else {
			t_selected[curPage -1][index].selected = "info";
		}

		setSelected([...t_selected]);
	}

	const makeTestHandler = () => {
		if(testState === "info")
			setTestState("danger");
		else {
			var result = window.confirm('시험을 생성하시겠습니까?');
			if(result) {
				console.log(selected);
				
				for(var row = 0; row < selected.length; row++) {
					for(var col = 0; col < selected[row].length; col++) {
					if(selected[row][col].selected === 'danger')
						console.log(row , col);
						console.log(question)
					}
				}
			} else {
				setTestState("info");
			}
		}
	}

	return (
		<Container
			fluid
			className={classNames("content", { "is-open": { isOpen } })}
		>
			<div>
				<div className="d-flex bd-highlight mb-3">
					<div className="mr-auto p-2 bd-highlight">
						<h4 style={{ fontWeight: "bolder" }}>
							과목 {'>'} {subject} {'>'} {course}
						</h4>
					</div>
					<div className="p-2 bd-highlight">
						<div>
						
							<Button variant={testState} style = {{width: '19rem', height: '2.5rem'}} onClick={makeTestHandler}
							>시험 생성</Button>
							&nbsp;
							<Button variant="info" style={{ width: '19rem', height: '2.5rem' }} onClick={submitHandler}
								href={`/subject/${subject}/${course}/make/${1}`}
							>문제 생성</Button>
						</div>
					</div>
				</div>
				<hr />
				<ul>
					<CardDeck>
						{question.map((i, index) =>
							<div className="container h-100" key={i.id}>
								<div className="row h-100 justify-content-center align-items-center">

									<Card className="text-center" variant="info" style={{ width: '30rem' }}>
										<Link key={i.id}
											to={{
												pathname: `/subject/${subject}/${course}/${i.id}/problem_solving/${1}`
											}}>
											<Card.Header>
												<div>
													문제 #{i.id} {subject} - {course}
												</div>


											</Card.Header>
											<Card.Body><div style={{ fontWeight: "lighter" }}>{i.title}
											</div>
											</Card.Body>
											<Card.Footer>
												<div className="d-flex bd-highlight mb-3" style={{ height: "0.8rem" }}>

													<div className="mr-auto p-2 bd-highlight">
														좋아요 &nbsp;
							<FontAwesomeIcon icon={faThumbsUp} className="ml-auto" />&nbsp;
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
							{Number(i.average_freshness).toFixed(2)}
													</div>

													<div className="mr-auto p-2 bd-highlight">
														난이도  &nbsp;
							<FontAwesomeIcon icon={faStar} className="ml-auto" />&nbsp;
							{Number(i.average_difficulty).toFixed(2)}
													</div>
												</div>
											</Card.Footer>
										</Link>
									</Card>
									{(testState === "danger") &&
									<div>
										<Button
										variant={selected[curPage -1][index].selected}
										onClick={(e) => selectHandler(index, e)}
										>추가</Button>
									</div>
									}
								</div>
								<br />
							</div>
						)}
					</CardDeck>
				</ul>
				<ul className="row justify-content-center align-items-center">
					{pages.map((i, index) =>
						<div key={index}>
							<button style={{ backgroundColor: '#ffffff', border: '1px solid', width: '1.5rem' }} onClick={(e) => loadQuestionPerPage(i, e)}>{i}</button>&nbsp;
						</div>)
					}
				</ul>
			</div>
		</Container>
	);
}

export default Question;