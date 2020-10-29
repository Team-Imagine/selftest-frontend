import React from "react";
import SideBar from "./sidebar/SideBar";
import Subjectcontent from "./Subjectcontent";
import Course from "./Course";
import Question from "./Question";

class Subject extends React.Component {

  constructor(props) {
    super(props);

    // Moblie first
    this.state = {
      isOpen: false,
      isMobile: true,
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
    console.log("props:", this.props.location.subject);
    if (this.props.location.subject) {
      if(this.props.location.course) {
        return (

          <div className="App wrapper">
            <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
            <Question toggle={this.toggle} subject={this.props.location.subject} course={this.props.location.course} isOpen={this.state.isOpen}/>
          </div>
        );
      } else {
      return (

        <div className="App wrapper">
          <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
          <Course toggle={this.toggle} subject={this.props.location.subject} isOpen={this.state.isOpen}/>
        </div>
      );
      }
    } else {
      return (
        <div className="App wrapper">
          <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
          <Subjectcontent toggle={this.toggle} isOpen={this.state.isOpen} />
        </div>
      );
    }

  }
}

export default Subject;