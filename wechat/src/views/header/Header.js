import React, { Component } from 'react';
import './header.css'
import { Link } from 'react-router-dom'

class Header extends Component {
  componentDidMount() {

  }
  render() {


    let Left = null;
    switch (this.props.field.path) {
      case "/add_friend":
        Left = <Link to="/friends" className="left iconfont icon-back">通讯录</Link>;
        break;
      case "/chat":
        Left = <Link to="/chatlist" className="left iconfont icon-back" >返回</Link>;
        break;
      case "/userCard":
        Left = <Link to="/friends" className="left iconfont icon-back">通讯录</Link>;
        break;
      case "/editInfo":
        Left = <Link to="/user" className="left iconfont icon-back">我</Link>;
        break;
      case "/uploadLogo":
        Left = <Link to="/editInfo" className="left iconfont icon-back">个人信息</Link>;
        break;
      default:
        Left = <span></span>;
    }

    let Right = null;
    switch (this.props.field.path) {
      case "/friends":
        Right = <Link to="/add_friend" className="right iconfont icon-add_friend" />;
        break;
      case "/chatlist":
        Right = <Link to="/more" className="right iconfont icon-more" />;
        break;
      case "/userCard":
        Right = <Link to="/infoSetting" className="right iconfont icon-info_setting" />;
        break;
      case "/chat":
        Right = <Link to="/infoSetting" className="right iconfont icon-chat_detail" />;
        break;
      case "/uploadLogo":
        Right = <span onClick={this.props.onOption} className="right iconfont icon-info_setting" ></span>;
        break;
      default:
        Right = <span></span>;
    }
    return (
      <div id="header">
        {Left}
        {this.props.field.title}
        {Right}
      </div>
    );
  }
}

export default Header;
