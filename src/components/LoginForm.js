import React, { Component, useState } from "react";
import login from "../picture/login.png";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";
import store from "../store";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(0);

  const submitHandler = (event) => {
    event.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    axios
      .post(`/api/auth/login`, user)
      .then((res) => {
        console.log(res.data);

        store.dispatch({ type: "LOGIN", value: res.data.uid });
        store.dispatch({ type: "VERIFIED", value: res.data.verified });

        setPassword("");
        setEmail("");
        setIsLoggedIn(1);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
  const redirect = isLoggedIn ? <Redirect to={{ pathname: "/home" }} /> : "";

  return (
    <div style={{ height: "75rem" }}>
      <div
        style={{
          backgroundColor: "#f7feff",
        }}
      >
        <div style={{ height: "65rem" }}>
          <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
              {redirect}
              <Card style={{ width: "50rem", height: "45rem" }}>
                <div className="row h-100 justify-content-center align-items-center">
                  <form onSubmit={submitHandler} className="col-10">
                    <br />
                    <br />

                    <br />
                    <h2 style={{ fontWeight: "bolder" }}>로그인</h2>
                    <hr />

                    <div className="row h-100 justify-content-center align-items-center">
                      <img src={login} width="550" height="200" alt="Login" />
                    </div>

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>이메일 주소</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        onChange={({ target: { value } }) => setEmail(value)}
                        placeholder="이메일을 입력하세요."
                      />

                      <Form.Text className="text-muted">
                        이메일 형식에 맞게 입력해주세요.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>비밀번호</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={({ target: { value } }) => setPassword(value)}
                        placeholder="비밀번호를 입력하세요."
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="내 정보 기억하기" />
                    </Form.Group>

                    <button type="submit" className="btn btn-info btn-block">
                      <FontAwesomeIcon icon={faKey} className="mr-2" />{" "}
                      로그인하기
                    </button>

                    <div className="App-wrapper">
                      <p className="forgot-password text-right">
                        <a href="signup" to="/signup">
                          회원가입 |{" "}
                        </a>
                        <a href="password" to="/password">
                          비밀번호 찾기
                        </a>
                        <br /> <br />
                        <br /> <br />
                        <br /> <br />
                        <br /> <br />
                        <br /> <br />
                        <br /> <br />
                        <br />
                      </p>
                    </div>
                  </form>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
