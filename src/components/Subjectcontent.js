import React, {useState, useEffect } from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import Alert from 'react-bootstrap/Alert'
import axios from "axios";

const Subjectcontent = ({isOpen}) => {

  const [subject, setSubject] = useState([]);

  useEffect(() => {
    axios.get('/api/subject/')
      .then(res => {
        console.log(res.data);
        setSubject(res.data.subjects);
        //console.log(subject);
      })
  }, []);

  return (
    <Container
      fluid
      className={classNames("content", { "is-open": {isOpen} })}
    >
      <div>
        <h2>
          Subjects
        </h2>
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
      </div>
      

    </Container>
  );
}

export default Subjectcontent;
