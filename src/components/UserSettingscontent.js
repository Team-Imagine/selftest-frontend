import React, { Component, useEffect, useState } from "react";
import login from "../picture/login.png";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";
import store from "../store";
import classNames from "classnames";
import Card from "react-bootstrap/Card";
import axios from "axios";
import {
  faExchangeAlt,
  faHome,
  faPaperPlane,
  faSave,
  faUserMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container,Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const UserSettings = (isOpen) => {
  const [user, setUser] = useState([]);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [current_password, setCurrentPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [new_password_again, setNewPasswordAgain] = useState("");
  const [password, setPassword] = useState("");
  const [password_again, setPasswordAgain] = useState("");

  const [password_error,setPasswordError] = useState('');
  const [password_match,setPasswordMatch] = useState('');
  const [newpassword_error,setNewPasswordError] = useState('');
  const [newpassword_match,setNewPasswordMatch] = useState('');
  
  let history = useHistory();

  const moveHome = () => {
    history.push("/home");
  };

  const FirstName = (e) => {
    setFirstName(e.target.value);
  };
  const LastName = (e) => {
    setLastName(e.target.value);
  };
  const Username = (e) => {
    setUserName(e.target.value);
  };
  const CurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };
  const NewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const NewPasswordAgain = (e) => {
    setNewPasswordError(e.target.value!==new_password);
    setNewPasswordMatch(e.target.value===new_password);
    setNewPasswordAgain(e.target.value);
  };
  const Password = (e) => {
    setPassword(e.target.value);
  };
  const PasswordAgain = (e) => {
    setPasswordError(e.target.value!==password);
    setPasswordMatch(e.target.value===password);
    setPasswordAgain(e.target.value);
  };
  //사용자 정보 불러오기
  useEffect(() => {
    axios
      .get(`/api/user`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data.user);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, []);

  //사용자 정보 변경
  const SubmitSaveChange = (event) => {
    event.preventDefault();

    if(new_password === new_password_again){
    axios
      
      .patch(`/api/user`, {
        "username": username,
        "current_password": current_password,
        "new_password": new_password,
        "first_name": first_name,
        "last_name": last_name,
      })
    
      .then((res) => {
        console.log(res.data);
        setFirstName("");
        setLastName("");
        setUserName("");
        setCurrentPassword("");
        setNewPassword("");
        setNewPasswordAgain("");
        alert(res.data.message);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }else if(new_password !== new_password_again)
  alert("비밀번호가 일치하지 않습니다");
  };


  //사용자 탈퇴
  const DeleteUser = (e) => {
    e.preventDefault();
    if(password === password_again){
    axios
      .delete(`api/user/`, {password})
      
      .then((res) => {
        console.log(res.data.message);
        setPassword("");
        setPasswordAgain("");
        console.log("성공", {"password":password})
        alert(res.data.message);
      })
      .catch((error) => {
        console.log("에러", {"password":password})
        alert(error.response.data.message);
      });
    }else if(password !== password_again)
    alert("비밀번호가 일치하지 않습니다");
  };

  return (
    <Container
      fluid
      className={classNames("content", { "is-open": { isOpen } })}
    >
  
      <div >
        <div style={{height:"4rem"}}className="d-flex bd-highlight mb-3">
          <div className="mr-auto p-2 bd-highlight">
          </div>
          <div className="p-2 bd-highlight">
            <Button variant="info "onClick={moveHome}>
              <FontAwesomeIcon icon = {faHome} className="mr-2"/>
            홈으로 돌아가기
            </Button>
          </div>
        </div>

        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="d-flex flex-nowrap bd-highlight">
              <div className="p-2 bd-highlight col-example">
                <Card border="info" style={{ width: "42em", height: "50rem" }}>
                  <div className="row h-100 justify-content-center align-items-center">
                    <form className="col-10">
                      <h2 style={{ fontWeight: "bolder" }}>프로필 설정</h2>
                      <hr />
                      <br />

                      <Form.Group>
                        <Form inline>
                          <Form.Label style={{ width: "10rem" }}>
                            사용자 ID{" "}
                          </Form.Label>
                          <Form.Label>{user.email}</Form.Label>
                        </Form>
                      </Form.Group>
                      <br />
                      <Form.Group>
                        <Form inline>
                          <Form.Label style={{ width: "10rem" }}>
                            이름{" "}
                          </Form.Label>
                          <Form.Control
                            onChange={FirstName}
                            value={first_name}
                            id="first_name"
                            style={{ width: "24rem" }}
                            placeholder="변경할 이름을 입력하세요"
                          />
                        </Form>
                      </Form.Group>
                      <br />

                      <Form.Group>
                        <Form inline>
                          <Form.Label style={{ width: "10rem" }}>
                            성{" "}
                          </Form.Label>
                          <Form.Control
                            onChange={LastName}
                            value={last_name}
                            id="last_name"
                            style={{ width: "24rem" }}
                            placeholder="변경할 성을 입력하세요"
                          />
                        </Form>
                      </Form.Group>
                      <br />

                      <Form.Group>
                        <Form inline>
                          <Form.Label style={{ width: "10rem" }}>
                            사용자명{" "}
                          </Form.Label>
                          <Form.Control
                            onChange={Username}
                            value={username}
                            id="username"
                            style={{ width: "24rem" }}
                            placeholder="변경할 사용자명을 입력하세요"
                          />
                        </Form>
                      </Form.Group>
                      <br />
                      <h4>비밀번호 변경하기</h4>
                      <br />

                      <Form.Group>
                        <Form inline>
                          <Form.Label style={{ width: "10rem" }}>
                            현재 비밀번호{" "}
                          </Form.Label>
                          <Form.Control
                            onChange={CurrentPassword}
                            value={current_password}
                            id="current_password"
                            type="password"
                            style={{ width: "24rem" }}
                            placeholder="현재 비밀번호를 입력하세요"
                          />
                        </Form>
                        <br />

                        <Form inline>
                          <Form.Label style={{ width: "10rem" }}>
                            새 비밀번호{" "}
                          </Form.Label>
                          <Form.Control
                            onChange={NewPassword}
                            value={new_password}
                            id="new_password"
                            style={{ width: "24rem" }}
                            type="password"
                            placeholder="새 비밀번호를 입력하세요"
                          />
                          <br />
                        </Form>
                        <br />

                        <Form inline>
                          <Form.Label style={{ width: "10rem" }}>
                            새 비밀번호 확인{" "}
                          </Form.Label>
                          <Form.Control
                            onChange={NewPasswordAgain}
                            value={new_password_again}
                            id="new_password_again"
                            style={{ width: "24rem" }}
                            type="password"
                            placeholder="새 비밀번호를 다시 한번 입력하세요"
                          />
                          <br />
                        </Form>
                        <Form.Text className="text-muted">
                      <Form.Label style={{ width: "10rem" }}></Form.Label>
                      {newpassword_error&&"비밀번호가 일치하지 않습니다"}
                      {newpassword_match&&"비밀번호가 일치합니다"}
                    </Form.Text>
                      </Form.Group>
                      <button
                        onClick={SubmitSaveChange}
                        type="submit"
                        className="btn btn-info btn-block"
                      >
                        <FontAwesomeIcon icon={faSave} className="mr-2" />
                        변경사항 저장하기
                      </button>
                    </form>
                  </div>
                </Card>
              </div>

              <div className="p-2 bd-highlight col-example">
                <Card border="info" style={{ width: "40em", height: "22rem" }}>
                  <div className="row h-100 justify-content-center align-items-center">
                    <form className="col-10">
                      <h2 style={{ fontWeight: "bolder" }}>탈퇴하기</h2>
                      <hr />
                      <Form.Group>
                        <Form inline>
                          <Form.Label style={{ width: "8rem" }}>
                            비밀번호{" "}
                          </Form.Label>
                          <Form.Control
                            onChange={Password}
                            value={password}
                            id="password"
                            type="password"
                            style={{ width: "24rem" }}
                            placeholder="비밀번호를 입력하세요"
                          />
                        </Form>
                        <br />

                        <Form inline>
                          <Form.Label style={{ width: "8rem" }}>
                            비밀번호 확인{" "}
                          </Form.Label>
                          <Form.Control
                            onChange={PasswordAgain}
                            value={password_again}
                            id="password_again"
                            type="password"
                            style={{ width: "24rem" }}
                            placeholder="비밀번호를 다시 한번 입력하세요"
                          />
                          <br />
                        </Form>
                        <Form.Text className="text-muted">
                      <Form.Label style={{ width: "8rem" }}></Form.Label>
                      {password_error&&"비밀번호가 일치하지 않습니다"}
                      {password_match&&"비밀번호가 일치합니다"}
                    </Form.Text>
                      </Form.Group>

                      <button
                        onClick={DeleteUser}
                        type="submit"
                        className="btn btn-info btn-block"
                      >
                        <FontAwesomeIcon icon={faUserMinus} className="mr-2" />
                        탈퇴하기
                      </button>
                    </form>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />

    </Container>
  );
};
export default UserSettings;
