import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
// import Home from './views/Home'
// import Login from './views/login/Login'
// import Chatlist from './views/chatlist/Chatlist'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Reducer from './redux/reducers'
// import {
//     BrowserRouter as Router,
//     Route,
//     Link,
//     Redirect,
//     Switch
//   } from 'react-router-dom'

let store = createStore(Reducer);
window.store = store;

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)
ReactDOM.render((
  <Provider store={store} >
    <App/>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();