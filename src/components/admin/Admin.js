import React from "react";
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

import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";

import AdminPage from "./AdminPage";
import NavBar from "../content/Navbar";
import AdminSideBar from "./AdminSideBar";
import AdminQuestion from "./AdminQuestion";

class Admin extends React.Component {

	constructor(props) {
		super(props);

		// Moblie first
		this.state = {
			isOpen: false,
			isMobile: true
		};

		this.previousWidth = -1;
	}

	updateWidth() {
		const width = window.innerWidth;
		const widthLimit = 576;
		const isMobile = width <= widthLimit;
		const wasMobile = this.previousWidth <= widthLimit;

		if (isMobile !== wasMobile) {
			this.setState({
				isOpen: !isMobile
			});
		}

		this.previousWidth = width;
	}

	/**
	 * Add event listener
	 */
	componentDidMount() {
		this.updateWidth();
		window.addEventListener("resize", this.updateWidth.bind(this));
	}

	/**
	 * Remove event listener
	 */
	componentWillUnmount() {
		window.removeEventListener("resize", this.updateWidth.bind(this));
	}

	toggle = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	render() {
		if (this.props.match.params.question_id) {
			return (
				<div>
					<NavBar toggle={this.toggle} isOpen={this.state.isOpen} />
					<div className="App wrapper">
						<AdminQuestion toggle={this.toggle} isOpen={this.state.isOpen} question_id={this.props.match.params.question_id} />
					</div>
				</div>

			);
		} else {
			return (
				<div>
					<NavBar toggle={this.toggle} isOpen={this.state.isOpen} />
					<div className="App wrapper">
						<AdminPage toggle={this.toggle} isOpen={this.state.isOpen} />
					</div>
				</div>

			);
		}
	}
}

export default Admin;