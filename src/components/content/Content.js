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
      

        <div>
          <h3 style={{fontWeight:"bolder"}}>
           인기 과목  <Badge variant="warning">HOT</Badge>
          </h3>
        </div>
        <hr/>
        
        <CardDeck>
          
          <Card border = 'dark' style={{width: '18rem'}}>
            <Card.Header>
             <Card.Img variant="top" src=""/>
            </Card.Header>

            <Card.Body>
              <Card.Title>수학
              
              </Card.Title>
              <Card.Text>
                미분, 적분, 기하와 벡터
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
              <Card.Title>컴퓨터공학</Card.Title>
              <Card.Text>
                Java, C, C++, C#, Python, html
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
              <Card.Title>영어</Card.Title>
              <Card.Text>
                읽기, 듣기, 쓰기, 말하기
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
              <Card.Title>과학
              
              </Card.Title>
              <Card.Text>
                 물리, 화학, 생물, 실험
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
              <Card.Title>무역</Card.Title>
              <Card.Text>
                경제학, 회계학, 경영학
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
