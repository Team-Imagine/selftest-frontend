import React from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import CardDeck from 'react-bootstrap/CardDeck';
import { Button } from "react-bootstrap";
import Badge from 'react-bootstrap/Badge'

class Content extends React.Component {
  render() {
    return (
      <Container
        fluid
        className={classNames("content", { "is-open": this.props.isOpen })}
      >
      
        
        <div style={{height:"3.2rem", paddingTop:"10px"}}>
          <h4 style={{fontWeight:"bolder"}}>
           인기 과목  <Badge variant="warning">HOT</Badge>
          </h4>
        </div>
        <hr/>
        
        <CardDeck>
          
          <Card border = 'dark' style={{width: '18rem'}}>
            <Card.Header>
             <Card.Img variant="top" src=""/>
            </Card.Header>

            <Card.Body>
              <Card.Title>컴퓨터공학
              
              </Card.Title>
              <Card.Text>
                컴퓨터구조, 인공지능, 영상처리, 컴퓨터그래픽스
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="info">공부하러가기</Button>
            </Card.Footer>
          </Card>

          <Card border = 'dark' style={{width: '18rem'}}>
            <Card.Header>
            <Card.Img variant="top" src="" />
            </Card.Header>
            
            <Card.Body>
              <Card.Title>교양</Card.Title>
              <Card.Text>
                글쓰기, 한국사, 중국어, 영어
              </Card.Text>
            </Card.Body>
            <Card.Footer>
            <Button variant="info">공부하러가기</Button>
            </Card.Footer>
          </Card>

          <Card border = 'dark' style={{width: '18rem'}}>
            <Card.Header>
            <Card.Img variant="top" src=""/>
            </Card.Header>


            <Card.Body>
              <Card.Title>유아교육과</Card.Title>
              <Card.Text>
                유아교육론, 유아놀이지도, 영유아발달
              </Card.Text>
            </Card.Body>
            <Card.Footer>
            <Button variant="info">공부하러하기</Button>
            </Card.Footer>
          </Card>
        </CardDeck>
        <br />
        <CardDeck>
          
          <Card border = 'dark' style={{width: '18rem'}}>
            <Card.Header>
             <Card.Img variant="top" src=""/>
            </Card.Header>

            <Card.Body>
              <Card.Title>기계공학과
              
              </Card.Title>
              <Card.Text>
                 열역학, 동역학, 고체역학
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="info">공부하러가기</Button>
            </Card.Footer>
          </Card>

          <Card border = 'dark' style={{width: '18rem'}}>
            <Card.Header>
            <Card.Img variant="top" src="" />
            </Card.Header>
            
            <Card.Body>
              <Card.Title>경영학과</Card.Title>
              <Card.Text>
                재무관리, 투자론, 국제경영학
              </Card.Text>
            </Card.Body>
            <Card.Footer>
            <Button variant="info">공부하러가기</Button>
            </Card.Footer>
          </Card>
        </CardDeck>
      </Container>
    );
  }
}

export default Content;
