import React, {useState, useEffect } from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import { Link } from 'react-router-dom';

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

  const print = () => {
    console.log(subject);
  } 

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
            <Link key={i.title} to={{
              pathname: `/subject/${i.title}`,
              subject: i.title
              }}>
              {i.title}
              <br/>
            </Link>
          )}
    </ul>
      </div>

    </Container>
  );
}

export default Subjectcontent;
