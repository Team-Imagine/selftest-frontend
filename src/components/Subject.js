import React from "react";
import SideBar from "./sidebar/SideBar";
import Subjectcontent from "./Subjectcontent";
import Course from "./Course";
import Question from "./Question";
import Questioncontent from "./Questioncontent";
import MakeQuestion from "./MakeQuestion";
import NavBar from "./content/Navbar";

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
    if (this.props.match.params.subject) {
      if (this.props.match.params.course) {
        if(this.props.match.params.make_question) {
          return (
            <div>
            <NavBar toggle={this.toggle} isOpen={this.state.isOpen} />
            <div className="App wrapper">
            <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
            <MakeQuestion
              toggle={this.toggle}
              subject={this.props.match.params.subject}
              course={this.props.match.params.course}
              isOpen={this.state.isOpen} />
          </div>
          </div>
          )
        }
        if (this.props.match.params.question_id) {
          return (
            <div>
            <NavBar toggle={this.toggle} isOpen={this.state.isOpen} />
            <div className="App wrapper">
              <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
              <Questioncontent
                toggle={this.toggle}
                subject={this.props.match.params.subject}
                course={this.props.match.params.course}
                question_id={this.props.match.params.question_id}
                isOpen={this.state.isOpen} />
            </div>
            </div>
          )
        } else {
          return (
            <div>
            <NavBar toggle={this.toggle} isOpen={this.state.isOpen} />
            <div className="App wrapper">
              <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
              <Question
                toggle={this.toggle}
                subject={this.props.match.params.subject}
                course={this.props.match.params.course}
                isOpen={this.state.isOpen} />
            </div>
            </div>
          );
        }
      } else {
        return (
          <div>
          <NavBar toggle={this.toggle} isOpen={this.state.isOpen} />
          <div className="App wrapper">
            <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
            <Course toggle={this.toggle} subject={this.props.match.params.subject} isOpen={this.state.isOpen} />
          </div>
          </div>
        );
      }
    } else {
      return (
        <div>
        <NavBar toggle={this.toggle} isOpen={this.state.isOpen} />
        <div className="App wrapper">
          <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
          <Subjectcontent toggle={this.toggle} isOpen={this.state.isOpen} />
        </div>
        </div>
      );
    }

  }
}

export default Subject;