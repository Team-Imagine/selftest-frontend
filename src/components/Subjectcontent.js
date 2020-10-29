import React, {useState, useEffect } from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Card from "react-bootstrap/Card";

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
        <h1>
          Subject Page
        </h1>
        <ul>
        
        {subject.map((i) => 
       <div className="container h-100">
       <div className="row h-100 justify-content-center align-items-center">
        <Card border="info" style={{ width: '18rem' }}
        >
          <br/>
            <Link key={i.title} to={{
              pathname: `/subject/${i.title}`
              }}>
              <div className = "justify-content-center align-items-center">
              {i.title} 
              </div>
              <br/>
            </Link>
        </Card> 
        <br/>
        </div>
        <br/>
        </div>
          )}
        
      </ul>
      </div>
      

    </Container>
  );
}

export default Subjectcontent;
