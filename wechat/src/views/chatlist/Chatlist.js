import React, { Component } from 'react';
import './chatlist.css'
import Header from '../header/Header.js';
import Footer from '../footer/Footer.js';

class Chatlist extends Component {
  render() {
    return (
      <div id="chatlist">
        <Header/>
        <div className="search-wrap">
          <div className="input">
            <span className="iconfont icon-search"></span>
            搜索
            <span className="iconfont icon-sound"></span>
          </div>
        </div>
        <div className="listWrap"></div>
        <Footer/>
      </div>
    );
  }
}

export default Chatlist;
