import React, { Component } from 'react';
import './footer.css'
import { NavLink } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <div id="footer">
        <NavLink
          to="/chatlist"
          activeClassName="selected"
        >
        <span className="iconfont icon-info"></span>
        <span>微信</span>
        </NavLink>
        <NavLink
          to="/friends"
          activeClassName="selected"
        >
        <span className="iconfont icon-friends"></span>
        <span>通讯录</span>
        </NavLink>
        <NavLink
          to="/search"
          activeClassName="selected"
        >
        <span className="iconfont icon-find"></span>
         <span>发现</span>
        </NavLink>
        <NavLink
          to="/user"
          activeClassName="selected"
        >
         <span className="iconfont icon-user"></span>
         <span>我</span>
        </NavLink>
      </div>
    );
  }
}

export default Header;