import React, { Component } from 'react';
import Login from './views/login/Login'
import Register from './views/register/Register'
import Chatlist from './views/chatlist/Chatlist'
import Friends from './views/friends/Friends.js'
import Add_friend from './views/add_friend/Add_friend.js'

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
          <Route exact={true} path="/friends" component={Friends}/>
          <Route exact={true} path="/more" component={Friends}/>
          <Route exact={true} path="/add_friend" component={Add_friend}/>
          <Redirect exact={true} from='/' to='/login'/>
        </Switch>
    </Router>
    );
  }
}

export default App;
