import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft, faCogs, faKey, faSearch, faSignOutAlt, faUser, faUserCog, faUserGraduate, faUserPlus, faBell} from "@fortawesome/free-solid-svg-icons";
import { Navbar, Button, Nav } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import { Row, Col } from 'reactstrap';

class NavBar extends React.Component {
  render() {
    return (
      <Navbar
        bg="light"
        className="navbar shadow-sm p-3 mb-5 bg-white rounded"
        expand = "lg"
      >
        <Button variant="outline-info" onClick={this.props.toggle}>
          <FontAwesomeIcon icon={faAlignLeft} />
        </Button>

     
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        
        
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto" navbar>

      
      <fieldset>
        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="Subject"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
            />
            <Form.Check
              type="radio"
              label="Category"
              name="formHorizontalRadios"
              id="formHorizontalRadios2"
            />
          
          </Col>
        </Form.Group>
      </fieldset>

          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="info">
            <FontAwesomeIcon icon={faSearch} className="ml-auto" />
            </Button>
          </Form>
          <div class="d-flex align-items-center">
            <Nav.Link href="settings"to="/settings">
              <FontAwesomeIcon icon={faCogs} className="ml-auto" />
              Settings</Nav.Link>

            <Nav.Link href="login" to="/login">
              <FontAwesomeIcon icon={faKey} className="ml-auto" />
              Login</Nav.Link>

            <Nav.Link href="signup" to="/signup">
              <FontAwesomeIcon icon={faUserPlus} className="ml-auto" />
              Signup</Nav.Link>

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
    );
  }
}

export default NavBar;
