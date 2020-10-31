import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import welcome from "../picture/welcome.png";
import axios from "axios";

export default class SignUp extends Component {
constructor(props){
  super(props)

   this.state = {
        email: '',
        username:'',
        password:'',
        first_name:'',
        last_name:'',
        phone_number:'',
      }
    }
    
      changeHandler = event => {
        this.setState({[event.target.name]: event.target.value });
      }
    
      submitHandler = event => {
        event.preventDefault();
        console.log(this.state)
        const userRegister = {
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          phone_number: this.state.phone_number
        };
    
        axios.post(`/api/auth/register`,  userRegister )

          .then(res => {
            console.log(res);
            console.log(res.data);
          })
          alert("회원가입에 성공하였습니다!.");
        
        this.setState({
          email: '',
          username :'',
          password : '',
          first_name : '',
          last_name: '',
          phone_number: '',
        })

      }
      
    render() {

      const{email,username,password,first_name,last_name, phone_number} = this.state
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
                <h2>Sign Up</h2>
                <hr />

                <div className = "row h-100 justify-content-center align-items-center">
                    <img src = {welcome} 
                    width = '550'
                    height = '200'
                    alt='signup'/>
                </div>
                 <Form.Group controlId="formBasicEmail">
                 <Form.Label>*Email address</Form.Label>
                  <Form.Control 
                  type="email" 
                  name = "email"
                  value ={email}
                  onChange={this.changeHandler}
                  placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group controlId="formBasicUsername">
                 <Form.Label>*Username</Form.Label>
                  <Form.Control 
                  type="text" 
                  name = "username"
                  value ={username}
                  onChange={this.changeHandler}
                  placeholder="Enter username" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                 <Form.Label>*Password</Form.Label>
                  <Form.Control 
                  type="password"
                  name = "password"
                  value ={password} 
                  onChange={this.changeHandler}
                  placeholder="Enter password" />
                  </Form.Group>

                  <Form.Group controlId="formBasicFirstname">
                 <Form.Label>*Firstname</Form.Label>
                  <Form.Control 
                  type="text" 
                  name = "first_name"
                  value ={first_name}
                  onChange={this.changeHandler}
                  placeholder="Enter firstname" />
                  </Form.Group>

                <Form.Group controlId="formBasicLastname">
                 <Form.Label>*Lastname</Form.Label>
                  <Form.Control 
                  type="text" 
                  name = "last_name"
                  value ={last_name}
                  onChange={this.changeHandler}
                  placeholder="Enter lastname" />
                 
                  </Form.Group>

                  <Form.Group controlId="formBasicPhoneNumber">
                 <Form.Label>Phone Number</Form.Label>
                  <Form.Control 
                  type="number"
                  name="phone_number"
                  value={phone_number}
                  onChange={this.changeHandler}
                  placeholder="Enter phone number"/>
                  </Form.Group>

                  <Form.Text className="text-muted">
                   Fields that are marked with asterisk(*) are compulsory.
                   </Form.Text>

                <button 
                type="submit" 
                className="btn btn-info btn-block"
                onClick={this.handleSubmit}
                >Sign Up</button>

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