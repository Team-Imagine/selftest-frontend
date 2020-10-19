import React from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";



class Subjectcontent extends React.Component {
  render() {
    return (
      <Container
        fluid
        className={classNames("content", { "is-open": this.props.isOpen })}
      >
        <div>
          <h1>
          Subject Page
          </h1>
        </div>

      </Container>
    );
  }
}

export default Subjectcontent;
