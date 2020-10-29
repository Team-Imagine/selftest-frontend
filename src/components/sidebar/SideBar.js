import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome, faTimes, faBookmark, faCog, faCheck, faTrophy, faBook
} from "@fortawesome/free-solid-svg-icons";

import { useHistory } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";

const SideBar = ({ toggle, isOpen }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [type, setType] = useState(0);

  const onSetSidebarOpen = (open) => {
    setSidebarOpen(open);
  }

  let history = useHistory();

  const moveHome = () => {
      history.push("/home");
  }

  const moveSubject = () => {
    history.push("/subject");
  }

  const moveBookmarks = () => {
    history.push("/bookmarks");
  }

  const moveTest = () => {
    history.push("/test");
  }

  const moveMembers = () => {
    history.push("/members");
  }

  const moveSettings = () => {
    history.push("/settings");
  }

  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <br />
      <div className="sidebar-header">
        <Button
          variant="link"
          onClick={toggle}
          style={{ color: "#fff" }}
          className="mt-4"
        >

          <FontAwesomeIcon icon={faTimes} pull="right" size="xs" />
        </Button>
      </div>
      <Nav className="flex-column pt-2">
        <p className="ml-3">Menu</p>

        <Nav.Item className="/">

          <Nav.Link onClick={moveHome}>
            <FontAwesomeIcon icon={faHome} className="mr-2" />
              Home
            </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={moveSubject}>
            <FontAwesomeIcon icon={faBook} className="mr-2" />
              Subjects
            </Nav.Link>

        </Nav.Item>

        <Nav.Item>
          <Nav.Link onClick={moveBookmarks}>
            <FontAwesomeIcon icon={faBookmark} className="mr-2" />
              Bookmarks
            </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link onClick={moveTest}>
            <FontAwesomeIcon icon={faCheck} className="mr-2" />
              Test
            </Nav.Link>
        </Nav.Item>


        <Nav.Item>
          <Nav.Link onClick={moveMembers}>
            <FontAwesomeIcon icon={faTrophy} className="mr-2" />
              Ranks
            </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link onClick={moveSettings}>
            <FontAwesomeIcon icon={faCog} className="mr-2" />
              Settings</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>

  );
}

export default SideBar;
