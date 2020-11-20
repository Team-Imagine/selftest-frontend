import React, { useState, useEffect } from "react";
import { Container, Accordion, Button, FormControl } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import classNames from "classnames";
import { Link, useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import store from "../store";
import Form from "react-bootstrap/Form";
import axios from "axios";

const Course = ({ subject, isOpen }) => {
  const [course, setCourse] = useState([]);
  const [state, setState] = useState(0);
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState([]);

  let history = useHistory();

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
      className={classNames("content", { "is-open": { isOpen } })}
    >
      <div className="d-flex bd-highlight mb-3">
        <div className="mr-auto p-2 bd-highlight">
          <h4 style={{ fontWeight: "bolder" }}>
            과목 {">"} {subject}
          </h4>
        </div>
        <div className="p-2 bd-highlight">
          <Accordion>
            <Card border="info" style={{ width: "19rem" }}>
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
                      style={{ width: "17rem" }}
                      onChange={onChange}
                    />
                    <Button
                      variant="light"
                      block
                      style={{ width: "17rem" }}
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
      <ul>
        {course.map((i) => (
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
        ))}
      </ul>
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
