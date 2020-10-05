import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faQuestion,
  faTimes,faBookmark, faTrophy, faBook, faChartBar
} from "@fortawesome/free-solid-svg-icons";
import SubMenu from "./SubMenu";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";


class SideBar extends React.Component {
  render() {
    return (
      <div className={classNames("sidebar", { "is-open": this.props.isOpen })}>
        <div className="sidebar-header">
          <Button
            variant="link"
            onClick={this.props.toggle}
            style={{ color: "#fff" }}
            className="mt-4"
          >
            <FontAwesomeIcon icon={faTimes} pull="right" size="xs" />
          </Button>
          <h3>SelfTest</h3>
        </div>

        <Nav className="flex-column pt-2">
          <p className="ml-3">Menu</p>

          <Nav.Item className="active">
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Home
            </Nav.Link>
          </Nav.Item>

          <Nav.Item className="/">
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faQuestion} className="mr-2" />
              Questions
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faBookmark} className="mr-2" />
              Favorites
            </Nav.Link>
          </Nav.Item>
        

          <Nav.Item>
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faChartBar} className="mr-2" />
              Progress
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faTrophy} className="mr-2" />
              Rank
            </Nav.Link>
          </Nav.Item>

          <SubMenu
            title="Subjects"
            icon={faBook}
            items={["수학", "컴퓨터공학", "과학", "교양"]}
            
          />
          <Nav.Item>
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faQuestion} className="mr-2" />
              FAQ
            </Nav.Link>
          </Nav.Item>


         
          
        </Nav>
      </div>
    );
  }
}

export default SideBar;
