import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSignOutAlt, faUser, faUserCog, faUserGraduate, faBell } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Button, Nav } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import { useHistory } from "react-router-dom";
import logo from "../../picture/icon.png";
import Badge from "react-bootstrap/Badge";
import store from "../../store";

import { useCookies } from 'react-cookie';
import axios from "axios";

const NavBar = ({isOpen, point}) => {
  const [test, setTest] = useState(store.getState().isLoggedIn);
  const [userPoint, setUserPoint] = useState('');
  let [cookies] = useCookies(['access_token']);

  let history = useHistory();

  const moveHome = () => {
      history.push("/home");
  }

  const moveLogin = () => {
    history.push("/login");
  }

  const readCookie = () => {
    if(cookies.access_token) {  // 쿠키에 access_token이 존재하면 로그인 상태 유지
      store.dispatch({type:'LOGIN', value: 1})
      
      axios.get(`/api/user`)
        .then((res) => {
          store.dispatch({type:'VERIFIED', value: res.data.user.verified})
          setUserPoint(res.data.user.point);

          if(!store.getState().verified) {
            axios.post(`/api/auth/send-verification-email`)
              .then((res) => {
                console.log(res.data);
                alert('인증이 필요합니다.');
                history.push("/auth");
              })
          }
          
        })
    
    }
  }

  const signOut = () => {
    axios.post(`/api/auth/logout`)
      .then((res) => {
        console.log(res.data);
        
        cookies.access_token = null;

        store.dispatch({type:'LOGIN', value: 0})
        alert('로그아웃 되었습니다.');

        moveHome();
      })
  }

  useEffect(() => {
    readCookie();

  }, [test]);

  useEffect(() => {
    if(cookies.access_token && store.getState().verified) {
      axios.get(`/api/user/`)
      .then((res) => {
        console.log(res.data.user.point);
        setUserPoint(res.data.user.point);
      })
    }
  }, [point]);

  const check = () => {
    if(!cookies.access_token) {
      return (
        <Navbar
        bg="light"
        className="navbar shadow-sm p-3 bg-white rounded"
        expand="lg"
      >
        <div className="row h-100 justify-content-center align-items-center">
          <img src={logo}
            width='60'
            height='50'
            alt='signup' />
        </div>
        <div>
          <Nav.Link onClick={moveHome}>
            <h1>SelfTest</h1>
          </Nav.Link>
        </div>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2 " />
          <Button variant="info">
            <FontAwesomeIcon icon={faSearch} className="ml-auto" />
          </Button>
        </Form>
       
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto" navbar>
  
              <div className="d-flex align-items-center" style={{backgroundColor:"white"}}>
                <Dropdown>
                  <Dropdown.Toggle variant="info" href="login" onClick={moveLogin}>
                    <FontAwesomeIcon icon={faUser} className="ml-auto" /> {' '}
                  Login
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
        
      )
    } else {
      return (
        <Navbar
        bg="light"
        className="navbar shadow-sm p-3 bg-white rounded"
        expand="lg"
      >
        <div className="row h-100 justify-content-center align-items-center">
          <img src={logo}
            width='60'
            height='50'
            alt='signup' />
        </div>
        <div>
          <Nav.Link onClick={moveHome}>
            <h1>SelfTest</h1>
          </Nav.Link>
        </div>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2 " />
          <Button variant="info">
            <FontAwesomeIcon icon={faSearch} className="ml-auto" />
          </Button>
        </Form>
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto" navbar>
            
              <div className="d-flex align-items-center" style ={{backgroundColor:"white"}} >
                <div className = "mr-2">
                  User Point  
                </div>
                <div className = "mr-2">
                <Badge pill style={{ height:"2.3rem"}}variant="danger">
                  <div style={{fontSize: "1.3rem"}}>
                    {userPoint}P
                  </div>
                </Badge>
                </div>
                
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    <FontAwesomeIcon icon={faUser} className="ml-auto" />
                  My Profile
                 </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">
                      <FontAwesomeIcon icon={faUserGraduate} className="ml-auto" />
                My Activity</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      <FontAwesomeIcon icon={faUserCog} className="ml-auto" />
                Settings</Dropdown.Item>
                    <Dropdown.Item href="#/action-3" onClick={signOut}>
                      <FontAwesomeIcon icon={faSignOutAlt} className="ml-auto" />
                Sign Out</Dropdown.Item>
  
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
      )}
  }
    
 
  return (
    <div>
        {check()}
      <div className="row title" style={{ marginBottom: "10px" }} >
        <div className="col-sm-12 btn btn-warning">
        </div>
      </div>
    </div>
  );
}

export default NavBar;
