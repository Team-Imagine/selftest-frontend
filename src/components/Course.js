import React, { useState, useEffect } from "react";
import { Container, Accordion, Button, FormControl, Navbar, Nav } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import classNames from "classnames";
import { Link, useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import store from "../store";
import Form from "react-bootstrap/Form";
import axios from "axios";
import './Responsive.css';
import SideBarSmall from './sidebar/SideBarSmall';

const Course = ({ subject, toggle, isOpen }) => {
  const [course, setCourse] = useState([]);
  const [state, setState] = useState(0);
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState([]);

  let history = useHistory();

  const moveSubject = () => {
    history.push("/subject");
  };

  useEffect(() => {
    const subject_title = subject;

    axios.get(`/api/course?subject_title=${subject_title}`).then((res) => {
      console.log(res.data.courses);

      setCourse(res.data.courses.rows);

      let count = res.data.courses.count / 10 + 1;

      let t_pages = [];

      for (var i = 1; i < count; i++) {
        t_pages.push(i);
      }
      setPages(t_pages);
    });
  }, [state]);

  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (store.getState().isLoggedIn) {
      const data = {
        title: title,
        subject_title: subject,
      };

      axios
        .post("/api/course", data)
        .then((res) => {
          setTitle("");
          setState(1);
          alert(res.data.message);
        })
        .catch((error) => {
          setTitle("");
          alert(error.response.data.message);
        });
    } else {
      setTitle("");
      alert("로그인이 필요한 기능입니다.");
      history.push("/login");
    }
  };

  const loadCoursePerPage = (index, e) => {
    e.preventDefault();

    axios
      .get(`/api/course/`, {
        params: {
          subject_title: subject,
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

  return (
    <Container
      fluid
      id="jb-container"
    >
      <SideBarSmall toggle={toggle} isOpen={!isOpen} />
      <div className="d-flex bd-highlight mb-3">
        <div className="mr-auto p-2 bd-highlight">
          <h3 style={{ fontWeight: "bolder" }}>
          <Form.Label onClick={moveSubject}>과목</Form.Label> {">"} {subject}
          </h3>
        </div>
        <div className="p-2 bd-highlight">
          <Accordion>
            <Card border="info" style={{ width: "19rem !important" }}>
              <Accordion.Toggle as={Button} variant="info" block eventKey="0">
                강의 추가
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body style={{ backgroundColor: "white" }}>
                  <div>
                    <FormControl
                      blocktype="text"
                      id="title"
                      className="mr-sm-2"
                      value={title}
                      placeholder="추가할 강의명을 입력하세요."
                      fontSize="20"
                      style={{ width: "17rem !important" }}
                      onChange={onChange}
                    />
                    <Button
                      variant="light"
                      block
                      style={{ width: "17rem !important" }}
                      onClick={submitHandler}
                    >
                      강의 등록
                    </Button>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>
      <hr />
      <div style={{ height: "auto", minHeight: "48em", maxHeight: "48em" }}>
        <ul>
          {course.length ? (
          course.map((i) => (
            <div className="container h-100" key={i.title}>
              <div className="row h-100 justify-content-center align-items-center">
                <Alert
                  className="text-center"
                  variant="info"
                  style={{ width: "25rem" }}
                >
                  <Link
                    key={i.title}
                    to={{
                      pathname: `/subject/${subject}/${i.title}`,
                    }}
                  >
                    <div style={{ fontSize: 18 }}>{i.title}</div>
                  </Link>
                </Alert>
                <br />
              </div>
            </div>
          ))
          ) : (
            <div>
            <h5>등록된 강의가 없습니다. 새로운 강의을 등록해주세요.</h5>
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

export default Course;
