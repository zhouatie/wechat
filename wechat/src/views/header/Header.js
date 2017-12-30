import React, { Component } from 'react';
import './header.css'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {


    let Left = null;
    switch(this.props.title){
      case "添加朋友":
      Left = <Link to="/friends" className="left iconfont icon-back">通讯录</Link>;
      break;
      case "详细资料":
      Left = <Link to="/friends" className="left iconfont icon-back">通讯录</Link>;
      break;
      default:
      Left = <Link to="/friends"></Link>;
    }
    
    let Right = null;
    switch(this.props.title){
      case "通讯录":
      Right = <Link to="/add_friend" className="right iconfont icon-add_friend" />;
      break;
      case "微信":
      Right = <Link to="/more" className="right iconfont icon-more" />;
      break;
      case "详细资料":
      Right = <Link to="/infoSetting" className="right iconfont icon-info_setting" />;
      break;
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
