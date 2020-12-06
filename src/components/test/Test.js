import React from "react";
import SideBar from "../sidebar/SideBar";
import Testcontent from "./Testcontent";
import TestMaking from "./TestMaking";
import TestPage from "./TestPage";
import NavBar from "../content/Navbar";

class Test extends React.Component {

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
          const widthLimit = 700;
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
          if(this.props.match.params.make_test) {
            return (
              <div>
                <NavBar toggle={this.toggle} isOpen={this.state.isOpen} />
              <div className="App wrapper">
                <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
                <TestMaking toggle={this.toggle} isOpen={this.state.isOpen} />
              </div>
              </div>
            
            );
          } else if(this.props.match.params.test_id) {
            return (
              <div>
                <NavBar toggle={this.toggle} isOpen={this.state.isOpen} />
              <div className="App wrapper">
                <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
                <TestPage toggle={this.toggle} isOpen={this.state.isOpen} test_id={this.props.match.params.test_id} />
              </div>
              </div>
            );
          } else {
            return (
              <div>
                <NavBar toggle={this.toggle} isOpen={this.state.isOpen} />
              <div className="App wrapper">
                <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
                <Testcontent toggle={this.toggle} isOpen={this.state.isOpen} />
              </div>
              </div>
            
            );
          }
        }
      }
      
      export default Test;