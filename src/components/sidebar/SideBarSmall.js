import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHome,
	faTimes,
	faBookmark,
	faCog,
	faCheck,
	faTrophy,
	faBook,
} from "@fortawesome/free-solid-svg-icons";

import { useHistory } from "react-router-dom";
import { Nav, Button, Navbar } from "react-bootstrap";
import classNames from "classnames";

const SideBarSmall = ({ toggle, isOpen }) => {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [type, setType] = useState(0);

	const onSetSidebarOpen = (open) => {
		setSidebarOpen(open);
	};

	let history = useHistory();

	const moveHome = () => {
		history.push("/home");
	};

	const moveSubject = () => {
		history.push("/subject");
	};

	const moveBookmarks = () => {
		history.push("/bookmarks");
	};

	const moveTest = () => {
		history.push("/test");
	};

	const moveMembers = () => {
		history.push("/members");
	};

	const moveSettings = () => {
		history.push("/settings");
	};

	return (
		<div>
			 <div
        className={classNames("smallsidebar", { "is-open": isOpen })}
        style={{ height: "auto" }}
      >
			{isOpen && <div>
				<Navbar
				height="auto"
					expand="lg"
				>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" className="row" />
					<Navbar.Collapse id="responsive-navbar-nav">
					
						<div className="row">
							<Nav.Item className="/">
								<Nav.Link onClick={moveHome}>
									<FontAwesomeIcon icon={faHome} className="mr-2" style={{color: 'black'}}/>
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link onClick={moveSubject}>
									<FontAwesomeIcon icon={faBook} className="mr-2" style={{color: 'black'}}/>

								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link onClick={moveBookmarks}>
									<FontAwesomeIcon icon={faBookmark} className="mr-2" style={{color: 'black'}}/>
								</Nav.Link>
							</Nav.Item>

							<Nav.Item>
								<Nav.Link onClick={moveTest}>
									<FontAwesomeIcon icon={faCheck} style={{color: 'black'}}/>

								</Nav.Link>
							</Nav.Item>

							<Nav.Item>
								<Nav.Link onClick={moveMembers}>
									<FontAwesomeIcon icon={faTrophy} className="mr-2" style={{color: 'black'}}/>

								</Nav.Link>
							</Nav.Item>
						</div>
					</Navbar.Collapse>
					
				</Navbar>
			</div>}
			</div>
			</div>
	);
};

export default SideBarSmall;
