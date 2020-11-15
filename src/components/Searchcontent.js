import React,{ useState, useEffect }from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";



const Searchcontent = ({ searchKeyword }) => {

	const keyword = searchKeyword;
  console.log(keyword);
	useEffect(() => {
  });
  return (
    <Container
      fluid
      className={classNames("content", { "is-open": this.props.isOpen })}
    >
      <div>
        <h4>
        Search Page
        </h4>
       </div>
       <hr/>

    </Container>
  );
}
export default Searchcontent;
