
import React, { Component, useState } from "react";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";
import store from "../store";
import emailpic from "../picture/email.png";
import axios from "axios";

const AuthForm = () => {
	const [authCode, setAuthCode] = useState("");
	const [isAuthenticated, setIsAuthenticated] = useState(0);

	const submitHandler = event => {
		event.preventDefault();

		const data = {
			verification_code: authCode,
		}

		axios.post(`/api/auth/verify-email`, data)

			.then(res => {
				console.log(res.data);
				store.dispatch({type:'VERIFIED', value: 1})
				alert("인증 되었습니다.")

				setIsAuthenticated(1);
			})
	}

	const redirect = isAuthenticated ? (<Redirect to={{ pathname: '/home' }} />) : '';

	return (
		<div style={{
			backgroundColor: '#f7feff'
		}}>
			<div className="container h-100">
				<div className="row h-100 justify-content-center align-items-center">
					{redirect}


					<form
						onSubmit={submitHandler}
						className="col-6">
						<br /><br /><br />
						<br /><br /><br />
						<br /><br /><br />
						<h2>User Authentication</h2>
						<hr />

						<div className="row h-100 justify-content-center align-items-center">
							<div>
              				<img src={emailpic}
               				width='350'
               				height='200'
                			alt='email' />
						
            			</div>
						</div>
						<hr/>

						<div className="row h-100 justify-content-center align-items-center">
							<h4>귀하의 메일로 인증 메일이 발송되었습니다.</h4>
							<p>
							인증하시면 Selftest 이용이 가능합니다.</p>
						</div>
							
					

						<Form.Group controlId="formBasicAuthCode">
							<Form.Label>인증 코드</Form.Label>
							<Form.Control
								type="text"
								name="authCode"
								value={authCode}
								onChange={({ target: { value } }) => setAuthCode(value)}
								placeholder="Enter the code"
							/>

						</Form.Group>

						<button
							type="submit"
							className="btn btn-info btn-block"
						>
							제출</button>
							<br/> <br/><br/> <br/><br/> <br/><br/> <br/><br/> <br/><br/> <br/><br/> 	
					</form>
				</div>
			</div>
		</div>
	);

}
export default AuthForm;