import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import welcome from "../picture/welcome.png";


export default class SignUp extends Component {
    render() {
        return (
            <div style = {{
                backgroundColor:'#f7feff'
            }}>
            <div class="container h-100">
                <div class="row h-100 justify-content-center align-items-center">
                
                <form class="col-6">

                <div class = "row h-100 justify-content-center align-items-center">
                    <img src = {welcome}
                    width = '550'
                    height = '200'
                    alt='signup'/>
                </div>

                <h2>Sign Up</h2>
                <hr />
                 <Form.Group controlId="formBasicEmail">
                 <Form.Label>*Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group controlId="formBasicUsername">
                 <Form.Label>*Username</Form.Label>
                  <Form.Control placeholder="Enter username" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                 <Form.Label>*Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter password" />
                  </Form.Group>

                  <Form.Group controlId="formBasicFirstname">
                 <Form.Label>*Firstname</Form.Label>
                  <Form.Control placeholder="Enter firstname" />
                  </Form.Group>

                <Form.Group controlId="formBasicLastname">
                 <Form.Label>*Lastname</Form.Label>
                  <Form.Control type placeholder="Enter lastname" />
                 
                  </Form.Group>

                  <Form.Group controlId="formBasicTelephone">
                 <Form.Label>Telephone</Form.Label>
                  <Form.Control type="number"placeholder="Enter telephone number"/>
                  </Form.Group>

                  <Form.Text className="text-muted">
                   Fields that are marked with asterisk(*) are compulsory.
                   </Form.Text>

                <button type="submit" className="btn btn-info btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                     <a href="login"to="/login">Already registered? sign in?</a>
                </p>
            </form>
            </div>
            </div>

            </div>
            
        );
    }
}