import React, { useState, useEffect } from "react";
import { Container, Button, CardDeck, Dropdown } from "react-bootstrap";
import classNames from "classnames";
import { Link, useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";
import {
  faAppleAlt,
  faHeart,
  faStar,
  faThumbsDown,
  faThumbsUp,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

const Searchcontent = ({ searchtype, keywordtype, keyword, isOpen }) => {
  const [searchresults, setSearchresults] = useState([]);
  const [pages, setPages] = useState([]);
  const [sort, setSort] = useState("");
  const [selected, setSelected] = useState([]);
  const [question, setQuestion] = useState({
      question: [],
      curPage: 1,
      totalCount: 0,
    });

  let history = useHistory();


  var keywordType = "";
  keywordtype === "default" ? (keywordType = "") : (keywordType = keywordtype);

  const onSelectSortChange = (e)=>{
    setSort(e.target.value); 
  }

  console.log(sort);

  useEffect(() => {
    axios
      .get(
        `/api/question?question_type=${keywordType}&${searchtype}=${keyword}`
      )
      .then((res) => {
        console.log(
          `/api/question?question_type=${keywordType}&${searchtype}=${keyword}`
        );
        console.log(res.data);
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

      
       
  }, []);

  const SortPage = (sort, e) => {
    axios
      .get(
        `/api/question?question_type=${keywordType}&${searchtype}=${keyword}&sort=title:${sort}`
      )
      .then((res) => {
        console.log(
          `/api/question?question_type=${keywordType}&${searchtype}=${keyword}&sort=title:${sort}`
        );
        console.log(res.data);
        setSearchresults(res.data.questions.rows);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const loadSearchPerPage = (index, e) => {
    e.preventDefault();
    axios
      .get(
        `/api/question?page=${index}&question_type=${keywordType}&${searchtype}=${keyword}`,
      )
      .then((res) => {
        console.log(res.data);
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

  return (
    <Container
      fluid
      className={classNames("content", { "is-open": { isOpen } })}
    >
      <div>
        <div className="d-flex bd-highlight mb-3">
          <div className="mr-auto p-2 bd-highlight">
            <h3 style={{ fontWeight: "bolder" }}>
              문제 검색결과 - 검색한 단어: "{keyword}"
            </h3>
          </div>
          <div className="p-2 bd-highlight">
            {/* 
            <Form.Control
             as="select"
             onChange={onSelectSortChange.bind(this)}>
              <option value="default">정렬</option>
              <option value="asc">오름차순</option>
              <option value="desc">내림차순</option>
            </Form.Control>
            <Button variant="info" onClick={SortPage}>
              정렬
            </Button>
            */}
          </div>
        </div>
        <hr />
        <ul style={{ minHeight: "120rem" }}>
          <CardDeck>
            {question.question.map((i,index) => (
              <div className="container h-100" key={i.id}>
                <div className="row h-100 justify-content-center align-items-center">
                  <Card
                    className="text-center"
                    variant="info"
                    style={{ width: "30rem" }}
                  >
                    <Link
                      key={i.id}
                      to={{
                        pathname: `/subject/${i["course.subject.title"]}/${
                          i["course.title"]
                        }/${i.id}/problem_solving/${1}`,
                      }}
                    >
                      <Card.Header style={{ height: "3.5rem" }}>
                        <div className="d-flex bd-highlight mb-3">
                          <div className="mr-auto p-2 bd-highlight">
                            #{i.id} test - {i["course.title"]}
                          </div>
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <div style={{ fontWeight: "lighter" }}>{i.title}</div>
                      </Card.Body>
                      <Card.Footer>
                        <div
                          className="d-flex bd-highlight mb-3"
                          style={{ height: "0.8rem" }}
                        >
                          <div className="mr-auto p-2 bd-highlight">
                            좋아요 &nbsp;
                            <FontAwesomeIcon
                              icon={faThumbsUp}
                              className="ml-auto"
                            />
                            &nbsp;
                            {i["likeable_entity.total_likes"]}
                          </div>

                          <div className="mr-auto p-2 bd-highlight">
                            싫어요 &nbsp;
                            <FontAwesomeIcon
                              icon={faThumbsDown}
                              className="ml-auto"
                            />
                            &nbsp;
                            {i["likeable_entity.total_dislikes"]}
                          </div>

                          <div className="mr-auto p-2 bd-highlight">
                            신선해요 &nbsp;
                            <FontAwesomeIcon
                              icon={faAppleAlt}
                              className="ml-auto"
                            />
                            &nbsp;
                            {!i["average_freshness"]
                              ? "0.0000"
                              : i["average_freshness"]}
                          </div>

                          <div className="mr-auto p-2 bd-highlight">
                            난이도 &nbsp;
                            <FontAwesomeIcon
                              icon={faStar}
                              className="ml-auto"
                            />
                            &nbsp;
                            {!i["average_difficulty"]
                              ? "0.0000"
                              : i["average_difficulty"]}
                          </div>
                        </div>
                      </Card.Footer>
                    </Link>
                  </Card>
                </div>
                <br />
              </div>
            ))}
          </CardDeck>
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
              onClick={(e) => loadSearchPerPage(i, e)}
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
export default Searchcontent;
