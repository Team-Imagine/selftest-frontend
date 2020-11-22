import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Container, Accordion, Button, InputGroup } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import Alert from 'react-bootstrap/Alert'
import axios from "axios";
import { propTypes } from "react-bootstrap/esm/Image";
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'



const Testcontent = ({isOpen}) => {
  const [tests, setTests] = useState([]);
  const [pages, setPages] = useState([]);

	let history = useHistory();
	
  useEffect(() => {
    axios.get('/api/testset/')
      .then(res => {
        console.log(res.data);
        setTests(res.data.test_sets.rows);
        
        let count = res.data.test_sets.count / 10 + 1;
				let t_pages = [];

				for(var i = 1; i <= count; i++) {
					t_pages.push(i);
				}
        setPages(t_pages);
      })
  }, []);

  const loadTestPerPage = (index, e) => {
		e.preventDefault();

		axios.get(`/api/testset/`, {
			params: {
				page: index,
			}
		})
			.then(res => {
				console.log(res.data);
				setTests(res.data.test_sets.rows);
			})
			.catch(error => {
				alert(error.response.data.message);
			})
	}

	const submitHandler = (event) => {
		event.preventDefault();
		
		history.push(`/test/make_test/${1}`);
	}

  return (
    <Container
      fluid
      className={classNames("content", { "is-open": isOpen })}
    >
      <div className="d-flex bd-highlight mb-3">
        <div className="mr-auto p-2 bd-highlight">
          <h4 style={{ fontWeight: "bolder" }}>
            시험
        </h4>
        </div>
        <div className="p-2 bd-highlight">
					{/*
          <div>
						<Button variant="info" style = {{width: '19rem', height: '2.5rem'}} onClick={submitHandler} href={`/test/make_test/${1}`}
						>시험 생성</Button>
					</div>
					*/}
        </div>
      </div>
      <hr />
			<ul>
        {tests.length ? tests.map((i) =>
					<div className="container h-100" key={i.title}>
						<div className="row h-100 justify-content-center align-items-center">
							<Alert className="text-center" variant="info" style={{ width:'30%', height:'10%' }}>
								<Link key={i.title} to={{
									pathname: `/test/${i.id}`,
								}}>
									<div style={{ fontSize: 18 }}>
										{i.title}
									</div>
								</Link>
							</Alert>
							<br />
						</div>
					</div>
				) : <div className="row justify-content-center align-items-center">등록된 Test가 없습니다. 새로운 Test를 등록해주세요.</div>}
      </ul>
	  <ul style={{position:"fixed", width:"90%", bottom:"0"}}
	  className="row justify-content-center align-items-center">
				{pages.map((i, index) =>
					<div key={index}>
						<button style={{ backgroundColor: '#ffffff', border: '1px solid', width: '1.5rem' }} onClick={(e) => loadTestPerPage(i, e)}>{i}</button>&nbsp;
						</div>)
				}
			</ul>
    </Container>
  );

}

export default Testcontent;