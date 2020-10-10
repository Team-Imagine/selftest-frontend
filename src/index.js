import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../src/components/Login";

ReactDOM.render(

    <BrowserRouter>
        <Switch>
            <Route path = "/home" component={App} />
            <Route path = "/login" component = {Login} />
        </Switch>
    </BrowserRouter>,
    document.getElementById("root"))
;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
