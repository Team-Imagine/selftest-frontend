import React, { Component, useState } from "react";
import login from "../picture/login.png";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";
import store from "../store";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(0);

  let history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    axios
      .post(`/api/auth/login`, user)
      .then((res) => {
        console.log('check:', res.data);

        if(res.data.is_admin) {
          alert('관리자 계정입니다.');
          history.push(`/admin/blocked`);
        }

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
          <div style={{height:"7rem"}}></div>
          <div className="container">
            <div className="row h-100 justify-content-center align-items-center">
              {redirect}
              <Card border="info" style={{ width: "50rem", height: "40rem" }}>
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
                      <Form inline>
                      <Form.Label style ={{width: "10rem"}}>이메일 주소</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        style={{width:"30rem"}}
                        onChange={({ target: { value } }) => setEmail(value)}
                        placeholder="이메일을 입력하세요."
                      />
                      </Form>
                      <Form inline>
                    <Form.Label style ={{width: "10rem"}}></Form.Label>
                    <Form.Text className="text-muted">
                        이메일 형식에 맞게 입력해주세요.
                      </Form.Text>
                      </Form>
                    </Form.Group>
                   

                    <Form.Group controlId="formBasicPassword">
                    <Form inline>
                      <Form.Label style ={{width: "10rem"}}>비밀번호</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        style={{width:"30rem"}}
                        onChange={({ target: { value } }) => setPassword(value)}
                        placeholder="비밀번호를 입력하세요."
                      />
                       </Form>
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
