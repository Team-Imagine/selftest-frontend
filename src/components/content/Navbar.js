import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSignOutAlt, faUser, faUserCog, faUserGraduate, faBell} from "@fortawesome/free-solid-svg-icons";
import { Navbar, Button, Nav } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import logo from "../../picture/icon.png";

class NavBar extends React.Component {
  render() {
    return (
      <div>
      <Navbar
        bg="light"
        className="navbar shadow-sm p-3 bg-white rounded"
        expand = "lg"
      >
        <div className = "row h-100 justify-content-center align-items-center">
                    <img src = {logo}
                    width = '60'
                    height = '50'
                    alt='signup'/>
                </div>
        <div>
            <Nav.Link href="home"to="/home">
            <h1>SelfTest</h1>
            </Nav.Link>
          </div>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2 " />
            <Button variant="info">
            <FontAwesomeIcon icon={faSearch} className="ml-auto" />
            </Button>
          </Form>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto" navbar>
          
          <div className="d-flex align-items-center">


            <Dropdown>
              <Dropdown.Toggle href= "login" to ="/login" variant="light" id="dropdown-basic">
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
              <Dropdown.Item href="#/action-3">
              <FontAwesomeIcon icon={faSignOutAlt} className="ml-auto" />
              SignOut</Dropdown.Item>
            
              </Dropdown.Menu>
            </Dropdown>
            

            <Nav.Link href="#">
            <FontAwesomeIcon icon={faBell} className="ml-auto" style />
            </Nav.Link>
            </div>
          </Nav>
          
        </Navbar.Collapse>
        
        
      </Navbar>
      <div className="row title" style={{ marginBottom: "10px" }} >      
        <div className="col-sm-12 btn btn-warning">  
      </div>
      </div>
      </div>
    );
  }
}

export default NavBar;
