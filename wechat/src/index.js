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
import 'antd-mobile/dist/antd-mobile.css';

const store = createStore(
   Reducer, /* preloadedState, */
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );
window.store = store;

let unsubscribe = store.subscribe((data) =>
  console.log(store.getState())
)
ReactDOM.render((
  <Provider store={store} >
    <App/>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();