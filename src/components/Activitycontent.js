import React, { Component, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import Table from "react-bootstrap/Table";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faHandPaper, faHome, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import Badge from "react-bootstrap/Badge";

const Activitycontent = (isOpen) => {
  const [user, setUser] = useState([]);
  const [username, setUsername] = useState("");
  const [point_logs, setPointLogs] = useState([]);
  const [penalty_logs, setPenaltyLogs] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [pages, setPages] = useState([]);
  let history = useHistory();

  const moveHome = () => {
    history.push("/home");
  };

  useEffect(() => {
    //사용자 정보 불러오기
    axios
      .get(`/api/user`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data.user.rows);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });

    //포인트내역 불러오기
    axios
      .get(`/api/user/suna/point-logs`)

      .then((res) => {
        console.log(res.data);
        setPointLogs(res.data.point_logs.rows);

        let count = res.data.point_logs.count / 10 + 1;
        let t_pages = [];

        for (var i = 1; i < count; i++) {
          t_pages.push(i);
        }
        setPages(t_pages);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });

    //제재내역 불러오기
    axios
      .get(`/api/user/suna/penalty-logs`)

      .then((res) => {
        console.log(res.data);
        setPenaltyLogs(res.data.penalty_logs.rows);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });

    //출석내역 불러오기
    axios
      .get(`/api/attendance`)

      .then((res) => {
        console.log(res.data);
        setAttendances(res.data.attendances.rows);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, []);

  //포인트 페이지별로 가져오기
  const loadPointPerPage = (index, e) => {
    e.preventDefault();

    axios
      .get(`/api/user/suna/point-logs`, {
        params: {
          page: index,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPointLogs(res.data.point_logs.rows);
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
          <div className="mr-auto p-2 bd-highlight"></div>
          <div className="p-2 bd-highlight">
            <Button variant="info " onClick={moveHome}>
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              홈으로 돌아가기
            </Button>
          </div>
        </div>

        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="d-flex flex-nowrap bd-highlight">
              <div className="p-2 bd-highlight col-example">
                <h2 style={{ fontWeight: "bolder" }}>
                  포인트&nbsp;
                  <Badge
                    pill
                    style={{ height: "2.3rem", paddingTop: "0.4rem", paddingRight :"0.4rem" }}
                    variant="danger"
                  >
                    <FontAwesomeIcon icon={faCoins} className="mr-2" />
                  </Badge>
                </h2>

                <Card border="info" style={{ width: "50em", height: "50em" }}>
                  <div className="column justify-content-center align-items-center">
                    <div style={{ width: "auto" }}>
                      <Table style={{ height: "auto" }} responsive>
                        <thead style={{background:"pink"}}>
                          <tr>
                            <th>No</th>
                            <th>날짜</th>
                            <th>내용</th>
                            <th>P</th>
                          </tr>
                        </thead>
                        {point_logs.map((i, index) => (
                          <tbody>
                            <tr>
                              <td style={{ width: "10%" }} key={index + 1}>
                                {index + 1}{" "}
                              </td>
                              <td style={{ width: "20%" }}>{i.created_at}</td>
                              <td style={{ width: "50%" }}>{i.content}</td>
                              <td style={{ width: "20%" }}>{i.amount}</td>
                            </tr>
                          </tbody>
                        ))}
                      </Table>
                    </div>
                  </div>
               
                  <ul style = {{position:"inherit"}}className="row justify-content-center align-items-center">
                    {pages.map((i, index) => (
                      <div key={index}>
                        <button
                          style={{
                            backgroundColor: "#ffffff",
                            border: "1px solid",
                            width: "1.5rem",
                          }}
                          onClick={(e) => loadPointPerPage(i, e)}
                        >
                          {i}
                        </button>
                        &nbsp;
                      </div>
                    ))}
                  </ul>
                  
                </Card>
              </div>
              <div className="p-2 bd-highlight col-example">
                <h2 style={{ fontWeight: "bolder" }}>제재&nbsp;
                <Badge
                    pill
                    style={{ height: "2.3rem", paddingTop: "0.4rem", paddingRight :"0.6rem" }}
                    variant="warning"
                    
                  >
                    <FontAwesomeIcon icon={faHandPaper} className="mr-2" />
                  </Badge>
                
                </h2>
                <Card border="info" style={{ width: "40em", height: "50em" }}>
                  <div className=" justify-content-center align-items-center">
                    <div style={{ width: "auto" }}>
                      <Table style={{ height: "auto" }} responsive>
                        <thead style={{background:"lightyellow"}}>
                          <tr>
                            <th>No</th>
                            <th>날짜</th>
                            <th>내용</th>
                            <th>제재종료일</th>
                          </tr>
                        </thead>
                        {penalty_logs.map((i, index) => (
                          <tbody>
                            <tr>
                              <td style={{ width: "10%" }} key={index + 1}>
                                {index + 1}{" "}
                              </td>
                              <td style={{ width: "20%" }}>{i.created_at}</td>
                              <td style={{ width: "50%" }}>{i.content}</td>
                              <td style={{ width: "20%" }}>
                                {i.termination_date}
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </Table>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="p-2 bd-highlight col-example">
                <h2 style={{ fontWeight: "bolder" }}>
                  출석&nbsp;
                  <Badge
                    pill
                    style={{ height: "2.3rem", paddingTop: "0.4rem", paddingRight :"0.3rem" }}
                    variant="success"
                    
                  >
                    <FontAwesomeIcon icon={faUserCheck} className="mr-2" />
                  </Badge>
                </h2>
                <Card border="info" style={{ width: "20em", height: "50em" }}>
                  <div className=" justify-content-center align-items-center">
                    <div style={{ width: "auto" }}>
                      <Table style={{ height: "auto" }} responsive>
                        <thead style={{background:"lightgreen"}}>
                          <tr>
                            <th>No</th>
                            <th>날짜</th>
                          </tr>
                        </thead>
                        {attendances.map((i, index) => (
                          <tbody>
                            <tr>
                              <td style={{ width: "20%" }} key={index + 1}>
                                {index + 1}{" "}
                              </td>
                              <td style={{ width: "80%" }}>{i.createdAt}</td>
                            </tr>
                          </tbody>
                        ))}
                      </Table>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Activitycontent;
