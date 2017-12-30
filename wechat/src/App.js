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
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => (
        window.store.getState().save_info.username ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>
        )
      )}/>
    )

    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <PrivateRoute path="/chatlist" component={Chatlist}/>
          <PrivateRoute path="/friends" component={Friends}/>
          <PrivateRoute path="/more" component={Friends}/>
          <PrivateRoute path="/add_friend" component={Add_friend}/>
          <Redirect exact={true} from='/' to='/login'/>
        </Switch>
    </Router>
    );
  }
}

export default App;
