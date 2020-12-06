import welcome from "../picture/welcome.png";
import React, { Component, useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { faHandPointUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

const Signup= () => {
 const [email, setEmail] = useState("");
 const [username, setUserName] = useState("");
 const [password, setPassword] = useState("");
 const [password_again, setPasswordAgain] = useState("");
 const [first_name, setFirstName] = useState("");
 const [last_name, setLastName] = useState("");
 const [phone_number, setPhonenumber] = useState("");
 const [password_error, setPasswordError] = useState("");
 const [password_match, setPasswordMatch] = useState("");

 const Email = (e) => {
  setEmail(e.target.value);
}; 
 const FirstName = (e) => {
  setFirstName(e.target.value);
};
const LastName = (e) => {
  setLastName(e.target.value);
};
const UserName = (e) => {
  setUserName(e.target.value);
};
const Password = (e) => {
  setPassword(e.target.value);
};
const PasswordAgain = (e) => {
  setPasswordError(e.target.value !== password);
  setPasswordMatch(e.target.value === password);
  setPasswordAgain(e.target.value);
};
const Phonenumber = (e) => {
  setPhonenumber(e.target.value);
};

const submitHandler  = (e) => {
  e.preventDefault();

 const signupinfo = {
   email: email,
   username: username,
   password: password,
   first_name: first_name,
   last_name: last_name,
   phone_number:phone_number,
 };
if(password === password_again){
 axios
      .post(`/api/auth/register`, signupinfo)
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
    }else if(password !== password_again)
    alert("비밀번호가 일치하지 않습니다.");
};
  return (
    <div style={{ height: "90rem" }}>
  <div 
    style={{
      backgroundColor: "#f7feff",
    }}
  >
    <div style={{ height: "4rem" }}> </div>
    <div style={{ height: "50rem" }}>
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <Card border="info" style={{ width: "50rem", height: "50rem" }}>
            <div className="row h-100 justify-content-center align-items-center">
              <form onSubmit={submitHandler} className="col-10">
                <br />
                <br />
                <br />
                <h2 style={{ fontWeight: "bolder" }}>회원가입</h2>
                <hr />

                <div className="row h-100 justify-content-center align-items-center">
                  <img
                    src={welcome}
                    width="550"
                    height="200"
                    alt="signup"
                  />
                </div>
                <Form.Group>
                  <Form inline>
                  <Form.Label style={{ width: "10rem" }}>*이메일 주소</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    style={{ width: "30rem" }}
                    onChange={Email}
                    placeholder="이메일을 입력하세요."
                  /> </Form>
                </Form.Group>
               
                <Form.Group>
                  <Form inline>
                  <Form.Label style={{ width: "10rem" }}>*사용자명</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={username}
                    style={{ width: "30rem" }}
                    onChange={UserName}
                    placeholder="사용자명을 입력하세요."
                  /></Form>
                </Form.Group>

                <Form.Group>
                  <Form inline>
                  <Form.Label style={{ width: "10rem" }} >*비밀번호</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    style={{ width: "30rem" }}
                    onChange={Password}
                    placeholder="비밀번호를 입력하세요."
                  /></Form>
                </Form.Group>

                <Form.Group>
                <Form inline>
                  <Form.Label style={{ width: "10rem" }}>*비밀번호 확인</Form.Label>
                  <Form.Control
                    type="password"
                    name="password_again"
                    value={password_again}
                    style={{ width: "30rem" }}
                    onChange={PasswordAgain}
                    placeholder="비밀번호를 다시 한번 입력하세요."
                  /></Form>
                   <Form.Text className="text-muted">
                    <Form.Label style={{ width: "10rem" }}></Form.Label>
                    {password_error && "비밀번호가 일치하지 않습니다"}
                    {password_match && "비밀번호가 일치합니다"}
                    </Form.Text>
                </Form.Group>
                
                <Form.Group>
                <Form inline>
                  <Form.Label style={{ width: "10rem" }}>*이름</Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    value={first_name}
                    onChange={FirstName}
                    placeholder="이름을 입력하세요."
                    style={{ width: "12.5rem" }}
                  />
              
              
                  <Form.Label style={{ width: "5rem" }}>*성</Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    value={last_name}
                    onChange={LastName}
                    placeholder="성을 입력하세요."
                    style={{ width: "12.5rem" }}
                  /> 
              </Form>
              </Form.Group>

              <Form.Group>
              <Form inline>
                  <Form.Label style={{ width: "10rem" }}>전화번호</Form.Label>
                  <Form.Control
                    type="number"
                    name="phone_number"
                    value={phone_number}
                    onChange={Phonenumber}
                    style={{ width: "30rem" }}
                    placeholder="전화번호를 입력하세요."
                  />
                </Form>
                </Form.Group>


                <Form.Text  className="text-muted">
                  *은 필수항목입니다.
                </Form.Text>

                <button
                  type="submit"
                  className="btn btn-info btn-block"
                  onClick={submitHandler}
                >
                  <FontAwesomeIcon
                    icon={faHandPointUp}
                    className="mr-2"
                  />
                  회원가입
                </button>

                <p className="forgot-password text-right">
                  <a href="login" to="/login">
                    이미 회원이신가요? 로그인
                  </a>
                </p>
                <br />
                <br />
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
export default Signup;

  