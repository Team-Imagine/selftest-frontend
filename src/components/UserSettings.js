import React, { Component, useEffect, useState } from "react";
import login from "../picture/login.png";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";
import store from "../store";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { faExchangeAlt, faPaperPlane, faSave, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

//한꺼번에 또는 칸마다  값전달 확인 백엔드 연결 x

const UserSettings = () => {

const [first_name, setFirstName] = useState("");
const [last_name, setLastName] = useState("");
const[username, setUserName] = useState("");
const[current_password, setCurrentPassword] = useState("");
const[new_password, setNewPassword] = useState("");
const[password, setPassword] = useState("");

const changeuser ={
  username: username,
  current_password: current_password,
  new_password: new_password,
  first_name: first_name,
  last_name: last_name,
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
const Password = (e) => {
  setPassword(e.target.value);
};

const SubmitUsername = (event) => {
  event.preventDefault();
  console.log(username);

  axios
    .patch(`/user/`,{username})
    .then((res) => {
      console.log(res.data);
      alert("사용자명이 변경되었습니다!");
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
};

const SubmitFirstName = (event) => {
  event.preventDefault();
  console.log(first_name);

  axios
    .patch(`/user/`,{first_name})
    .then((res) => {
      console.log(res.data);
      alert("이름이 변경되었습니다!");
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
};

const SubmitLastName = (event) => {
  event.preventDefault();
  console.log(last_name);

  axios
    .patch(`/user/`,{last_name})
    .then((res) => {
      console.log(res.data);
      alert("성이 변경되었습니다!");
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
};

const SubmitChangePassword = (event) => {
  event.preventDefault();
  console.log(new_password);

  axios
    .patch(`/user/`,{new_password})
    .then((res) => {
      console.log(res.data);
      alert("비밀번호가 변경되었습니다!");
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
};

const SubmitSaveChange = (event) => {
  event.preventDefault();
  console.log(changeuser);

  axios
    .patch(`/user/`,changeuser)
    .then((res) => {
      console.log(res.data);
      alert("정보가 변경되었습니다!");
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
};

const DeleteUser = (event) => {
  event.preventDefault();
  console.log(password);

  axios
    .delete(`/user/`,{password})
    .then((res) => {
      console.log(res.data);
      alert("탈퇴되었습니다!");
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
};


{/* 이메일 주소 불러올 api 
  useEffect(() => {
    axios
      .get(`/api/user`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data.user.rows);
      })

      .catch((error) => {
        alert(error.response.data.message);
      });
  }, []);
*/}

  return (
    <div
      style={{
        backgroundColor: "#f7feff",
      }}
    >

      <div style={{ height: "70rem" }}>

        
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
          <div className="d-flex flex-nowrap bd-highlight">
          <div className="p-2 bd-highlight col-example">
            <Card border="info" style={{ width: "50em", height: "50rem" }}>
              <div className="row h-100 justify-content-center align-items-center">
                <form className="col-10">
                  <h2 style={{ fontWeight: "bolder" }}>
                    프로필 설정
                  </h2>
                  <hr /><br/>

                
                    
                <Form.Group>
                  <Form inline>
                      <Form.Label style={{width:"8rem"}}>이메일 주소 </Form.Label> 
                      <Form.Label>
                      이메일 주소 불러올 곳
                      </Form.Label> 
                    </Form>
                    </Form.Group><br/>

                    <Form.Group>
                    <Form inline>
                      <Form.Label style={{width:"8rem"}}>이름 </Form.Label> 
                      <Form.Control 
                      onChange={FirstName}
                      value={first_name}
                      id="first_name"
                      style={{width:"27rem"}}placeholder="변경할 이름을 입력하세요" />
                      &nbsp;&nbsp;
                      <div>
                        <Button onClick={SubmitFirstName} variant="info">
                          <FontAwesomeIcon icon={faExchangeAlt} className="ml-auto" />변경
                        </Button>
                      </div>
                    </Form>
                    </Form.Group><br/>

                    <Form.Group>
                    <Form inline>
                      <Form.Label style={{width:"8rem"}}>성 </Form.Label>
                      <Form.Control 
                       onChange={LastName}
                       value={last_name}
                       id="last_name"
                      style={{width:"27rem"}}placeholder="변경할 성을 입력하세요" />
                      &nbsp;&nbsp;
                      <div>
                        <Button onClick={SubmitLastName} variant="info">
                          <FontAwesomeIcon icon={faExchangeAlt} className="ml-auto" />변경
                        </Button>
                      </div>
                    </Form>
                    </Form.Group><br/>

                    <Form.Group>
                    <Form inline>
                      <Form.Label style={{width:"8rem"}}>사용자명 </Form.Label>
                      <Form.Control
                        onChange={Username}
                        value={username}
                        id="username"
                        style={{width:"27rem"}}placeholder="변경할 사용자명을 입력하세요" />
                      &nbsp;&nbsp;
                      <div>
                        <Button onClick={SubmitUsername}
                        variant="info">
                          <FontAwesomeIcon icon={faExchangeAlt} className="ml-auto" />변경
                        </Button>
                      </div>
                    </Form>
                    </Form.Group><br/>
                  <button
                  onClick={SubmitSaveChange} 
                  type="submit" className="btn btn-info btn-block">
                  <FontAwesomeIcon icon={faSave} className="mr-2" />변경사항 저장하기
                  </button>
                </form>
              </div>
            </Card>
            </div>

            <div className="p-2 bd-highlight col-example">
            <Card border="info" style={{ width: "50em", height: "50rem" }}>
              <div className="row h-100 justify-content-center align-items-center">
                <form className="col-10">

                <h3 style={{ fontWeight: "bolder" }}>
                    비밀번호 변경
                  </h3><hr/>
                    <Form.Group>  
                    <Form inline>
                      <Form.Label style={{width:"10rem"}}>현재 비밀번호 </Form.Label>
                      <Form.Control 
                      onChange={CurrentPassword}
                      value={current_password}
                      id="current_password"
                      style={{width:"30rem"}}placeholder="현재 비밀번호를 입력하세요"/>
                    </Form><br/>

                    <Form inline>
                      <Form.Label style={{width:"10rem"}}>새 비밀번호 </Form.Label>
                      <Form.Control 
                       onChange={NewPassword}
                       value={new_password}
                       id="new_password"
                       style={{width:"30rem"}}placeholder="새 비밀번호를 입력하세요"/>
                      <br/>
                     
                   
                    </Form>
                    </Form.Group>
                    <button 
                    onClick={SubmitChangePassword}
                    type="submit" className="btn btn-info btn-block">
                  <FontAwesomeIcon icon={faExchangeAlt} className="mr-2" />변경하기
                  </button><br/><br/><br/><br/>
                     
                  <h2 style={{ fontWeight: "bolder" }}>
                    탈퇴하기
                  </h2>
                  <hr />
                  <Form.Group>  
                    <Form inline>
                      <Form.Label style={{width:"10rem"}}>비밀번호 </Form.Label>
                      <Form.Control style={{width:"30rem"}}placeholder="현재 비밀번호를 입력하세요"/>
                    </Form><br/>

                    <Form inline>
                      <Form.Label style={{width:"10rem"}}>비밀번호 확인 </Form.Label>
                      <Form.Control 
                      onChange={Password}
                       value={password}
                       id="password" 
                       style={{width:"30rem"}}placeholder="새 비밀번호를 입력하세요"/>
                      <br/>
                     
                   
                    </Form>
                    </Form.Group>

                  <button 
                  onClick={DeleteUser}
                  type="submit" className="btn btn-info btn-block">
                  <FontAwesomeIcon icon={faUserMinus} className="mr-2" />탈퇴하기
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
    </div>
  );
};
export default UserSettings;
