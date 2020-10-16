import React from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";


class Memberscontent extends React.Component {
  render() {
    return (
      <Container
        fluid
        className={classNames("content", { "is-open": this.props.isOpen })}
      >
       <h3>
           Members Page
       </h3>
        
      
 
      </Container>
    );
  }
}

export default Memberscontent;
