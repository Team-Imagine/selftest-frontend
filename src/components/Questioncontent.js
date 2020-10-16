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
          <h1>
          Question Page
          </h1>
        </div>

      </Container>
    );
  }
}

export default Questioncontent;
