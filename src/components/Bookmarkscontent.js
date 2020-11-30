import React, { useState, useEffect } from "react";
import { Container, Button, CardDeck } from "react-bootstrap";
import classNames from "classnames";
import { Link, useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";
import store from "../store";
import {
  faAppleAlt,
  faHeart,
  faStar,
  faThumbsDown,
  faThumbsUp,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Bookmarkscontent = ({ isOpen }) => {
  const [pages, setPages] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/bookmark`)
      .then((res) => {
        console.log(res.data);
        setBookmarks(res.data.bookmarks.rows);

        let count = res.data.bookmarks.count / 10 + 1;
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

  const loadBookmarksPerPage = (index, e) => {
    e.preventDefault();

    axios
      .get(`/api/bookmark`, {
        params: {
          page: index,
        },
      })
      .then((res) => {
        console.log(res.data);
        setBookmarks(res.data.bookmarks.rows);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const DeleteBookmarks = (id) => (e) => {
    e.preventDefault();

    console.log("id:", id);
    axios
      .delete(`/api/bookmark/${id}`)
      .then((res) => {
        console.log(res.data.message);
        alert("문제가 즐겨찾기에서 삭제되었습니다");

        axios
          .get(`/api/bookmark`)
          .then((res) => {
            console.log(res.data);

            setBookmarks(res.data.bookmarks.rows);
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
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
            <h3 style={{ fontWeight: "bolder" }}>즐겨찾기</h3>
          </div>
        </div>
        <hr />
        <ul style={{minHeight:"120rem"}}>
          <CardDeck>
            {bookmarks.map((i) => (
              <div className="container h-100" key={i["question.id"]}>
                <div className="row h-100 justify-content-center align-items-center">
                  <Card
                    className="text-center"
                    variant="info"
                    style={{ width: "30rem" }}
                  >
                    <Link
                      key={i["question.id"]}
                      to={{
                        pathname: `/subject/${
                          i["question.course.subject.title"]
                        }/${i["question.course.title"]}/${
                          i["question.id"]
                        }/problem_solving/${1}`,
                      }}
                    >
                      <Card.Header style={{ height: "3.5rem" }}>
                        <div className="d-flex bd-highlight mb-3">
                          <div className="mr-auto p-2 bd-highlight">
                            #{i["question.id"]}{" "}
                            {i["question.course.subject.title"]} -{" "}
                            {i["question.course.title"]}
                          </div>
                          <div>
                            <Button
                              variant="info"
                              style={{ width: "2.4rem", height: "2rem" }}
                              onClick={DeleteBookmarks(i["question.id"])}
                            >
                              <FontAwesomeIcon
                                icon={faTrashAlt}
                                className="ml-auto"
                              />
                            </Button>
                          </div>
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <div style={{ fontWeight: "lighter" }}>
                          {i["question.title"]}
                        </div>
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
                            {i["question.likeable_entity.total_likes"]}
                          </div>

                          <div className="mr-auto p-2 bd-highlight">
                            싫어요 &nbsp;
                            <FontAwesomeIcon
                              icon={faThumbsDown}
                              className="ml-auto"
                            />
                            &nbsp;
                            {i["question.likeable_entity.total_dislikes"]}
                          </div>

                          <div className="mr-auto p-2 bd-highlight">
                            신선해요 &nbsp;
                            <FontAwesomeIcon
                              icon={faAppleAlt}
                              className="ml-auto"
                            />
                            &nbsp;
                            {!i["question.average_freshness"]
                              ? "0.0000"
                              : i["question.average_freshness"]}
                          </div>

                          <div className="mr-auto p-2 bd-highlight">
                            난이도 &nbsp;
                            <FontAwesomeIcon
                              icon={faStar}
                              className="ml-auto"
                            />
                            &nbsp;
                            {i["question.average_difficulty"]}
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
              onClick={(e) => loadBookmarksPerPage(i, e)}
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

export default Bookmarkscontent;
