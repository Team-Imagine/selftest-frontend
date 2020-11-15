import React from "react";
import SideBar from "./sidebar/SideBar";
import Searchcontent from "./Searchcontent";
import NavBar from "./content/Navbar";

class Search extends React.Component {
  
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
          const {params} = this.props.match;
          return (
            
            <div>
              <NavBar toggle={this.toggle} isOpen={this.state.isOpen}/>
            <div className="App wrapper">
              <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
              <Searchcontent toggle={this.toggle} isOpen={this.state.isOpen} params={params.keyword}/>
            </div>
            </div>
          
          );
        }
      }
      
      export default Search;