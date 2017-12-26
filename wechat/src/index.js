import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
// import Home from './views/Home'
import Login from './views/login/Login'
import Chatlist from './views/chatlist/Chatlist'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch
  } from 'react-router-dom'

ReactDOM.render((
    <Router>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route exact={true} path="/chatlist" component={Chatlist}/>
        <Redirect from='/' to='/login'/>
      </Switch>
  </Router>
), document.getElementById('root'));
registerServiceWorker();