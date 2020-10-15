import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch} from "react-router-dom";

import SignUp from "./components/Signup";
import Password from "./components/Password";
import Question from "./components/Question";
import LoginForm from "./components/LoginForm";
import FirstPage from "./components/FirstPage";
import NavBar from "./components/content/Navbar";
import SideBar from "./components/sidebar/SideBar";
import Content from "./components/content/Content";

ReactDOM.render(
    <div style = {{
        backgroundColor:'#f7feff'
      }}>

    <BrowserRouter>

      <NavBar/>
      <App/>
        <Switch>
            <Route path = "/home" component={App} />
            <Route path = "/login" component = {LoginForm} />
            <Route path = "/signup" component = {SignUp}/>
            <Route path = "/question" component = {Question}/>
            <Route path = "password" component = {Password}/>
        </Switch>
     

    </BrowserRouter>,

    </div>,

    document.getElementById("root"))
;

serviceWorker.unregister();
