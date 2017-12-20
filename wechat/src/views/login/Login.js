import React, { Component } from 'react';
import './login.css'

class Login extends Component {
  render() {
    return (
      <div id="login">
        <span className=" close iconfont icon-close"></span>
        <div className="login_inputs">
            <div className="input_wrap"><input id="username" type="text" placeholder="请输入账号"/></div>
           <div className="input_wrap"><input id="password" type="password" placeholder="请输入密码"/></div>
        </div>
        <div className="login_btn disabled">登录</div>
      </div>
    );
  }
}

export default Login;
