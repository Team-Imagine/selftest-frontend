import React, { useState, useEffect } from "react";
import { Container, Button, CardDeck } from "react-bootstrap";
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
import queryString from "query-string";

const Searchcontent = ({ searchtype, keywordtype, keyword, isOpen }) => {
  const [searchresults, setSearchresults] = useState([]);
  const [pages, setPages] = useState([]);

  var keywordType = "";
  keywordtype === "default" ? (keywordType = "") : (keywordType = keywordtype);

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
        setSearchresults(res.data.questions.rows);
        
        let count = res.data.questions.count / 10 + 1;
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

  const loadSearchPerPage = (index, e) => {
    e.preventDefault();

    axios
      .get(`/api/question?question_type=${keywordType}&${searchtype}=${keyword}`, {
        params: {
          page: index,
        },
      })
      .then((res) => {
        console.log(
          `/api/question?question_type=${keywordType}&${searchtype}=${keyword}`);
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
            <h4 style={{ fontWeight: "bolder" }}>문제 검색결과 - {keyword}</h4>
          </div>
        </div>
        <hr />
        <ul>
          <CardDeck>
            {searchresults.map((i) => (
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

      <ul 
      className="row justify-content-center align-items-center">
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
            </button>&nbsp;
          </div>
        ))}
      </ul>
    </Container>
  );
};
export default Searchcontent;
