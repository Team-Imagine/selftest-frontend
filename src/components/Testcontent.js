import React from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";



class Testcontent extends React.Component {
  render() {
    return (
      <Container
        fluid
        className={classNames("content", { "is-open": this.props.isOpen })}
      >
        <div>
          <h1>
          Test Page
          </h1>
            </div>

      </Container>
    );
  }
}

export default Testcontent;
