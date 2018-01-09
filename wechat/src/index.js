import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd-mobile/dist/antd-mobile.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

import { createStore, applyMiddleware } from 'redux'

import { Provider } from 'react-redux'
import Reducer from './redux/reducers'

import thunkMiddleware from 'redux-thunk'

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
    <App />
  </Provider>
), document.getElementById('root'));
registerServiceWorker();