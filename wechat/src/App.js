import React, { Component } from 'react';
import Login from './views/login/Login'
import Register from './views/register/Register'
import Chatlist from './views/chatlist/Chatlist'
import Friends from './views/friends/Friends.js'
import Add_friend from './views/add_friend/Add_friend.js'
import UserCard from './views/usercard/UserCard.js'
import Chat from './views/chat/Chat.js'

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

class App extends Component {

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => (
        window.store.getState().save_info.username ? (
          <Component {...props} />
        ) : (
            <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }} />
          )
      )} />
    )

    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/chatlist" component={Chatlist} />
          <PrivateRoute path="/friends" component={Friends} />
          <PrivateRoute path="/more" component={Friends} />
          <PrivateRoute path="/add_friend" component={Add_friend} />
          <PrivateRoute path="/userCard" component={UserCard} />
          <PrivateRoute path="/chat" component={Chat} />
          <Redirect exact={true} from='/' to='/login' />
        </Switch>
      </Router>
    );
  }
}

export default App;
