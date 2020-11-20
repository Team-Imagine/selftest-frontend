import React from "react";
import SideBar from "./sidebar/SideBar";
import Searchcontent from "./Searchcontent";
import NavBar from "./content/Navbar";
import querysString from "query-string";
class Search extends React.Component {
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
    const searchtype = this.props.match.params.searchtype;
    const keywordtype = this.props.match.params.keywordtype;
    const keyword = this.props.match.params.keyword;
    return (
      <div>
        <NavBar toggle={this.toggle} isOpen={this.state.isOpen} />
        <div className="App wrapper">
          <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
          <Searchcontent
            toggle={this.toggle}
            isOpen={this.state.isOpen}
            searchtype={searchtype}
            keywordtype={keywordtype}
            keyword={keyword}
          />
        </div>
      </div>
    );
  }
}

export default Search;
