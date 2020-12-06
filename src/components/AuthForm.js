import React, { Component, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";
import store from "../store";
import emailpic from "../picture/email.png";
import axios from "axios";
import Card from "react-bootstrap/Card";

const AuthForm = () => {
  const [authCode, setAuthCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(0);

  const [user, setUser] = useState([]);

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

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      verification_code: authCode,
    };

    axios
      .post(`/api/auth/verify-email`, data)

      .then((res) => {
        console.log(res.data);
        store.dispatch({ type: "VERIFIED", value: 1 });
        alert("인증 되었습니다.");

        setIsAuthenticated(1);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const redirect = isAuthenticated ? (
    <Redirect to={{ pathname: "/home" }} />
  ) : (
    ""
  );

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
              <Card border="info" style={{ width: "50rem", height: "40rem" }}>
                <div className="row h-100 justify-content-center align-items-center">
                  <form onSubmit={submitHandler} className="col-10">
                    <h2 style={{ fontWeight: "bolder" }}>본인 인증</h2>
                    <hr />
                    <div className="row h-100 justify-content-center align-items-center">
                      <div>
                        <img
                          src={emailpic}
                          width="500"
                          height="200"
                          alt="email"
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="row h-100 justify-content-center align-items-center">
                      <h4>귀하의 메일({user.email})로&nbsp;</h4>
                      <h4>인증 메일이 발송되었습니다.</h4>
                      <p>인증하시면 Selftest 이용이 가능합니다.</p>
                    </div>
                    <Form.Group controlId="formBasicAuthCode">
                      <Form.Label>인증 코드</Form.Label>
                      <Form.Control
                        type="text"
                        name="authCode"
                        value={authCode}
                        onChange={({ target: { value } }) => setAuthCode(value)}
                        placeholder="인증코드를 입력해주세요."
                      />
                    </Form.Group>
                    <button type="submit" className="btn btn-info btn-block">
                      제출
                    </button>
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
export default AuthForm;
