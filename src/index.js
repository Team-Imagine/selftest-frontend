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
import NavBar from "./components/content/Navbar";
import Members from "./components/Rank";
import Test from "./components/Test";
import Rank from "./components/Rank";
import Settings from "./components/Settings";
import Bookmarks from "./components/Bookmarks";


ReactDOM.render(
    <div style = {{
        backgroundColor:'#f7feff'
      }}>

    <BrowserRouter>

      <NavBar/>
     
        <Switch>
          
            <Route path = "/home" component={App} />
            <Route path = "/login" component = {LoginForm} />
            <Route path = "/signup" component = {SignUp}/>
            <Route path = "/question" component = {Question}/>
            <Route path = "/password" component = {Password}/>
            <Route path = "/members" component = {Members}/>
            <Route path = "/test" component = {Test}/>
            <Route path = "/rank" component = {Rank}/>
            <Route path = "/bookmarks" component = {Bookmarks} />
            <Route path = "/settings" component = {Settings} />

        </Switch>
     

    </BrowserRouter>,

    </div>,

    document.getElementById("root"))
;

serviceWorker.unregister();
