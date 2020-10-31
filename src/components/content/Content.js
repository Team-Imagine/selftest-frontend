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
          <h4>
           Popular Subjects  <Badge variant="danger">HOT</Badge>
          </h4>
        </div>
        <hr/>
        
        <CardDeck>
          
          <Card border = 'dark' style={{width: '18rem'}}>
            <Card.Header>
             <Card.Img variant="top" src=""/>
            </Card.Header>

            <Card.Body>
              <Card.Title>Mathematics
              
              </Card.Title>
              <Card.Text>
                Integration, Differentiation, Further Mathematics
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="info">Go Study</Button>
            </Card.Footer>
          </Card>

          <Card border = 'dark' style={{width: '18rem'}}>
            <Card.Header>
            <Card.Img variant="top" src="" />
            </Card.Header>
            
            <Card.Body>
              <Card.Title>Computer Engineering</Card.Title>
              <Card.Text>
                Java, C, C++, C#, Python, html
              </Card.Text>
            </Card.Body>
            <Card.Footer>
            <Button variant="info">Go Study</Button>
            </Card.Footer>
          </Card>

          <Card border = 'dark' style={{width: '18rem'}}>
            <Card.Header>
            <Card.Img variant="top" src=""/>
            </Card.Header>


            <Card.Body>
              <Card.Title>English</Card.Title>
              <Card.Text>
                Reading, Listening, Writing, Speaking
              </Card.Text>
            </Card.Body>
            <Card.Footer>
            <Button variant="info">Go Study</Button>
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
              <Card.Title>Science
              
              </Card.Title>
              <Card.Text>
                 Physics, Chemistry, Biology with Experiments
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="info">Go Study</Button>
            </Card.Footer>
          </Card>

          <Card border = 'dark' style={{width: '18rem'}}>
            <Card.Header>
            <Card.Img variant="top" src="" />
            </Card.Header>
            
            <Card.Body>
              <Card.Title>Commerce</Card.Title>
              <Card.Text>
                Economics, Accounting, Business
              </Card.Text>
            </Card.Body>
            <Card.Footer>
            <Button variant="info">Go Study</Button>
            </Card.Footer>
          </Card>
        </CardDeck>
      </Container>
    );
  }
}

export default Content;
