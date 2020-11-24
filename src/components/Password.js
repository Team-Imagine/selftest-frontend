import React, { Component, useState } from "react";
import login from "../picture/login.png";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";
import store from "../store";
import Card from "react-bootstrap/Card";
import axios from "axios";

const Password = () => {
  return (
    <div
      style={{
        backgroundColor: "#f7feff",
      }}
    >
      <div style={{ height: "70rem" }}>
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <Card style={{ width: "50em", height: "50rem" }}>
              <div className="row h-100 justify-content-center align-items-center">
                <form className="col-10">
                  <h2 style={{ fontWeight: "bolder" }}>
                    비밀번호를 잊어버리셨나요?
                  </h2>
                  <hr />

                  <div style={{ color: "gray" }}>
                    SelfTest에 가입했던 이메일을 입력해주세요. 비밀번호 재설정
                    메일을 보내드립니다.
                  </div><br/>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>이메일 주소</Form.Label>
                    <Form.Control placeholder="이메일을 입력하세요." />

                    <Form.Text className="text-muted">
                      이메일 형식에 맞게 입력해주세요.
                    </Form.Text>
                  </Form.Group>
                  <button type="submit" className="btn btn-info btn-block">
                    인증번호 전송하기
                  </button><br/>

                  <Form.Group>
                    <Form.Label>인증번호</Form.Label>
                    <Form.Control placeholder="이메일을 입력하세요." />
                    <Form.Text className="text-muted">
                      귀하의 이메일로 전송된 인증번호를 입력해주세요. 유효 시간은 3분입니다.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="비밀번호를 입력하세요."
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>비밀번호 확인</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="비밀번호를 다시 한번 입력하세요."
                    />
                  </Form.Group>

                  <button type="submit" className="btn btn-info btn-block">
                    비밀번호 변경하기
                  </button>
                </form>
              </div>
            </Card>
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
