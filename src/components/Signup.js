import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import welcome from "../picture/welcome.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointUp } from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";

export default class SignUp extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      password: "",
      password_again:"",
      first_name: "",
      last_name: "",
      phone_number: "",
    };
  }

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = (event) => {
    event.preventDefault();
    console.log(this.state);

    const userRegister = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      phone_number: this.state.phone_number,
    };

    if(this.state.password === this.state.password_again){
    console.log("비밀번호 일치");
    axios
      .post(`/api/auth/register`, userRegister)

      .then((res) => {
        console.log(res.data);

        this.setState({
          email: "",
          username: "",
          password: "",
          password_again:"",
          first_name: "",
          last_name: "",
          phone_number: "",
        });

        alert("회원가입에 성공하였습니다!.");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
    }else if (this.state.password !== this.state.password_again){
      alert("비밀번호가 일치하지 않습니다!")
      console.log("비밀번호 불일치");}
    
  };

  render() {
    const {
      email,
      username,
      password,
      password_again,
      first_name,
      last_name,
      phone_number,
    } = this.state;

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
                    <form onSubmit={this.submitHandler} className="col-10">
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
                          onChange={this.changeHandler}
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
                          onChange={this.changeHandler}
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
                          onChange={this.changeHandler}
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
                          onChange={this.changeHandler}
                          placeholder="비밀번호를 다시 한번 입력하세요."
                        /></Form>
                      </Form.Group>
                      
                      <Form.Group>
                      <Form inline>
                        <Form.Label style={{ width: "10rem" }}>*이름</Form.Label>
                        <Form.Control
                          type="text"
                          name="first_name"
                          value={first_name}
                          onChange={this.changeHandler}
                          placeholder="이름을 입력하세요."
                          style={{ width: "12.5rem" }}
                        />
                    
                    
                        <Form.Label style={{ width: "5rem" }}>*성</Form.Label>
                        <Form.Control
                          type="text"
                          name="last_name"
                          value={last_name}
                          onChange={this.changeHandler}
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
                          onChange={this.changeHandler}
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
                        onClick={this.handleSubmit}
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
  }
}
