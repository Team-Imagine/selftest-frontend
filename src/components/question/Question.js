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
import store from "../../store";
import {
  faAppleAlt,
  faStar,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Question.css';
import SideBarSmall from '../sidebar/SideBarSmall';

const Question = ({ subject, course, isOpen, toggle }) => {
  const [question, setQuestion] = useState({
    question: [],
    curPage: 1,
    totalCount: 0,
  });
  const [pages, setPages] = useState([]);

  const [testTitle, setTestTitle] = useState("");
  const [testState, setTestState] = useState("info");
  const [selected, setSelected] = useState([]);
  const [addTest, setAddTest] = useState([]);

  const [testList, setTestList] = useState([]);
  const [selectedTest, setSelectedTest] = useState("Test+");

  let history = useHistory();

  const moveSubject = () => {
		history.push("/subject");
	  };
	 
	const moveCourse = () => {
		history.push(`/subject/${subject}`);
	};

  useEffect(() => {
    // 강의 목록에 맞는 문제 목록을 가져옴
    axios
      .get(`/api/question?course_title=${course}`)
      .then((res) => {
        console.log(res.data);

        //setQuestion(res.data.questions.rows);
        setQuestion({
          question: res.data.questions.rows,
          curPage: 1,
          totalCount: res.data.questions.count,
        });
        let count = res.data.questions.count / 10 + 1;
        let t_row = [];
        let t_col = [];

        for (var i = 1; i <= count; i++) {
          t_col = [];
          for (var j = 0; j < 10; j++) {
            if ((i - 1) * 10 + j < res.data.questions.count) {
              t_col.push({
                selected: "info",
                question_id: res.data.questions.rows[j].id,
              });
            }
          }
          t_row.push(t_col);
        }

        setSelected(t_row);

        let t_pages = [];

        for (var i = 1; i < count; i++) {
          t_pages.push(i);
        }
        setPages(t_pages);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });

    // 유저의 테스트 목록을 가져옴
    axios
      .get(`/api/testset/`, {
        params: {
          page: 1,
        },
      })
      .then((res) => {
        console.log(res.data.test_sets.rows);
        setTestList(res.data.test_sets.rows);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    if (store.getState().isLoggedIn) {
      history.push(`/subject/${subject}/${course}/make/${1}`);
    } else {
      alert("로그인이 필요한 기능입니다.");
      history.push("/login");
    }
  };

  const loadQuestionPerPage = (index, e) => {
    e.preventDefault();

    axios
      .get(`/api/question/`, {
        params: {
          course_title: course,
          subject_title: subject,
          page: index,
        },
      })
      .then((res) => {
        let tSelected = selected;
        for (var col = 0; col < res.data.questions.rows.length; col++) {
          tSelected[index - 1][col].question_id =
            res.data.questions.rows[col].id;
        }

        //setQuestion(res.data.questions.rows);
        setQuestion({ question: res.data.questions.rows, curPage: index });

        //setCurPage(index);
        setSelected([...tSelected]);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const selectHandler = (index, e) => {
    e.preventDefault();

    let t_selected = selected;
    if (t_selected[question.curPage - 1][index].selected === "info") {
      t_selected[question.curPage - 1][index].selected = "danger";
    } else {
      t_selected[question.curPage - 1][index].selected = "info";
    }

    setSelected([...t_selected]);
  };

  const makeTestHandler = (value, e) => {
    e.preventDefault();

    if (value) {
      if (testState === "info") {
        setTestState("danger");
      } else {
        var result = window.confirm("시험을 생성하시겠습니까?");
        if (result) {
          let t_addTest = [];
          for (var row = 0; row < selected.length; row++) {
            for (var col = 0; col < selected[row].length; col++) {
              if (selected[row][col].selected === "danger") {
                console.log(row, col, selected[row][col].question_id);
                t_addTest.push({ id: selected[row][col].question_id });
              }
            }
          }
          console.log(t_addTest);
          setAddTest(t_addTest);
          let title = testTitle;

          axios.post(`/api/testset/`, { title }).then((res) => {
            console.log(res.data);

            let data = {
              test_set_id: res.data.test_set.id,
              questions: t_addTest,
            };

            axios.post(`/api/testset/question/`, data).then((res) => {
              console.log(res.data);
              setTestState("info");
              alert(res.data.message);
            });
          });
        }
      }
    } else {
      setTestState("info");
    }
  };

  const testTitleChange = (e) => {
    e.preventDefault();

    setTestTitle(e.target.value);
  };

  const loadTestHandler = (e) => {
    e.preventDefault();
  };

  const handleSelect = (e) => {
    setSelectedTest(e);
  };

  const refreshSelect = () => {
    for (var row = 0; row < selected.length; row++) {
      for (var col = 0; col < selected[row].length; col++) {
        selected[row][col].selected = "info";
      }
    }
  };

  const selectedTestHandler = (value, e) => {
    e.preventDefault();

    if (value) {
      if (selectedTest !== "Test+") {
        let t_modifyTest = [];
        for (var row = 0; row < selected.length; row++) {
          for (var col = 0; col < selected[row].length; col++) {
            if (selected[row][col].selected === "danger") {
              t_modifyTest.push({ id: selected[row][col].question_id });
            }
          }
        }
        console.log(t_modifyTest);
        let selectedTest_id;
        for (var i = 0; i < testList.length; i++) {
          if (testList[i].title === selectedTest) {
            selectedTest_id = testList[i].id;
          }
        }

        let data = {
          test_set_id: selectedTest_id,
          questions: t_modifyTest,
        };

        axios
          .post(`/api/testset/question/`, data)
          .then((res) => {
            alert(res.data.message);
            setSelectedTest("Test+");
            refreshSelect();
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    } else {
      setSelectedTest("Test+");
      refreshSelect();
    }
  };

  return (
    <Container
      fluid
      id="jb-container"
    >
      <SideBarSmall toggle={toggle} isOpen={!isOpen} />
      <div>
        <div className="d-flex bd-highlight mb-3">
          <div className="mr-auto p-2 bd-highlight">
            {isOpen &&
            <h3 style={{ fontWeight: "bolder" }}>
            <Form.Label onClick={moveSubject}>과목</Form.Label> {'>'} <Form.Label onClick={moveCourse}>{subject}</Form.Label> {'>'} {course}
            </h3>}
          </div>
          <div className="d-flex p-2 bd-highlight">
            <Accordion>
              <Card border="info" style={{ width: "19rem !important" }}>
                <Accordion.Toggle
                  as={Button}
                  variant={testState}
                  block
                  eventKey="0"
                  margin="0"
                >
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
                        style={{ width: "19rem !important" }}
                        onChange={testTitleChange}
                      />
                      {testState === "info" ? (
                        <Button
                          variant="light"
                          style={{ width: "19rem !important" }}
                          onClick={(e) => makeTestHandler(true, e)}
                        >
                          문제 선택
                        </Button>
                      ) : (
                          <ButtonGroup>
                            <Button
                              variant="light"
                              style={{ width: "8.5rem !important" }}
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
                        )}
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            &nbsp;
            <div>
              <DropdownButton
                variant="info"
                title={selectedTest}
                //id="input-group-dropdown-1"
                onSelect={handleSelect}
              >
                {testList.map((i, index) => (
                  <div key={i.id}>
                    <Dropdown.Item eventKey={i.title}>{i.title}</Dropdown.Item>
                  </div>
                ))}
              </DropdownButton>
              {selectedTest !== "Test+" && (
                <div>
                  &nbsp;
                  <Button
                    variant="light"
                    style={{ width: "6rem", height: "2.5rem" }}
                    onClick={(e) => selectedTestHandler(true, e)}
                  >
                    선택 완료
                  </Button>
                  &nbsp;
                  <Button
                    variant="light"
                    style={{ width: "6rem", height: "2.5rem" }}
                    onClick={(e) => selectedTestHandler(false, e)}
                  >
                    취소
                  </Button>
                </div>
              )}
            </div>
            &nbsp;
            <Button
              variant="info"
              style={{ width: "9.5rem", height: "2.5rem" }}
              onClick={submitHandler}
              href={`/subject/${subject}/${course}/make/${1}`}
            >
              문제 생성
            </Button>
          </div>
        </div>
        <hr />
        <ul style={{ minHeight: "120rem" }}>
          <CardDeck>
            {question.question.length ?
            question.question.map((i, index) => (
              <div className="container h-100" key={i.id}>
                <div className="row h-100 justify-content-center align-items-center">
                  <Card
                    className="text-center"
                    variant="info"
                    style={{ width: "30rem !important" }}
                  >
                    <Link
                      key={i.id}
                      to={{
                        pathname: `/subject/${subject}/${course}/${i.id
                          }/problem_solving/${1}`,
                      }}
                    >
                      <Card.Header>
                        <div>
                          문제 #{i.id} {subject} - {course}
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <div style={{ fontWeight: "lighter" }}>{i.title}</div>
                      </Card.Body>
                      <Card.Footer>
                        <div
                          className="d-flex bd-highlight mb-3"
                          style={{ height: "0.1em",paddingBottom:"1rem"}}
                        >
                          <div className="mr-auto p-2 bd-highlight">
                            
                            <Button
                              style={{
                                padding: "9px",
                                paddingRight: "2px",
                                paddingTop: "2px",
                                paddingBottom: "2px",
                              }}
                              disabled
                            >
                              <FontAwesomeIcon icon={faThumbsUp} className="mr-2" />
                            </Button>
                            &nbsp;
                            {i["likeable_entity.total_likes"]}
                          </div>

                          <div className="mr-auto p-2 bd-highlight">
                            
                            <Button
                              style={{
                                paddingLeft: "9px",
                                paddingRight: "2px",
                                paddingTop: "4px",
                                paddingBottom: "0px",
                              }}
                              disabled
                            >
                              <FontAwesomeIcon icon={faThumbsDown} className="mr-2" />
                            </Button>
                            &nbsp;
                            {i["likeable_entity.total_dislikes"]}
                          </div>

                          <div className="mr-auto p-2 bd-highlight">
                            
                            <Button
                              variant="danger"
                              style={{
                                padding: "9px",
                                paddingRight: "2px",
                                paddingTop: "3px",
                                paddingBottom: "1px",
                              }}
                              disabled
                            >
                              <FontAwesomeIcon icon={faAppleAlt} className="mr-2" />
                            </Button>
                            &nbsp;
                            {Number(i.average_freshness).toFixed(2)}
                          </div>

                          <div className="mr-auto p-2 bd-highlight">
                            
                            <Button
                              variant="warning"
                              style={{
                                padding: "7px",
                                paddingRight: "0px",
                                paddingTop: "3px",
                                paddingBottom: "1px",
                              }}
                              disabled
                            >
                              <FontAwesomeIcon
                                icon={faStar}
                                style={{ color: "white" }}
                                className="mr-2"
                              />
                            </Button>
                            &nbsp;
                            {Number(i.average_difficulty).toFixed(2)}
                          </div>
                        </div>
                      </Card.Footer>
                    </Link>
                  </Card>
                  {(testState === "danger" || selectedTest !== "Test+") && (
                    <div>
                      <Button
                        variant={selected[question.curPage - 1][index].selected}
                        onClick={(e) => selectHandler(index, e)}
                      >
                        추가
                      </Button>
                    </div>
                  )}
                </div>
                <br />
              </div>
            )
            ): (
            <div>
            <h5>등록된 문제가 없습니다. 새로운 문제를 등록해주세요.</h5>
            </div>
          )}
          </CardDeck>
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
                onClick={(e) => loadQuestionPerPage(i, e)}
              >
                {i}
              </button>
              &nbsp;
            </div>
          ))}
        </ul>
      </div>
    </Container>
  );
};


export default Question;
