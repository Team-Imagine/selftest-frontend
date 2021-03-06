import React, { Component, useState } from "react";
import login from "../picture/login.png";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";
import store from "../store";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  faHome, faKey,
  faExchangeAlt,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

const Password = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [new_password, setNewPassWord] = useState("");
  const [new_password_again, setNewPassWordAgain] = useState("");
  const [password_error, setPasswordError] = useState("");
  const [password_match, setPasswordMatch] = useState("");
  let history = useHistory();
  const changepassword = {
    code: code,
    new_password: new_password,
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeCode = (e) => {
    setCode(e.target.value);
  };
  const onChangeNewPassword = (e) => {
    setNewPassWord(e.target.value);
  };
  const onChangeNewPasswordAgain = (e) => {
    setPasswordError(e.target.value !== new_password);
    console.log(password_error);
    setPasswordMatch(e.target.value === new_password);
    console.log(password_match);
    setNewPassWordAgain(e.target.value);
  };

  const moveLogin = () => {
    history.push("/login");
  };

  const moveHome= () => {
    history.push("/home");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(email);

    axios
      .post(`/api/user/forgot-password/`, { email })
      .then((res) => {
        console.log(res.data);
        alert("인증코드를 전송하였습니다! 이메일을 확인해주세요.");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const checkHandler = (event) => {
    event.preventDefault();
    console.log(code);
    axios
      .post(`/api/user/verify-change-password/`, { code })
      .then((res) => {
        console.log(res.data);
        alert("인증되었습니다!");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const changePassword = (e) => {
    e.preventDefault();
    if (new_password === new_password_again) {
      console.log(changepassword);
      axios
        .post(`/api/user/verify-change-password/`, changepassword)
        .then((res) => {
          console.log(res.data);
          alert("비밀번호가 성공적으로 변경되었습니다. 다시 로그인하세요.");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
        history.push(`/login`);
    } else if (new_password !== new_password_again){
      alert("비밀번호가 일치하지 않습니다.");}
    
      
  };

  return (
    <div
      style={{
        backgroundColor: "#f7feff",
      }}
    >
      <div style={{ height: "70rem" }}>
        <div className="container">
          <div style={{height:"4rem"}}></div>
          <div className="row h-100 justify-content-center align-items-center">
          <div className="p-2 bd-highlight">
          <Button variant="info " onClick={moveLogin}>
              <FontAwesomeIcon icon={faKey} className="mr-2" />
              로그인
            </Button> &nbsp;

            <Button variant="info " onClick={moveHome}>
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              홈
            </Button> <br/> <br/>
            <Card border="info" style={{ width: "50em", height: "45rem" }}>
              <div className="row h-100 justify-content-center align-items-center">
                <form className="col-10">
                  <h2 style={{ fontWeight: "bolder" }}>
                    비밀번호를 잊어버리셨나요?
                  </h2>
                  <hr />
                  <div style={{ color: "gray" }}>
                    SelfTest에 가입했던 이메일을 입력해주세요. 인증코드를
                    전송합니다.
                  </div>
                  <br />

                  <Form.Group>
                    <Form inline>
                      <Form.Label style={{ width: "10rem" }}>
                        이메일 주소
                      </Form.Label>
                      {""}
                      &nbsp;&nbsp;
                      <Form.Control
                        style={{ width: "24rem" }}
                        placeholder="이메일주소를 입력하세요."
                        onChange={onChangeEmail}
                        value={email}
                        id="email"
                      />
                      &nbsp;&nbsp;
                      <div>
                        <Button variant="info" onClick={submitHandler}>
                          <FontAwesomeIcon
                            icon={faPaperPlane}
                            className="ml-auto"
                          />{" "}
                          전송
                        </Button>
                      </div>
                    </Form>

                    <Form.Text className="text-muted">
                      <Form.Label style={{ width: "11rem" }}></Form.Label>
                      이메일 형식에 맞게 입력하세요.
                    </Form.Text>
                  </Form.Group>

                  <br />
                  <h4>비밀번호 변경하기</h4>
                  <br />
                  <Form.Group>
                    <Form inline>
                      <Form.Label style={{ width: "10rem" }}>
                        인증번호
                      </Form.Label>{" "}
                      &nbsp;&nbsp;
                      <Form.Control
                        style={{ width: "29rem" }}
                        placeholder="인증번호를 입력하세요."
                        onChange={onChangeCode}
                        value={code}
                        id="code"
                      />
                      &nbsp;&nbsp;
                    </Form>

                    <Form.Text className="text-muted">
                      <Form.Label style={{ width: "11rem" }}></Form.Label>
                      귀하의 이메일로 전송된 인증번호를 입력해주세요. 유효시간은
                      3분입니다.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form inline>
                      <Form.Label style={{ width: "10rem" }}>
                        새 비밀번호
                      </Form.Label>{" "}
                      &nbsp;&nbsp;
                      <Form.Control
                        onChange={onChangeNewPassword}
                        value={new_password}
                        type="password"
                        name="firstpassword"
                        style={{ width: "29rem" }}
                        placeholder="변경할 비밀번호를 입력하세요."
                      />
                      &nbsp;&nbsp;
                    </Form>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form inline>
                      <Form.Label id="new_password" style={{ width: "10rem" }}>
                        &nbsp;새 비밀번호 확인
                      </Form.Label>{" "}
                      &nbsp;&nbsp;
                      <Form.Control
                        onChange={onChangeNewPasswordAgain}
                        type="password"
                        value={new_password_again}
                        name="lastpassword"
                        style={{ width: "29rem" }}
                        placeholder="변경할 비밀번호를 다시 입력하세요."
                      />
                      &nbsp;&nbsp;
                    </Form>
                    <Form.Text className="text-muted">
                      <Form.Label style={{ width: "11rem" }}></Form.Label>
                      {password_error && "비밀번호가 일치하지 않습니다"}
                      {password_match && "비밀번호가 일치합니다"}
                    </Form.Text>
                  </Form.Group>
                  <br />
                  <button
                    onClick={changePassword}
                    type="submit"
                    className="btn btn-info btn-block"
                  >
                    <FontAwesomeIcon icon={faExchangeAlt} className="mr-2" />
                    비밀번호 변경하기
                  </button>
                </form>
              </div>
            </Card>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};
export default Password;
