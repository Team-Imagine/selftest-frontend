import React from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";



class Settingscontent extends React.Component {
  render() {
    return (
      <Container
        fluid
        className={classNames("content", { "is-open": this.props.isOpen })}
      >
        <div>
          <h3>
          Settings Page
          </h3>
         </div>
         <hr/>

      </Container>
    );
  }
}

export default Settingscontent;
