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

import AdminBlocked from "./AdminBlocked";
import AdminNavbar from "./AdminNavbar";
import AdminSideBar from "./AdminSideBar";
import AdminQuestion from "./AdminQuestion";
import AdminOpened from "./AdminOpened";
import AdminSubject from "./AdminSubject";
import AdminCourse from "./AdminCourse";

class Admin extends React.Component {

	constructor(props) {
		super(props);

		// Moblie first
		this.state = {
			isOpen: false,
			isMobile: true,
			type: 'blocked',
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

		this.setState({
			type: type,
		})
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
						<div>

							<div style={{paddingLeft:"1.2rem", paddingTop:"1.2rem", width:"10rem"}}>
							<Button
								variant="secondary"
								style={{width: '100%'}}
								onClick={(e) => { this.selectType('blocked', e) }}
							>비공개
							</Button>
							<br /><br/>
							<Button
								variant="secondary"
								style={{width: '100%'}}
								onClick={(e) => { this.selectType('opened', e) }}
							>공개
							</Button>
							<br /><br/>
							<Button
								variant="secondary"
								style={{width: '100%'}}
								onClick={(e) => { this.selectType('subject', e) }}
							>과목
							</Button>
							<br /><br/>
							<Button
								variant="secondary"
								style={{width: '100%'}}
								onClick={(e) => { this.selectType('course', e) }}
							>강의
							</Button>
							</div>
						</div>
						<div style={{width: '90%'}}>
						{(this.state.type === 'blocked') ?
							<AdminBlocked toggle={this.toggle} isOpen={this.state.isOpen} />
							: (this.state.type === 'opened') ? <AdminOpened toggle={this.toggle} isOpen={this.state.isOpen} />
							: (this.state.type === 'subject') ? <AdminSubject toggle={this.toggle} isOpen={this.state.isOpen} />
							: <AdminCourse toggle={this.toggle} isOpen={this.state.isOpen} />
						}
						</div>
					</div>
				</div>

			);
		}
	}
}

export default Admin;