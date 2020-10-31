import React, {useState, useEffect } from "react";
import classNames from "classnames";
import { Container, Accordion, Button } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import Alert from 'react-bootstrap/Alert'
import axios from "axios";
import store from "../store";
import { propTypes } from "react-bootstrap/esm/Image";
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'


const Subjectcontent = ({isOpen}) => {

  const [subject, setSubject] = useState([]);
  const [title, setTitle] = useState('');
  const [state, setState] = useState(0);
  let history = useHistory();


  useEffect(() => {
    axios.get('/api/subject/')
      .then(res => {
        console.log(res.data);
        setSubject(res.data.subjects);
        //console.log(subject);
      })
  }, [state]);
  const onChange = (e) => {
		setTitle(e.target.value);
  }
  
  const submitHandler = (event) => {
    event.preventDefault();
    
    if(store.getState().isLoggedIn) {
    axios.post('/api/subject', {title})
      .then(res => {
        console.log(res.data);
        setTitle('');
        setState(1);
        alert("과목이 추가되었습니다!");
      })
    } else {
      setTitle('');
      alert('로그인이 필요한 기능입니다.');
      history.push("/login");
    }
  }

  return (
    <Container
      fluid
      className={classNames("content", { "is-open": {isOpen} })}
    >
      
        <div className = "d-flex bd-highlight mb-3">
        <div class="mr-auto p-2 bd-highlight">  
        <h4>
          Subjects
        </h4>
        </div>
        <div className = "p-2 bd-highlight">

				<Accordion >
				<Card border = "info" style = {{width: '25rem'}}>
				<Card.Header>
				<Accordion.Toggle  as={Button} variant="light" block eventKey="0">
					과목 추가
				</Accordion.Toggle>
				</Card.Header>
				<Accordion.Collapse eventKey="0">
				<Card.Body style={{ backgroundColor:"white"}} >
				<div>
          <Form inline>
          <FormControl type="text" id="title" className="mr-sm-2" value={title} placeholder="추가할 과목 이름을 입력하세요" fontSize="20" onChange={onChange}/>
          <Button variant = "info"
				  onClick={submitHandler}
			    >과목 등록</Button>
          </Form>
				</div>
				</Card.Body>
    		</Accordion.Collapse>		
				</Card>
				</Accordion>
     
        </div>
        </div>
       
        
        <hr />
        <ul>
        
        {subject.map((i) => 
       <div className="container h-100" key={i.title}>
       <div className="row h-100 justify-content-center align-items-center">
      
        <Alert className="text-center" variant="info" style={{ width: '25rem' }}
        >
          <br/>
            <Link to={{
              pathname: `/subject/${i.title}`
              }}>
              <div>
              {i.title} 
              </div>
              <br/>
            </Link>
        </Alert> 
        <br/>
        </div>
        </div>
          )}
      </ul>
    </Container>
  );
}

export default Subjectcontent;
