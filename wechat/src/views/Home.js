import React, { Component } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Content from './Content.js';

class Home extends Component {
  render() {
    return (
      <div id="home">
        <Header />
          <Content>
            
          </Content>
        <Footer/>
      </div>
    );
  }
}

export default Home;
