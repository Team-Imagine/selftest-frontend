import React,{ useState, useEffect }from "react";
import { Container, Button, CardDeck } from "react-bootstrap";
import classNames from "classnames";
import { Link, useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import axios from "axios";


const Searchcontent = ({params, isOpen}) => {

  const[searchresults, setSearchresults] = useState([]);
	let history = useHistory();
	useEffect(() => {
    axios.get(`/api/question?question_type=essay&q_question_content=${params}`)
				.then(res=>{
          console.log(res.data);
					setSearchresults(res.data.questions.rows);
				}).catch(error => {
          alert(error.response.data.message);
        })
    }, []);	

  return (
		<Container
			fluid
			className={classNames("content", { "is-open": { isOpen } })}
		>
			<div>
					<div className = "d-flex bd-highlight mb-3">
        			<div className="mr-auto p-2 bd-highlight"> 
					<h4 style={{fontWeight:"bolder"}}>
						검색결과 - {params}
        			</h4>
					</div>
					
					</div>
				<hr/>
				<ul>
				<CardDeck>
					{searchresults.map((i) =>
					 <div className="container h-100" key={i.id}>
					 <div className="row h-100 justify-content-center align-items-center">
						
						 <Card className="text-center" variant="info" style={{ width: '30rem' }}>
						<Link key={i.id} 
						to={{
							pathname: `/subject/test/${i["course.title"]}/${i.id}`,
						}}>
							<Card.Header style={{height:"3.5rem"}}>
							<div className="d-flex bd-highlight mb-3">
							<div className="mr-auto p-2 bd-highlight">
              				#{i.id} test - {i["course.title"]}
							</div>
							</div>

							</Card.Header>
							<Card.Body><div style={{fontWeight:"lighter"}}>{i.title}
							</div>
							</Card.Body>
							{/*
							<Card.Footer>
							
							<div className="d-flex bd-highlight mb-3" style={{height:"0.8rem"}}>
							
							<div className="mr-auto p-2 bd-highlight">
							좋아요 &nbsp;
							<FontAwesomeIcon icon={faHeart} className="ml-auto" />&nbsp;
						  
							</div>
							<div className="mr-auto p-2 bd-highlight">
							신선해요 &nbsp;  
							<FontAwesomeIcon icon={faAppleAlt} className="ml-auto" />&nbsp;
							<FontAwesomeIcon icon={faAppleAlt} className="ml-auto" />&nbsp;
							<FontAwesomeIcon icon={faAppleAlt} className="ml-auto" />&nbsp;
							<FontAwesomeIcon icon={faAppleAlt} className="ml-auto" />&nbsp;
							<FontAwesomeIcon icon={faAppleAlt} className="ml-auto" />&nbsp;
							</div>
							<div className="mr-auto p-2 bd-highlight">
							난이도  &nbsp;
							<FontAwesomeIcon icon={faStar} className="ml-auto" />&nbsp;
							<FontAwesomeIcon icon={faStar} className="ml-auto" />&nbsp;
							<FontAwesomeIcon icon={faStar} className="ml-auto" />&nbsp;
							<FontAwesomeIcon icon={faStar} className="ml-auto" />&nbsp;
							<FontAwesomeIcon icon={faStar} className="ml-auto" />&nbsp;
							</div>
							</div>
				
								 </Card.Footer>	*/}
						</Link>
						</Card>
						</div>
						<br />
						</div>
					)}
					</CardDeck>
				</ul>
			</div>
		</Container>
	);
}
export default Searchcontent;
