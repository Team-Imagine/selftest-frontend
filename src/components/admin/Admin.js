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
import AdminNavbar from "./AdminNavbar";
import AdminSideBar from "./AdminSideBar";
import AdminQuestion from "./AdminQuestion";
import AdminOpened from "./AdminOpened";

class Admin extends React.Component {

	constructor(props) {
		super(props);

		// Moblie first
		this.state = {
			isOpen: false,
			isMobile: true,
			blocked: true,
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

	selectType = (type, e) => {
		e.preventDefault();

		if (type === 'blocked') {
			this.setState({
				blocked: true
			})
		} else {
			this.setState({
				blocked: false
			})
		}
	}

	render() {

		if (this.props.match.params.question_id) {
			return (
				<div>
					<AdminNavbar toggle={this.toggle} isOpen={this.state.isOpen} />
					<div className="App wrapper">
						<AdminQuestion toggle={this.toggle} isOpen={this.state.isOpen} question_id={this.props.match.params.question_id} />
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<AdminNavbar toggle={this.toggle} isOpen={this.state.isOpen} />
					<div className="App wrapper">
						<div style={{width: '10%', }} className="row h-100 justify-content-center align-items-center">
							<br /><br /><br />
							<Button
								variant="secondary"
								style={{width: '100%'}}
								onClick={(e) => { this.selectType('blocked', e) }}
							>Blocked
							</Button>
							<br />
							<Button
								variant="secondary"
								style={{width: '100%'}}
								onClick={(e) => { this.selectType('opened', e) }}
							>Opened
							</Button>
						</div>
						<div style={{width: '90%'}}>
						{this.state.blocked ?
							<AdminPage toggle={this.toggle} isOpen={this.state.isOpen} />
							: <AdminOpened toggle={this.toggle} isOpen={this.state.isOpen} />
						}
						</div>
					</div>
				</div>

			);
		}
	}
}

export default Admin;