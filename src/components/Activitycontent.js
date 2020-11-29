import React, { Component, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Container,Button } from "react-bootstrap";
import axios from "axios";
import Table from "react-bootstrap/Table";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";


const Activitycontent = (isOpen) => {
  const [user, setUser] = useState([]);
  const [username, setUsername] = useState("");
  const [point_logs, setPointLogs] = useState([]);
  const [penalty_logs, setPenaltyLogs] = useState([]);
  const [attendances, setAttendances] = useState([]);
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
     setAttendances(res.data.attendances.rows)
   })
   .catch((error) => {
     alert(error.response.data.message);
   });
  }, []);

  return (
    
    <Container
      fluid
      className={classNames("content", { "is-open": { isOpen } })}
    >
      <div>
        <div className="d-flex bd-highlight mb-3">
          <div className="mr-auto p-2 bd-highlight">
            <h4 style={{ fontWeight: "bolder" }}>포인트내역</h4>
          </div>
          <div className="p-2 bd-highlight">
            <Button variant="info "onClick={moveHome}>
              <FontAwesomeIcon icon = {faHome} className="mr-2"/>
            홈으로 돌아가기
            </Button>
          </div>
         
        </div>
        <hr />

        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="p-2 bd-highlight col-example">
              <Card border="info" style={{ width: "80rem", height: "auto" }}>
                <div className=" justify-content-center align-items-center">
                  <div style={{ width: "auto" }}>
                    <Table style={{ height: "auto" }} striped bordered hover>
                      <thead>
                        <tr>
                          <th>번호</th>
                          <th>날짜</th>
                          <th>포인트받은내역</th>
                          <th>포인트</th>
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
              </Card>
            </div>
          </div>
        </div>
    
      </div>
      <div>
        <div className="d-flex bd-highlight mb-3">
          <div className="mr-auto p-2 bd-highlight">
            <h4 style={{ fontWeight: "bolder" }}>제재내역</h4>
          </div>
        </div>
        <hr />

        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="p-2 bd-highlight col-example">
              <Card border="info" style={{ width: "80rem", height: "auto" }}>
                <div className=" justify-content-center align-items-center">
                  <div style={{ width: "auto" }}>
                    <Table style={{ height: "auto" }} striped bordered hover>
                      <thead>
                        <tr>
                          <th>번호</th>
                          <th>날짜</th>
                          <th>포인트받은내역</th>
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
                            <td style={{ width: "20%" }}>{i.termination_date}</td>
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

      <div>
        <div className="d-flex bd-highlight mb-3">
          <div className="mr-auto p-2 bd-highlight">
            <h4 style={{ fontWeight: "bolder" }}>출석내역</h4>
          </div>
        </div>
        <hr />

        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="p-2 bd-highlight col-example">
              <Card border="info" style={{ width: "80rem", height: "auto" }}>
                <div className=" justify-content-center align-items-center">
                  <div style={{ width: "auto" }}>
                    <Table style={{ height: "auto" }} striped bordered hover>
                      <thead>
                        <tr>
                          <th>번호</th>
                          <th>출석날짜</th>
                         
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

      
      
    </Container>
  );
};
export default Activitycontent;
