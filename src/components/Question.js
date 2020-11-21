import React, { useState, useEffect } from "react";
import { Container, Button, CardDeck, Accordion, FormControl, ButtonGroup } from "react-bootstrap";
import classNames from "classnames";
import { Link, useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import axios from "axios";
import store from "../store";
import { faAppleAlt, faHeart, faStar, faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Question = ({ subject, course, isOpen }) => {

	const [question, setQuestion] = useState({
		question: [],
		curPage: 1,
	}
	);
	const [pages, setPages] = useState([]);

	const [testTitle, setTestTitle] = useState('');
	const [testState, setTestState] = useState("info");
	const [selected, setSelected] = useState([]);
	const [addTest, setAddTest] = useState([]);


	let history = useHistory();


	useEffect(() => {
		axios.get(`/api/question?course_title=${course}`)
			.then(res => {
				console.log(res.data);

				//setQuestion(res.data.questions.rows);
				setQuestion({ question: res.data.questions.rows, curPage: 1 });
				let count = res.data.questions.count / 10 + 1;
				let t_row = [];
				let t_col = [];

				for (var i = 1; i <= count; i++) {
					t_col = [];
					for (var j = 0; j < 10; j++) {
						if ((i - 1) * 10 + j < res.data.questions.count) {
							t_col.push({ selected: "info", question_id: res.data.questions.rows[j].id });
						}
					}
					t_row.push(t_col);
				}
				//console.log('check:', question);
				//console.log(t_row);
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
				for (var col = 0; col < res.data.questions.rows.length; col++) {
					tSelected[index - 1][col].question_id = res.data.questions.rows[col].id;
				}

				//setQuestion(res.data.questions.rows);
				setQuestion({ question: res.data.questions.rows, curPage: index });

				//setCurPage(index);
				setSelected([...tSelected]);

			})
			.catch(error => {
				alert(error.response.data.message);
			})
	}

	const selectHandler = (index, e) => {
		e.preventDefault();

		let t_selected = selected;
		if (t_selected[question.curPage - 1][index].selected === "info") {
			t_selected[question.curPage - 1][index].selected = "danger";

		}
		else {
			t_selected[question.curPage - 1][index].selected = "info";
		}

		setSelected([...t_selected]);
	}

	const makeTestHandler = (value, e) => {
		e.preventDefault();

		if (value) {
			if (testState === "info") {
				setTestState("danger");
			} else {
				var result = window.confirm('시험을 생성하시겠습니까?');
				if (result) {
					let t_addTest = [];
					for (var row = 0; row < selected.length; row++) {
						for (var col = 0; col < selected[row].length; col++) {
							if (selected[row][col].selected === 'danger') {
								console.log(row, col, selected[row][col].question_id);
								t_addTest.push({ id: selected[row][col].question_id });
							}
						}
					}
					console.log(t_addTest);
					setAddTest(t_addTest);
					let title = testTitle;

					axios.post(`/api/testset/`, { title })
						.then(res => {
							console.log(res.data);

							let data = {
								test_set_id: res.data.test_set.id,
								questions: t_addTest,
							}
							console.log(data);
							axios.post(`/api/testset/question/`, data)
								.then(res => {
									console.log(res.data);
								})
						})
				}
			}
		} else {

			setTestState('info');
		}
	}

	const testTitleChange = (e) => {
		e.preventDefault();

		setTestTitle(e.target.value);
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
					<div className="d-flex p-2 bd-highlight">

						<Accordion>
							<Card border="info" style={{ width: "19rem" }}>
								<Accordion.Toggle as={Button} variant={testState} block eventKey="0">
									시험 생성
              	</Accordion.Toggle>
								<Accordion.Collapse eventKey="0">
									<Card.Body style={{ backgroundColor: "white" }}>
										<div>
											<FormControl
												blocktype="text"
												id="title"
												value={testTitle}
												placeholder="추가할 시험명을 입력하세요."
												fontSize="20"
												style={{ width: "17rem" }}
												onChange={testTitleChange}
											/>
											{(testState === "info") ?
												<Button
													variant="light"

													style={{ width: "17rem" }}
													onClick={(e) => makeTestHandler(true, e)}
												>
													문제 선택
												</Button> :
												<ButtonGroup>
													<Button
														variant="light"

														style={{ width: "8.5rem" }}
														onClick={(e) => makeTestHandler(true, e)}
													>
														선택 완료
													</Button>
													<Button
														variant="light"
														block
														style={{ width: "8.5rem" }}
														onClick={(e) => makeTestHandler(false, e)}
													>
														생성 취소
													</Button>
												</ButtonGroup>


											}
										</div>
									</Card.Body>
								</Accordion.Collapse>
							</Card>
						</Accordion>

							&nbsp;
							<Button variant="info" style={{ width: '19rem', height: '2.5rem' }} onClick={submitHandler}
							href={`/subject/${subject}/${course}/make/${1}`}
						>문제 생성</Button>

					</div>
				</div>
				<hr />
				<ul>
					<CardDeck>
						{question.question.map((i, index) =>
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
												variant={selected[question.curPage - 1][index].selected}
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