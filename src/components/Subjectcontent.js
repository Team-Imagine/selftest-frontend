import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Container, Accordion, Button, InputGroup } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import Alert from 'react-bootstrap/Alert'
import axios from "axios";
import store from "../store";
import { propTypes } from "react-bootstrap/esm/Image";
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'


const Subjectcontent = ({ isOpen }) => {

  const [subject, setSubject] = useState([]);
  const [title, setTitle] = useState('');
  const [state, setState] = useState(0);
  let history = useHistory();


  useEffect(() => {
    axios.get('/api/subject/')
      .then(res => {
        console.log(res.data);
        setSubject(res.data.subjects);
      })
      .catch(error => {
				alert(error.response.data.message);
			})
  }, [state]);

  const onChange = (e) => {
    setTitle(e.target.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();

    console.log(title.length);

    if (title.length) {
      if (store.getState().isLoggedIn) {
        axios.post('/api/subject', { title })
          .then(res => {
            setTitle('');
            setState(1);
            alert(res.data.message);
          })
          .catch(error => {
            setTitle('');
            alert(error.response.data.message);
        });
      } else {
        setTitle('');
        alert('로그인이 필요한 기능입니다.');
        history.push("/login");
      }
    } else {
      alert('한 글자 이상 입력하세요.');
    }
  }

  return (
    <Container
      fluid
      className={classNames("content", { "is-open": { isOpen } })}
    >

      <div className="d-flex bd-highlight mb-3">
        <div className="mr-auto p-2 bd-highlight">
          <h4 style={{ fontWeight: "bolder" }}>
            과목
        </h4>
        </div>
        <div className="p-2 bd-highlight">

          <Accordion >
            <Card border="info" style={{ width: '19rem' }}>
              <Accordion.Toggle as={Button} variant="info" block eventKey="0">
                과목 추가
				</Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body style={{ backgroundColor: "white" }} >
                  <div>

                    <FormControl blocktype="text" id="title" className="mr-sm-2"
                      value={title}
                      placeholder="추가할 과목 이름을 입력하세요."
                      fontSize="20"
                      style={{ width: "17rem" }}
                      onChange={onChange} />
                    <Button variant="light" block style={{ width: '17rem' }}
                      onClick={submitHandler}
                    >과목 등록</Button>

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

                <Link to={{
                  pathname: `/subject/${i.title}`
                }}>
                  <div style={{ fontSize: 18 }}>
                    {i.title}
                  </div>

                </Link>
              </Alert>
              <br />
            </div>
          </div>
        )}
      </ul>
    </Container>
  );
}

export default Subjectcontent;
