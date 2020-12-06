import React, { Component, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import classNames from "classnames";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { faSave, faHome, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import store from "../store";

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
  const [newpassword_error, setNewPasswordError] = useState("");
  const [newpassword_match, setNewPasswordMatch] = useState("");
  const [test, setTest] = useState(store.getState().isLoggedIn);

  let [cookies] = useCookies(["access_token"]);
  let history = useHistory();
  const moveHome = () => {
    history.push("/home");
  };
  const moveLogin = () => {
    history.push("/login");
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
    setNewPasswordError(e.target.value !== new_password);
    setNewPasswordMatch(e.target.value === new_password);
    setNewPasswordAgain(e.target.value);
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
  }, [test]);

  //사용자 정보 변경
  const SubmitSaveChange = (event) => {
    event.preventDefault();

    if (new_password === new_password_again) {
      axios

        .patch(`/api/user`, {
          username: username,
          current_password: current_password,
          new_password: new_password,
          first_name: first_name,
          last_name: last_name,
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
    } else if (new_password !== new_password_again){
      alert("비밀번호가 일치하지 않습니다");}
    window.location.reload(); 
  };

  //사용자 탈퇴
  const DeleteUser = (e) => {
    e.preventDefault();
    if (password === password_again) {
      var isDelete = window.confirm("정말 탈퇴하시겠습니까?");
      if (isDelete) {
        axios
          .delete(`/api/user`)
          .then((res) => {
            console.log(res.data.message);
            cookies.access_token = null;
            store.dispatch({ type: "LOGIN", value: 0 });
            store.dispatch({ type: "VERIFIED", value: 0 });
            setPassword("");
            setPasswordAgain("");
            alert(res.data.message);
            alert("다시 로그인하세요!");
            moveLogin();
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      } else {
        alert("취소되었습니다.");
      }
    } else if (password !== password_again)
      alert("비밀번호가 일치하지 않습니다");
  };

  return (
    <Container
      fluid
      className={classNames("content", { "is-open": { isOpen } })}
    >
      <div>
        <div style={{ height: "4rem" }} className="d-flex bd-highlight mb-3">
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
                <Card border="info" style={{ width: "42em", height: "55rem" }}>
                  <div className="row h-100 justify-content-center align-items-center">
                    <form onSubmit = {SubmitSaveChange} className="col-10">
                      <h2 style={{ fontWeight: "bolder" }}>{user.username}의 프로필 설정</h2>
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
                          {newpassword_error && "비밀번호가 일치하지 않습니다"}
                          {newpassword_match && "비밀번호가 일치합니다"}
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
                      <br />
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
