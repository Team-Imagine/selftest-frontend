import React from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";



class Bookmarkscontent extends React.Component {
  render() {
    return (
      <Container
        fluid
        className={classNames("content", { "is-open": this.props.isOpen })}
      >
       <h4>
           Bookmarks Page
       </h4>
        
      
 
      </Container>
    );
  }
}

export default Bookmarkscontent;
