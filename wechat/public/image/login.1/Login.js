import React, { Component } from 'react';
import './login.css'
import axios from 'axios'
import {
    BrowserRouter as Router,hashHistory
  } from 'react-router-dom'

class Login extends Component {
  constructor(){
    super();

    this.changeHandle = this.changeHandle.bind(this);
    this.toLogin = this.toLogin.bind(this);

    this.state = {
      username : "",
      password : "",
      bool : false
    };
  }
  username = ""
  password = ""
  bool = ""
  changeHandle(event){
    let obj = event.target;
    let value = obj.value;
    let name = obj.name;
    this[name] = value;
    // if(this.username != "" && this.password != ""){
    //   this.bool = true;
    // }else {
    //   this.bool = false;
    // }
  }
  toLogin(){
    let _this = this;
    let userInfo = {
      username : this.username,
      password : this.password
    }
    
    axios.post('/login',userInfo).then(res => {
      if(res.data.status == "success"){
          _this.props.history.replace({pathname:"/chatlist"});
      }else {
        alert(res.data.message)
      }
    })
  }

  render() {
    
    return (
      <div id="login">
        <span className=" close iconfont icon-close"></span>
        <div className="login_inputs">
          <div className="input_wrap"><input name="username" ref="username" onChange={this.changeHandle} type="text" placeholder="请输入账号" /></div>
          <div className="input_wrap"><input name="password" ref="password" onChange={this.changeHandle} type="password" placeholder="请输入密码" /></div>
        </div>
        <div onClick={this.toLogin} className="login_btn">登录</div>
      </div>
    );
  }
}

export default Login;
