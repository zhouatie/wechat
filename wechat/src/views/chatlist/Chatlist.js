import React, { Component } from 'react';
import './chatlist.css'
import Header from '../header/Header.js';
import Footer from '../footer/Footer.js';
import List from './List.js'

class Chatlist extends Component {
  componentWillMount() {
    console.log(this.props, 'this')
  }
  render() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const listItems = numbers.map((number) =>
      <List key={number.toString()}
        value={number} />
    );

    return (
      <div id="chatlist">
        <Header title="微信" />
        <div className="listWrap">
          <div className="search-wrap">
            <div className="input">
              <span className="iconfont icon-search"></span>
              搜索
              <span className="iconfont icon-sound"></span>
            </div>
          </div>
          {listItems}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Chatlist;
