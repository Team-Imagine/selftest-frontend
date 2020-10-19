import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import welcome from "../picture/welcome.png";
import axios from "axios";
import Password from "./Password";


export default class SignUp extends Component {
    constructor(props){
        super(props)

        this.state = {
            email: '',
            username: '',
            password:'',

        }
    }

    changeHandler = e => {
        this.setState 
    }
    submitHandler = e = {

    }

    render() {
        return (
            <div style = {{
                backgroundColor:'#f7feff'
            }}>
            <div class="container h-100">
                <div class="row h-100 justify-content-center align-items-center">
                
                <form 
                onSubmit = {this.submit}
                class="col-6">

                <br/><br/><br/>
                <h2>Sign Up</h2>
                <hr />

                <div class = "row h-100 justify-content-center align-items-center">
                    <img src = {welcome}
                    width = '550'
                    height = '200'
                    alt='signup'/>
                </div>
                 <Form.Group controlId="formBasicEmail">
                 <Form.Label>*Email address</Form.Label>
                  <Form.Control type="email" value = {email} placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group controlId="formBasicUsername">
                 <Form.Label>*Username</Form.Label>
                  <Form.Control type="text" value = {username} placeholder="Enter username" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                 <Form.Label>*Password</Form.Label>
                  <Form.Control type="password" value = {password} placeholder="Enter password" />
                  </Form.Group>

                  <Form.Group controlId="formBasicFirstname">
                 <Form.Label>*Firstname</Form.Label>
                  <Form.Control type="text" value = {firstname} placeholder="Enter firstname" />
                  </Form.Group>

                <Form.Group controlId="formBasicLastname">
                 <Form.Label>*Lastname</Form.Label>
                  <Form.Control type="text" value = {lastname} placeholder="Enter lastname" />
                 
                  </Form.Group>

                  <Form.Group controlId="formBasicTelephone">
                 <Form.Label>Telephone</Form.Label>
                  <Form.Control type="number" value ={telephone} placeholder="Enter telephone number"/>
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