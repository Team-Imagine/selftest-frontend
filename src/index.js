import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch} from "react-router-dom";

import SignUp from "./components/Signup";
import Password from "./components/Password";
import Settings from "./components/Settings";
import LoginForm from "./components/LoginForm";

ReactDOM.render(
    <div style = {{
        backgroundColor:'#f7feff'
      }}>

    <BrowserRouter>
        <Switch>
            <Route path = "/home" component={App} />
            <Route path = "/login" component = {LoginForm} />
            <Route path = "/signup" component = {SignUp}/>
            <Route path = "/settings" component = {Settings}/>
            <Route path = "/password" component = {Password}/>
        </Switch>
     

    </BrowserRouter>,

    </div>,

    document.getElementById("root"))
;

serviceWorker.unregister();
