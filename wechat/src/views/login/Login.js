import React, { Component } from 'react';
import './login.css'

class Login extends Component {
  render() {
    return (
      <div id="login">
        <span className=" close iconfont icon-close"></span>
        <div className="login_inputs">
            <div className="input_wrap"><input type="text" placeholder="请输入账号"/></div>
           <div className="input_wrap"><input type="password" placeholder="请输入密码"/></div>
        </div>
      </div>
    );
  }
}

export default Login;
