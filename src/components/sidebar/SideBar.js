import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faQuestion,
  faTimes,faBookmark, faCog, faCheck, faTrophy
} from "@fortawesome/free-solid-svg-icons";

import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
 
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
 
  render() {
    return (
      <div className={classNames("sidebar", { "is-open": this.props.isOpen })}>
        <br/>
      <div className="sidebar-header">
          <Button
            variant="link"
            onClick={this.props.toggle}
            style={{ color: "#fff" }}
            className="mt-4"
          >
    
            <FontAwesomeIcon icon={faTimes} pull="right" size="xs" />
          </Button>
        </div>
      

        <Nav className="flex-column pt-2">
          <p className="ml-3">Menu</p>

          <Nav.Item className="/">
            <Nav.Link href="home" to="/home">
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="question"to ="/question">
              <FontAwesomeIcon icon={faQuestion} className="mr-2" />
              Question
            </Nav.Link>
            </Nav.Item>

            <Nav.Item>
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faBookmark} className="mr-2" />
              Bookmarks
            </Nav.Link>
            </Nav.Item>
         <Nav.Item>
            <Nav.Link href="settings"to="/settings">
              <FontAwesomeIcon icon={faCog} className="mr-2" />
              Settings</Nav.Link>
            </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faCheck} className="mr-2" />
              Test
            </Nav.Link>
          </Nav.Item>

        
          <Nav.Item>
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faTrophy} className="mr-2" />
              Ranks
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      
    );
  }
}

export default SideBar;
