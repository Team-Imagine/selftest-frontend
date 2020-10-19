
import React, { Component } from "react";
import login from "../picture/login.png";
import Form from "react-bootstrap/Form";
import axios from "axios";

class LoginForm extends Component {
   constructor(props){
    super(props)

  this.state = {
    email:'',
    password:''
  }
   }
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitHandler = event => {
    event.preventDefault();
    console.log(this.state)
    const user = {
      email: this.state.email,
      password: this.state.password
    };

 
    axios.post(`/api/auth/login`, 
  
    { user })
    
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    
  }

  render() {
  
    const{email, password} = this.state

        return (
     
          <div style = {{
            backgroundColor:'#f7feff'
          }}>
          <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
              <form 
              onSubmit = {this.submitHandler}
              className="col-6">
         
             
                <br/><br/><br/>
                <h2>Login</h2>
                <hr />

                <div className="row h-100 justify-content-center align-items-center">
                    <img src = {login}
                    width = '550'
                    height = '200'
                    alt='Login2'/>
                </div>

                 <Form.Group controlId="formBasicEmail">
                 <Form.Label>Email address</Form.Label>
                  <Form.Control 
                  type="email"
                  name = "email"
                  value ={email}
                  onChange={this.changeHandler}
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
                    name = "password"
                    value ={password}
                    onChange={this.changeHandler}
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
export default LoginForm;