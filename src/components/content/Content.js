import React from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import { Button } from "react-bootstrap";
import image1 from "../../picture/1.png"
import image2 from "../../picture/2.png"
import { useHistory } from "react-router-dom";
import SideBarSmall from '../sidebar/SideBarSmall';

import './Content.css';

const Content =({isOpen, toggle}) => {
  
let history = useHistory();

const moveSubject = () => {
  history.push("/subject");
};
const moveRank = () => {
  history.push("/rank");
};

    return (
      <Container
      fluid
      id="jb-container"
    >
        <SideBarSmall toggle={toggle} isOpen={!isOpen} />
        <CardDeck>
          <Card border="dark" style={{ width: "18rem !important" }}>
            <Card.Body>
            <Card.Img variant="top" src={image1} />
            </Card.Body>
            <Card.Footer>
            <Button onClick={moveSubject} variant="info" style={{width:"100%"}}>
              문제 풀러가기

              </Button>
            </Card.Footer>
          </Card>

          <Card border="dark" style={{ width: "18rem !important" }}>
          <Card.Body>
          <Card.Img variant="top" src={image2} />
          </Card.Body>
         <Card.Footer> 
           <Button onClick={moveRank} variant="info" style={{width:"100%"}}>
             순위 보러가기
              </Button>
              
            </Card.Footer>
          </Card>

          
        </CardDeck>
      </Container>
    );

}

export default Content;
