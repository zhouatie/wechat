import React, { Component } from 'react';
import Login from './views/login/Login'
import Register from './views/register/Register'
import Chatlist from './views/chatlist/Chatlist'
import {connect} from "react-redux"
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch
  } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route exact={true} path="/chatlist" component={Chatlist}/>
          <Redirect from='/' to='/login'/>
        </Switch>
    </Router>
    );
  }
}

export default connect()(App);
