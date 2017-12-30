import React, { Component } from 'react';
import './register.css'
import axios from 'axios'
import {connect} from 'react-redux'
import {
    BrowserRouter as Router
  } from 'react-router-dom'

class Register extends Component {
  constructor(props){
    super(props);

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
    this[name] = value;
    
  }
  componentWillMount(){
            console.log(this.store,'strore')

  }
  username = ""
  password = ""
  nickname = ""
  toRegister(){
    let _this = this;
    let userInfo = {
      username : this.username,
      password : this.password,
      nickname : this.nickname
    }
    console.log(userInfo,'reg userinfo')
    axios.post('/register',userInfo).then(res => {
      if(res.data.status == "success"){
          _this.props.dispatch({type:"SAVE_INFO",data:res.data.userInfo})
          _this.props.history.replace("/chatlist")
      }else {
        alert('error')
      }
    })
  }
  render() {
    
    return (
      <div id="login">
        <span className=" close iconfont icon-close"></span>
        <div className="upload_logo"></div>
        <div className="login_inputs">
          <div className="input_wrap"><input name="username" onChange={this.changeHandle} type="text" placeholder="请输入账号" /></div>
          <div className="input_wrap"><input name="password" onChange={this.changeHandle} type="password" placeholder="请输入密码" /></div>
          <div className="input_wrap"><input name="nickname" onChange={this.changeHandle} type="nickname" placeholder="请输入匿名" /></div>
        </div>
        <div onClick={this.toRegister} className="login_btn">注册</div>
      </div>
    );
  }
}

export default connect()(Register);
