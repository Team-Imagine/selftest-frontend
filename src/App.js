import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/content/Navbar";
import SideBar from "./components/sidebar/SideBar";
import Content from "./components/content/Content";

class App extends React.Component {
  
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
    return (
      <div>
        <NavBar toggle ={this.toggle} isOpen={this.state.isOpen} />
         <div className="App wrapper">
          <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
          <Content toggle={this.toggle} isOpen={this.state.isOpen}/>
        </div>
      </div>
     
      
    );
  }
}


export default App;
