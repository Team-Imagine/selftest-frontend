import React from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";

class Questioncontent extends React.Component {
  render() {
    return (
      <Container
        fluid
        className={classNames("content", { "is-open": this.props.isOpen })}
      >
        <div>
          <h4>
          This is Question Page!!! Decorate it!
          </h4>
        </div>
      
      </Container>
    );
  }
}

export default Questioncontent;
