import React, { Component } from 'react';
import Header from './header/Header.js';
import Footer from './footer/Footer.js';
import Content from './Content.js';
import Chatlist from "./chatlist/Chatlist.js"
import {Route} from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div id="home">
        <Header/>
          <Content>
              <Route path="/home/chatlist" Component={Chatlist} />
          </Content>
        <Footer/>
      </div>
    );
  }
}

export default Home;
