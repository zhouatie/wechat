import React, { Component } from 'react';
import './register.css'
import axios from 'axios'
import {
    BrowserRouter as Router
  } from 'react-router-dom'

class Register extends Component {
  constructor(){
    super();

    this.changeHandle = this.changeHandle.bind(this);
    this.toRegister = this.toRegister.bind(this);

    this.state = {
      username : "",
      password : "",
      bool : false
    };
  }
  changeHandle(event){
    let obj = event.target;
    let value = obj.value;
    let name = obj.name;
    
console.log(name,value)
    this.setState({
      [name] : value
    },() => {
        console.log(this.state.password,this.state.username)
        if(this.state.password !== "" && this.state.username !== ""){
          this.setState({
            bool : true
          })
        }else {
          this.setState({
            bool : false
          })
        }
    })
    
  }
  toRegister(){
    if(!this.state.bool) return;
    let _this = this;
    let userInfo = {
      username : this.state.username,
      password : this.state.password
    }
    this.setState({
      username : "",
      password : ""
    })
    console.log(_this.props)
    axios.post('/register',userInfo).then(res => {
      if(res.data == "success"){
          _this.props.history.push("/chatlist")
      }else {
        alert('error')
      }
    })
  }
  render() {
    
    return (
      <div id="login">
        <span className=" close iconfont icon-close"></span>
        <div className="login_inputs">
          <div className="input_wrap"><input name="username" onChange={this.changeHandle} type="text" placeholder="请输入账号" /></div>
          <div className="input_wrap"><input name="password" onChange={this.changeHandle} type="password" placeholder="请输入密码" /></div>
        </div>
        <div onClick={this.toRegister} className={this.state.bool? "login_btn":"login_btn disabled"}>注册</div>
      </div>
    );
  }
}

export default Register;
