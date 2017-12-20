import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import Chatlist from './views/Chatlist'
import Home from './views/Home'
import Login from './views/login/Login'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
  } from 'react-router-dom'


ReactDOM.render((
    <Router>
        <Route path="/login" component={Login}/>
  </Router>
), document.getElementById('root'));
registerServiceWorker();