import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import index from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router';

import SignUp from "./components/Signup";
import Password from "./components/Password";
import Subject from "./components/Subject";
import LoginForm from "./components/LoginForm";
import AuthForm from "./components/AuthForm";
import Members from "./components/Rank";
import Test from "./components/test/Test";
import Rank from "./components/Rank";
import Settings from "./components/Settings";
import Bookmarks from "./components/Bookmarks";
import Search from "./components/Search";
import { CookiesProvider } from 'react-cookie';
import UserSettings from "./components/UserSettings";
import Activity from "./components/Activitycontent"

ReactDOM.render(

  <div style={{
    backgroundColor: '#f7feff'
  }}>
    
    <CookiesProvider>
   
      <BrowserRouter>
        <Switch>
          <Redirect exact from='/' to='/home'/>
          <Route path="/usersettings" component={UserSettings} />
          <Route path="/home" component={App} />
          <Route exact path="/search/:searchtype?/:keywordtype?/:keyword?" component={Search}/>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/auth" component={AuthForm} />
          <Route path="/signup" component={SignUp} />
          <Route path="/activity" component={Activity}/>
          <Route exact path="/subject" component={Subject} />
          <Route path="/password" component={Password} />
          <Route path="/members" component={Members} />
          <Route exact path="/test" component={Test} />
          <Route exact path="/test/:test_id" component={Test} />
          <Route exact path="/test/make_test/:make_test" component={Test} />
          <Route path="/rank" component={Rank} />
          <Route path="/bookmarks" component={Bookmarks} />
          <Route path="/settings" component={Settings} />
          <Route exact path="/subject/:subject" component={Subject} />
          <Route exact path="/subject/:subject/:course" component={Subject} />
          <Route exact path="/subject/:subject/:course/:question_id" component={Subject} />
          <Route exact path="/subject/:subject/:course/make/:make_question" component={Subject} />
          <Route exact path="/subject/:subject/:course/:question_id/problem_solving/:problem_solving" component={Subject} />
          
        </Switch>
      </BrowserRouter>
    </CookiesProvider>
  </div>,


  document.getElementById("root"));



serviceWorker.unregister();
