import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch} from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/Signup";

ReactDOM.render(
    
    <BrowserRouter>
  

        <Switch>
            <Route path = "/home" component={App} />
            <Route path = "/login" component = {Login} />
            <Route path = "/signup" component = {SignUp}/>
        </Switch>
     

    </BrowserRouter>,
    document.getElementById("root"))
;

serviceWorker.unregister();
