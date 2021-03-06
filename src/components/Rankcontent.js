import React, { useState, useEffect } from "react";
import { Container, Button, CardDeck } from "react-bootstrap";
import classNames from "classnames";
import Card from "react-bootstrap/Card";
import axios from "axios";
import './Responsive.css';
import SideBarSmall from './sidebar/SideBarSmall';

const Rankcontent = ({ isOpen, toggle }) => {
  const [pages, setPages] = useState([]);
  const [ranks, setRanks] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/rank`)
      .then((res) => {
        console.log(res.data);
        setRanks(res.data.ranks.rows);

        let count = res.data.ranks.count / 50 + 1;
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

  const loadRanksPerPage = (index, e) => {
    e.preventDefault();

    axios
      .get(`/api/rank`, {
        params: {
          page: index,
        },
      })
      .then((res) => {
        console.log(res.data);
        setRanks(res.data.ranks.rows);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <Container style={{height:"100p"}}
      fluid
      id='jb-container'
    >
      <SideBarSmall toggle={toggle} isOpen={!isOpen} />
      <div>
        <div className="d-flex bd-highlight mb-3">
          <div className="mr-auto p-2 bd-highlight">
            <h3 style={{ fontWeight: "bolder" }}>회원 순위</h3>
          </div>
        </div>
        <hr />
        <div className="row h-100 justify-content-center align-items-center">
          <Card style={{ width: "60%" }}>
            <div>
              <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center">
                  <Card
                    Header
                    style={{
                      background: "lightblue",
                      width: "100%",
                      fontWeight: "bolder",
                    }}
                  >
                    <Card.Header
                      variant="info"
                      style={{ paddingBottom: "1px" }}
                    >
                      <div className="d-flex bd-highlight mb-3">
                        <div
                          className="mr-auto p-2 bd-highlight"
                          style={{ width: "10%" }}
                        >
                          순위
                        </div>
                        <div
                          className="mr-auto p-2 bd-highlight"
                          style={{ width: "20%" }}
                        >
                          사용자명
                        </div>
                        <div
                          className="mr-auto p-2 bd-highlight"
                          style={{ width: "20%" }}
                        >
                          포인트
                        </div>
                        <div
                          className="mr-auto p-2 bd-highlight wrapper"
                          style={{ width: "20%" }}
                        >
                          푼 문제 수
                        </div>
                        <div
                          className="mr-auto p-2 bd-highlight"
                          style={{ width: "20%" }}
                        >
                          올린 문제 수
                        </div>
                      </div>
                    </Card.Header>
                  </Card>
                </div>
              </div>

              {ranks.map((i, index) => (
                <div className="container h-100">
                  <div className="row h-100 justify-content-center align-items-center">
                    <Card style={{ width: "100%", height: "4rem" }}>
                      <Card.Body
                        style={{ paddingTop: "4px", paddingBottom: "4px" }}
                      >
                        <div className="d-flex bd-highlight mb-3">
                          <div
                            className="mr-auto p-2 bd-highlight"
                            style={{ width: "10%" }}
                          >
                            <div key={index + 1}>{index + 1}</div>
                          </div>
                          <div
                            className="mr-auto p-2 bd-highlight"
                            style={{ width: "20%" }}
                          >
                            {i.username}
                          </div>
                          <div
                            className="mr-auto p-2 bd-highlight"
                            style={{ width: "20%" }}
                          >
                            {i.point}
                          </div>
                          <div
                            className="mr-auto p-2 bd-highlight"
                            style={{ width: "20%" }}
                          >
                            {i.num_solved_questions}
                          </div>
                          <div
                            className="mr-auto p-2 bd-highlight wrapper"
                            style={{ width: "20%" }}
                          >
                            {i.num_uploaded_questions}
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <br />

      <ul className="row justify-content-center align-items-center">
        {pages.map((i, index) => (
          <div key={index}>
            <button
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid",
                width: "1.5rem",
              }}
              onClick={(e) => loadRanksPerPage(i, e)}
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

export default Rankcontent;
