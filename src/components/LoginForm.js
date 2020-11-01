
import React, { Component, useState } from "react";
import login from "../picture/login.png";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";
import store from "../store";

import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(0);

  const submitHandler = event => {
    event.preventDefault();

    const user = {
      email: email,
      password: password
    };

    axios.post(`/api/auth/login`, user)

      .then(res => {
        console.log(res.data);

        store.dispatch({type:'LOGIN', value: res.data.uid})
        store.dispatch({type:'VERIFIED', value: res.data.verified})
        
        setPassword("");
        setEmail("");
        setIsLoggedIn(1);
      })
  }
  const redirect = isLoggedIn ? (<Redirect to={{pathname: '/home'}}/>) : '';

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
            <br/><br/><br/>
            
            <br /><br /><br />
            <h2>Login</h2>
            <hr />

            <div className="row h-100 justify-content-center align-items-center">
              <img src={login}
                width='550'
                height='200'
                alt='Login2' />
            </div>
            
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
                placeholder="Enter email"
              />

              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                   </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
                placeholder="Enter password"
              />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Remember me"
              />
            </Form.Group>

            <button
              type="submit"
              className="btn btn-info btn-block"
            >
              Login</button>

            <div className="App-wrapper">
              <p className="forgot-password text-right">
                <a href="signup" to="/signup">
                  Sign Up   | </a>
                <a href="password" to="/password">
                  Find Password</a>
                  <br/> <br/><br/> <br/><br/> <br/><br/> <br/><br/> <br/><br/> <br/><br/> 
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

}
export default LoginForm;