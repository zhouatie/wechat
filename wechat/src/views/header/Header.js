import React, { Component } from 'react';
import './header.css'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {

    let Right = null;
    switch(this.props.title){
      case "通讯录":
      Right = <Link to="/add_friend" className="right more iconfont icon-add_friend" />;
      break;
      case "微信":
      Right = <Link to="/more" className="right more iconfont icon-more" />;
      break;
    }

    let Left = null;
    switch(this.props.title){
      case "添加朋友":
      Left = <Link to="/friends" className="left iconfont icon-back">通讯录</Link>;
      break;
      default:
      Left = <Link to="/friends"></Link>;
    }
    
    return (
      <div id="header">
          { Left }
          {this.props.title}
          { Right }
      </div>
    );
  }
}

export default Header;
