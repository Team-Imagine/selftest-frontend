import React, { useState, useEffect } from "react";
import { Container, Button, CardDeck, Accordion, FormControl, ButtonGroup, DropdownButton, InputGroup, Dropdown, Form, Card } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import classNames from "classnames";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import styled from 'styled-components';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { faAppleAlt, faHeart, faStar, faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TestAutoMaking from './TestAutoMaking';



import axios from "axios";

const TestMaking = ({ isOpen }) => {

  const [listType, setListType] = useState('select');
  const [testNumber, setTestNumber] = useState(10);
  const [autoForm, setAutoForm] = useState(false);

  const [subject, setSubject] = useState([]);
  const [course, setCourse] = useState([]);
  const [state, setState] = useState('');

  const [question, setQuestion] = useState({
    question: [],
    curPage: 1,
    totalCount: 0,
  }
  );
  const [pages, setPages] = useState([]);
  const [selected, setSelected] = useState([]);

  const [testTitle, setTestTitle] = useState('');

  const [testState, setTestState] = useState("info");
  const [addTest, setAddTest] = useState([]);

  const [testList, setTestList] = useState([]);
  const [selectedTest, setSelectedTest] = useState('Test+');

  const listTypeSelect = (e) => {
    setListType(e.target.value);
  }

  const testNumberSelect = (e) => {
    setTestNumber(e.target.value);
  }

  const loadQuestionPerPage = (index, e) => {
    e.preventDefault();

    axios.get(`/api/question/`, {
      params: {
        course_title: course,
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
      } else {
        if (testTitle !== '') {
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

                axios.post(`/api/testset/question/`, data)
                  .then(res => {
                    console.log(res.data);
                    setTestState('info');
                    alert(res.data.message);
                  })
              })
          }
        } else {
          alert('시험 이름을 입력하세요.');
        }
      }
    } else {
      setState('');
      setTestState('info');
    }
  }


  const submitForm = () => {
    if (listType === "select") {
      axios.get(`/api/question?course_title=${course}`)
        .then(res => {
          console.log(res.data);

          setQuestion({ question: res.data.questions.rows, curPage: 1, totalCount: res.data.questions.count });
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

          setSelected(t_row);

          let t_pages = [];

          for (var i = 1; i < count; i++) {
            t_pages.push(i);
          }
          setPages(t_pages);
          setTestState("danger");
          setState('select');
        })
        .catch(error => {
          alert(error.response.data.message);
        })
    } else if (listType === "auto") {
      if (testTitle !== '') {
        axios.get(`/api/question/course/${course}/random?num_questions=${testNumber}&per_page=${testNumber}`)
          .then(res => {
            console.log(res.data);
            let questionList = [];
            for (var i = 0; i < res.data.questions.rows.length; i++) {
              questionList.push({ id: res.data.questions.rows[i].id });
            }
            let title = testTitle;
            if (title !== '') {
              axios.post(`/api/testset/`, { title })
                .then(res => {
                  console.log(res.data);

                  let data = {
                    test_set_id: res.data.test_set.id,
                    questions: questionList,
                  }

                  axios.post(`/api/testset/question/`, data)
                    .then(res => {
                      console.log(res.data);
                      setTestState('info');
                      alert(res.data.message);
                    })
                })
            }
          })
          .catch(error => {
            alert('일치하는 강의가 없습니다.');
          })
      } else {
        alert('시험 이름을 입력하세요.');
      }
    }
  }

  const testTitleChange = (e) => {
    e.preventDefault();

    setTestTitle(e.target.value);
  }

  return (
    <Container
      fluid
      className={classNames("content", { "is-open": isOpen })}
    >
      <div className="d-flex bd-highlight mb-3">
        <div className="mr-auto p-2 bd-highlight">
          <h4 style={{ fontWeight: "bolder" }}>
            시험 문제 생성
              </h4>
          <Form inline>
            <Form.Control
              type="course"
              placeholder="강의 명을 입력하세요"
              value={course}
              onChange={(e) => { setCourse(e.target.value) }} />
            &nbsp;

            <Form.Group>
              <Form.Control as="select" onChange={listTypeSelect}>
                <option value="select">문제 선택</option>
                <option value="auto">자동 생성</option>
              </Form.Control>


              {(listType === "auto") && <div>
                <Form.Control as="select" onChange={testNumberSelect}>
                  <option value="default">문항수</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </Form.Control>
                <Form.Control
                  type="course"
                  placeholder="시험 이름을 입력하세요"
                  value={testTitle}
                  onChange={(e) => { setTestTitle(e.target.value) }} />
                &nbsp;</div>
              }
            </Form.Group>
          </Form>
        </div>
        <div className="p-2 bd-highlight">
          <div>{(state === '') ?
            <Button variant="info" style={{ width: '19rem', height: '2.5rem' }} onClick={submitForm}
            >시험 생성</Button> : <div>

              <FormControl
                blocktype="text"
                id="title"
                value={testTitle}
                placeholder="추가할 시험명을 입력하세요."
                fontSize="20"
                style={{ width: "17rem" }}
                onChange={testTitleChange}
              />
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
            </div>}
          </div>
        </div>
      </div>
      <hr />
      <ul>
        {(state === 'select') && <div >
          <CardDeck style={{ width: '70%', textAlign: 'center', left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto', }}>
            {question.question.map((i, index) =>
              <div className="container h-100" key={i.id}>
                <div className="row h-100 justify-content-center align-items-center">

                  <Card className="text-center" variant="info" style={{ width: '30rem' }}>
                    <Card.Body><div style={{ fontWeight: "lighter" }}>{i.title}
                    </div>
                    </Card.Body>
                    <Card.Footer>
                      <div className="d-flex bd-highlight mb-3" style={{ height: "0.8rem" }}>
                        <div className="mr-auto p-2 bd-highlight">
                          좋아요 &nbsp;
            <FontAwesomeIcon icon={faThumbsUp} className="mr-2" />&nbsp;
            {i["likeable_entity.total_likes"]}

                        </div>

                        <div className="mr-auto p-2 bd-highlight">
                          싫어요 &nbsp;
            <FontAwesomeIcon icon={faThumbsDown} className="ml-auto" />&nbsp;
            {i["likeable_entity.total_dislikes"]}
                        </div>
                        <div className="mr-auto p-2 bd-highlight">
                            <FontAwesomeIcon icon={faAppleAlt} className="ml-auto"/>&nbsp;
                          {Number(i.average_freshness).toFixed(2)}                    
                        </div>
                        <div className="mr-auto p-2 bd-highlight">
                          난이도  &nbsp;
            <FontAwesomeIcon icon={faStar} className="ml-auto" />&nbsp;
            {Number(i.average_difficulty).toFixed(2)}
                        </div>
                      </div>
                    </Card.Footer>
                  </Card>
                  {(testState === "danger" || selectedTest !== "Test+") &&
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
          <ul className="row justify-content-center align-items-center"
          style={{width: '70%', textAlign: 'center', left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto',}}>
            {pages.map((i, index) =>
              <div key={index}>
                <button style={{ backgroundColor: '#ffffff', border: '1px solid', width: '1.5rem' }} onClick={(e) => loadQuestionPerPage(i, e)}>{i}</button>&nbsp;
          </div>)
            }
          </ul>
        </div>
        }
      </ul>
    </Container>
  );
}

export default TestMaking;