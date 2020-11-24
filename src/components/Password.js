import React, { Component, useState } from "react";
import login from "../picture/login.png";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";
import store from "../store";
import Card from "react-bootstrap/Card";
import axios from "axios";
import {
  faCheck,
  faExchangeAlt,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
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
                      <Form.Label style={{ width: "8rem" }}>
                        이메일 주소
                      </Form.Label>{""}
                      &nbsp;&nbsp;
                      <Form.Control
                        style={{ width: "26rem" }}
                        placeholder="이메일주소를 입력하세요."
                      />
                      &nbsp;&nbsp;
                      <div>
                        <Button variant="info">
                          <FontAwesomeIcon icon={faPaperPlane} className="ml-auto" />{" "}
                          전송
                        </Button>
                      </div>
                    </Form>

                    <Form.Text className="text-muted">
                      <Form.Label style={{ width: "9rem" }}></Form.Label>
                      이메일 형식에 맞게 입력하세요.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group>
                    <Form inline>
                      <Form.Label style={{ width: "8rem" }}>
                        인증번호
                      </Form.Label>{" "}
                      &nbsp;&nbsp;
                      <Form.Control
                        style={{ width: "26rem" }}
                        placeholder="인증번호를 입력하세요."
                      />
                      &nbsp;&nbsp;
                      <div>
                        <Button variant="info">
                          <FontAwesomeIcon icon={faCheck} className="ml-auto" />{" "}
                          확인
                        </Button>
                      </div>
                    </Form>

                    <Form.Text className="text-muted">
                      <Form.Label style={{ width: "9rem" }}></Form.Label>
                      귀하의 이메일로 전송된 인증번호를 입력해주세요. 유효시간은
                      3분입니다.
                    </Form.Text>
                  </Form.Group><br/><br/>

                  <Form.Group>
                    <Form inline>
                      <Form.Label style={{ width: "8rem" }}>
                      새 비밀번호
                      </Form.Label>{" "}
                      &nbsp;&nbsp;
                      <Form.Control
                        style={{ width: "32rem" }}
                        placeholder="변경할 비밀번호를 입력하세요."
                      />
                      &nbsp;&nbsp;
                    </Form>
                  </Form.Group>
                  <Form.Group>
                    <Form inline>
                      <Form.Label style={{ width: "8rem" }}>
                      &nbsp;새 비밀번호 확인
                      </Form.Label>{" "}
                      &nbsp;&nbsp;
                      <Form.Control
                        style={{ width: "32rem" }}
                        placeholder="변경할 비밀번호를 다시 입력하세요."
                      />
                      &nbsp;&nbsp;
                    </Form>
                 
                  </Form.Group>
                  <button type="submit" className="btn btn-info btn-block">
                    <FontAwesomeIcon icon={faExchangeAlt} className="mr-2" />
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
