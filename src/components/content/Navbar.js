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

 
  const readCookie = async () => {
    if(cookies.access_token) {  // 쿠키에 access_token이 존재하면 로그인 상태 유지
      store.dispatch({type:'LOGIN', value: 1})
      
       await axios.get(`/api/user`)
        .then((res) => {
          
          store.dispatch({type:'VERIFIED', value: res.data.user.verified})
          store.dispatch({type:'POINT', value: res.data.user.point}) 
          setUserPoint(store.getState().point);
          
          //console.log('test1:', store.getState().verified);
          if(store.getState().isLoggedIn && !store.getState().verified) {
            
            axios.post(`/api/auth/send-verification-email`)
              .then((res) => {
                console.log(res.data);
                alert('인증이 필요합니다.');
                history.push("/auth");
              })
          } 
        })
        .catch(error => {
          alert(error.response.data.message);
        })
    
    }
  }
  /*
  useEffect(() => {
    if(cookies.access_token && store.getState().verified) {
      axios.get(`/api/user/`)
      .then((res) => {
        //console.log(res.data.user.point);
        setUserPoint(res.data.user.point);
      })
      .catch(error => {
				alert(error.response.data.message);
			})
    }
  }, [point]);
  */
  /*
  useEffect(() => {
    if(cookies.access_token && store.getState().verified) {
      axios.get(`/api/user/`)
      .then((res) => {
        console.log(res.data.user.point);
        setUserPoint(res.data.user.point);
      })
    }
  }, [point]);
  */
  const signOut = async () => {
    await axios.post(`/api/auth/logout`)
      .then((res) => {
        console.log(res.data);
        
        cookies.access_token = null;

        store.dispatch({type:'LOGIN', value: 0});
        store.dispatch({type:'VERIFIED', value: 0});
      
        alert('로그아웃 되었습니다.');

        moveHome();
      })
      .catch(error => {
				alert(error.response.data.message);
			})
  }

  useEffect(() => {
    readCookie();

  }, [test]);

  const check = () => {
    if(!cookies.access_token) {
      return (
        <Navbar
        bg="light"
        className="navbar shadow-sm p-3 bg-white rounded"
        expand="lg"
      >
        <div className="row h-100 justify-content-center align-items-center">
          <img style={{paddingLeft:"10px", paddingRight:"10px", paddingBottom:"10px"}}src={logo}
            width='80'
            height='60'
            alt='signup' />
        </div>
        <div>
          <Nav.Link onClick={moveHome}>
            <div><h1 style={{fontWeight:"bolder"}}>SelfTest</h1></div>
            
          </Nav.Link>
        </div>
        <Form inline>
          <FormControl type="text" placeholder="검색하기" className="mr-sm-2 " />
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
                  로그인
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
            <h1 style={{paddingTop:"0.5rem"}}>SelfTest</h1>
          </Nav.Link>
        </div>
        <Form inline>
          <FormControl type="text" placeholder="검색하기" className="mr-sm-2 " />
          <Button variant="info">
            <FontAwesomeIcon icon={faSearch} className="ml-auto" />
          </Button>
        </Form>
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto" navbar>
            
              <div className="d-flex align-items-center" style ={{backgroundColor:"white"}} >
                <div className = "mr-2">
                  보유 포인트  
                </div>
                <div className = "mr-2">
                <Badge pill style={{ height:"2.3rem", paddingTop:"0.6rem"}}variant="danger">
                  <div style={{fontSize: "1.3rem"}}>
                    {userPoint}P
                  </div>
                </Badge>
                </div>
                
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    <FontAwesomeIcon icon={faUser} className="ml-auto" />
                  내 프로필
                 </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">
                      <FontAwesomeIcon icon={faUserGraduate} className="ml-auto" />
                내 활동 </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      <FontAwesomeIcon icon={faUserCog} className="ml-auto" />
                내 설정</Dropdown.Item>
                    <Dropdown.Item href="#/action-3" onClick={signOut}>
                      <FontAwesomeIcon icon={faSignOutAlt} className="ml-auto" />
                로그아웃</Dropdown.Item>
  
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
        <Navbar
        bg="warning"
        className="navbar shadow-sm p-1.5 bg-yellow rounded"
      >
        </Navbar>

    </div>
  );
}

export default NavBar;
