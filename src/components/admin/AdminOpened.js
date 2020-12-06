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

const AdminOpened = ({ isOpen }) => {
  const [question, setQuestion] = useState({
    question: [],
    curPage: 1,
    totalCount: 0,
  });
  
  const [selected, setSelected] = useState([]);
  const [pages, setPages] = useState([]);
  let history = useHistory();

  useEffect(() => {
    axios
      .get(`/api/question/`)
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
  }, []);

  const loadQuestionPerPage = (index, e) => {
    e.preventDefault();

    axios
      .get(`/api/question/`, {
        params: {
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

  return (
    <Container
      fluid
      className={classNames("content", { "is-open": { isOpen } })}
    >
    <div>
    <ul style={{ minHeight: "80rem" }}>
          <CardDeck>
					{question.question.length ? 
            question.question.map((i, index) => (
              <div className="container h-100" key={i.id}>
                <div className="row h-100 justify-content-center align-items-center">
                  <Card
                    className="text-center"
                    variant="info"
                    style={{ width: "50%" }}
                  >
                    <Link
                      key={i.id}
                      to={{
                        pathname: `/admin/blocked/${i.id}`,
                      }}
                    >
                      <Card.Header>
                        <div>
                          문제 #{i.id}
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <div style={{ fontWeight: "lighter" }}>{i.title}</div>
                      </Card.Body>
                    </Link>
                  </Card>
                </div>
                <br />
              </div>
            )): <div>
							<h5>공개된 문제가 없습니다.</h5>
							</div>}
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


export default AdminOpened;
