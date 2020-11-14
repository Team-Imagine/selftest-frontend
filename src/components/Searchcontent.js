import React from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";



class Searchcontent extends React.Component {
  render() {
    return (
      <Container
        fluid
        className={classNames("content", { "is-open": this.props.isOpen })}
      >
        <div>
          <h4>
          Search Page
          </h4>
         </div>
         <hr/>

      </Container>
    );
  }
}

export default Searchcontent;
