import React from "react";

import NavBar from "./content/Navbar";

import UserSettings from "./UserSettingscontent";

class Activity extends React.Component {
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
        isOpen: !isMobile,
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
        <NavBar toggle={this.toggle} isOpen={this.state.isOpen} />
        <div className="App wrapper">
          <UserSettings toggle={this.toggle} isOpen={this.state.isOpen}/>
        </div>
      </div>
    );
  }
}

export default Activity;
