import React from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";

class Rankcontent extends React.Component {
  render() {
    return (
      <Container
        fluid
        className={classNames("content", { "is-open": this.props.isOpen })}
      >
        <div>
          <h1>
          Rank Page
          </h1>
        </div>

      </Container>
    );
  }
}

export default Rankcontent;
