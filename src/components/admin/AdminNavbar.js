import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSignOutAlt,
  faUser,
  faUserCog,
  faUserGraduate,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar, Button, Nav } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { useHistory } from "react-router-dom";
import logo from "../../picture/icon.png";
import Badge from "react-bootstrap/Badge";
import store from "../../store";

import { useCookies } from "react-cookie";
import axios from "axios";
import { set } from "js-cookie";

const AdminNavbar = ({ isOpen}) => {
  const [questionType, setQuestionType] = useState("default");
  const [test, setTest] = useState(store.getState().isLoggedIn);
  let [cookies] = useCookies(["access_token"]);
  let history = useHistory();

  const moveLogin = () => {
    history.push("/login");
	};
	
	const moveHome = () => {
    history.push("/home");
  };

  const readCookie = async () => {
    if (cookies.access_token) {
      // 쿠키에 access_token이 존재하면 로그인 상태 유지
      store.dispatch({ type: "LOGIN", value: 1 });

      await axios
        .get(`/api/user`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  };

  const signOut = async () => {
    await axios
      .post(`/api/auth/logout`)
      .then((res) => {
        console.log(res.data);

        cookies.access_token = null;

        store.dispatch({ type: "LOGIN", value: 0 });
        store.dispatch({ type: "VERIFIED", value: 0 });

        alert("로그아웃 되었습니다.");

        moveHome();
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  useEffect(() => {
    readCookie();
  }, [test]);

  const check = () => {
    if (!cookies.access_token) {
      return (
        <Navbar
          bg="light"
          className="navbar shadow-sm p-3 bg-white rounded"
          expand="lg"
        >
          <div className="row h-100 justify-content-center align-items-center">
            <img
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingBottom: "10px",
              }}
              src={logo}
              width="80"
              height="60"
              alt="signup"
            />
          </div>
          <div>				
            <div>
                <h1 style={{ fontWeight: "bolder" }}>SelfTest</h1>
            </div>   
          </div>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto" navbar>
              <div
                className="d-flex align-items-center"
                style={{ backgroundColor: "white" }}
              >
                <Dropdown>
                  <Dropdown.Toggle
                    variant="info"
                    href="login"
                    onClick={moveLogin}
                  >
                    <FontAwesomeIcon icon={faUser} className="ml-auto" /> 로그인
                  </Dropdown.Toggle>
                </Dropdown>
                <Nav.Link href="#">
                  <FontAwesomeIcon icon={faBell} className="ml-auto" style />
                </Nav.Link>
              </div>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </Navbar>
      );
    } else {
      return (
        <Navbar
          bg="light"
          className="navbar shadow-sm p-3 bg-white rounded"
          expand="lg"
        >
          <div className="row h-100 justify-content-center align-items-center">
            <img src={logo} width="60" height="50" alt="signup" />
          </div>
					&nbsp;&nbsp;&nbsp;
          <div>
						<div>
              <h1 style={{ paddingTop: "0.5rem" }}>SelfTest</h1>    
						</div>  
          </div>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto" navbar>
              <div
                className="d-flex align-items-center"
                style={{ backgroundColor: "white" }}
              >
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    <FontAwesomeIcon icon={faUser} className="ml-auto" />내
                    프로필
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={signOut}>
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        className="ml-auto"
                      />
                      로그아웃
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Nav.Link href="#">
                  <FontAwesomeIcon icon={faBell} className="ml-auto" style />
                </Nav.Link>
              </div>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </Navbar>
      );
    }
  };

  return (
    <div>
      {check()}
      <Navbar
        bg="warning"
        className="navbar shadow-sm p-1.5 bg-yellow rounded"
      ></Navbar>
    </div>
  );
};

export default AdminNavbar;
