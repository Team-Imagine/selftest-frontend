import React, { useState, useEffect } from "react";
import {
	Container,
	Button,
	CardDeck,
	Accordion,
	FormControl,
	ButtonGroup,
	DropdownButton,
	Dropdown,
	Form,
} from "react-bootstrap";
import classNames from "classnames";
import { Link, useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";

const AdminCourse = ({ isOpen }) => {
	const [course, setCourse] = useState([]);
	const [pages, setPages] = useState([]);

	let history = useHistory();

	useEffect(() => {
		axios.get("/api/course/").then((res) => {
			console.log(res.data);
			setCourse(res.data.courses.rows);

			let count = res.data.courses.count / 10 + 1;
			let t_pages = [];

			for (var i = 1; i < count; i++) {
				t_pages.push(i);
			}
			setPages(t_pages);
		});

	}, []);

	const [selected, setSelected] = useState([]);

	const loadCoursePerPage = (index, e) => {
		e.preventDefault();
		axios
			.get(`/api/course/`, {
				params: {
					page: index,
				},
			})
			.then((res) => {
				console.log(res.data);
				setCourse(res.data.courses.rows);

			})
			.catch((error) => {
				alert(error.response.data.message);
			});
	};

	const deleteHandler = (index, e) => {
		e.preventDefault();

		var result = window.confirm("해당 강의를 삭제 하시겠습니까?");

		if (result) {
			axios
				.delete(`/api/course/${course[index].title}`)
				.then((res) => {
					alert(res.data.message);
					axios
						.get(`/api/course/`)
						.then((res) => {
							setCourse(res.data.course.rows);
						})
						.catch((error) => {
							alert(error.response.data.message);
						});
				})
				.catch((error) => {
					alert(error.response.data.message);
				});
		}

	};

	return (
		<Container
			fluid
			id="jb-container"
			style={{ overflow: 'scroll' }}
		>
			<div className="d-flex bd-highlight mb-3">

				<div className="mr-auto p-2 bd-highlight">
					<h3 style={{ fontWeight: "bolder", fontSize: '1.5rem' }}>강의</h3>
				</div>
			</div>
			<hr />
			<div
				className="강의 카드"
				style={{ height: "auto", minHeight: "48em", maxHeight: "48em" }}
			>
				<ul>
					{course.length ? (
						course.map((i, index) => (
							<div className="container h-100" key={i.title}>
								<div className="row h-100 justify-content-center align-items-center">
									<Card
										className="text-center"
										variant="info"
										style={{ width: "50%" }}
									>
										<Card.Body>
											<div style={{ fontWeight: "lighter" }}>{i.title}</div>
										</Card.Body>
									</Card>
									&nbsp;&nbsp;
									<Button
										variant="danger"
										onClick={(e) => deleteHandler(index, e)}
									>
										삭제
									</Button>
								</div>

							</div>
						))
					) : (
							<div>
								<h5>등록된 강의가 없습니다.</h5>
							</div>
						)}
				</ul>
			</div>

			<ul className="row justify-content-center align-items-center">
				{pages.map((i, index) => (
					<div key={index}>
						<button
							style={{
								backgroundColor: "#ffffff",
								border: "1px solid",
								width: "1.5rem",
							}}
							onClick={(e) => loadCoursePerPage(i, e)}
						>
							{i}
						</button>
            &nbsp;
					</div>
				))}
			</ul>
		</Container>
	);
};


export default AdminCourse;
