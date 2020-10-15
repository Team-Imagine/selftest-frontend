import React, { Component } from "react";
import login2 from "./picture/login2.png";
import Form from "react-bootstrap/Form";

export default class SignUp extends Component {
  render() {
  
        return (
          <div style = {{
            backgroundColor:'#f7feff'
          }}>
          <div class="container h-100">
          <div class="row h-100 justify-content-center align-items-center">
              <form class="col-6">
         
             
                <br/><br/><br/>
                <h2>Login</h2>
                <hr />

                <div class="row h-100 justify-content-center align-items-center">
                    <img src = {login2}
                    width = '550'
                    height = '200'
                    alt='Login2'/>
                </div>

                 <Form.Group controlId="formBasicEmail">
                 <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                   We'll never share your email with anyone else.
                   </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember me" />
                  </Form.Group>
                  <button type="submit" className="btn btn-info btn-block">Submit</button>

                  <div className = "App-wrapper">
                
                  <p className="forgot-password text-right">
                  <a href="signup"to="/signup">
                     Sign Up   | </a>
                   <a href="password"to="/pasword">
                     Find Password</a>
      
                </p>
                </div>
              
                  
            </form>
            </div>
            </div>
            </div>
        );
    
  }
}