import React, { Component, useState } from "react";
import login from "../picture/login.png";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";
import store from "../store";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { faExchangeAlt, faPaperPlane, faSave, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";


const UserSettings = () => {
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
                      <Form.Label>suna32580@gmail.com </Form.Label> 
                    </Form>
                    </Form.Group><br/>

                    <Form.Group>
                    <Form inline>
                      <Form.Label style={{width:"8rem"}}>이름 </Form.Label> 
                      <Form.Control style={{width:"27rem"}}placeholder="변경할 이름을 입력하세요" />
                      &nbsp;&nbsp;
                      <div>
                        <Button variant="info">
                          <FontAwesomeIcon icon={faExchangeAlt} className="ml-auto" />변경
                        </Button>
                      </div>
                    </Form>
                    </Form.Group><br/>

                    <Form.Group>
                    <Form inline>
                      <Form.Label style={{width:"8rem"}}>성 </Form.Label>
                      <Form.Control style={{width:"27rem"}}placeholder="변경할 성을 입력하세요" />
                      &nbsp;&nbsp;
                      <div>
                        <Button variant="info">
                          <FontAwesomeIcon icon={faExchangeAlt} className="ml-auto" />변경
                        </Button>
                      </div>
                    </Form>
                    </Form.Group><br/>

                    <Form.Group>
                    <Form inline>
                      <Form.Label style={{width:"8rem"}}>사용자명 </Form.Label>
                      <Form.Control style={{width:"27rem"}}placeholder="변경할 사용자명을 입력하세요" />
                      &nbsp;&nbsp;
                      <div>
                        <Button variant="info">
                          <FontAwesomeIcon icon={faExchangeAlt} className="ml-auto" />변경
                        </Button>
                      </div>
                    </Form>
                    </Form.Group><br/>
                  <button type="submit" className="btn btn-info btn-block">
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
                      <Form.Control style={{width:"30rem"}}placeholder="현재 비밀번호를 입력하세요"/>
                    </Form><br/>

                    <Form inline>
                      <Form.Label style={{width:"10rem"}}>새 비밀번호 </Form.Label>
                      <Form.Control style={{width:"30rem"}}placeholder="새 비밀번호를 입력하세요"/>
                      <br/>
                     
                   
                    </Form>
                    </Form.Group>
                    <button type="submit" className="btn btn-info btn-block">
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
                      <Form.Control style={{width:"30rem"}}placeholder="새 비밀번호를 입력하세요"/>
                      <br/>
                     
                   
                    </Form>
                    </Form.Group>

                  <button type="submit" className="btn btn-info btn-block">
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
