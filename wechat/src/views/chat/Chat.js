import React, { Component } from 'react'
import './chat.css'
import { connect } from 'react-redux'
import Header from '../header/Header.js'
// const socket = require('socket.io-client')('0.0.0.0:4000');
import * as io from 'socket.io-client'


class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            chat_person : []
        }
    }

    componentDidMount() {
        this.loadSocket();
        this.setState({
            chat_person:this.props.history.location.params.friend
        },()=>{
            console.log(this.state.chat_person)
        });
    }
    componentWillUnmount(){
        this.socket.close();
    }
    loadSocket() {
        var _this = this;

        _this.socket = io('http://localhost:8888');

        this.socket.emit('join',_this.props.userData._id);

        this.socket.on("private_message", function (from,to,data) {
            
            _this.appendMsg(data,false)
            console.log(data,'收到消息')
        })
    }
    onSend = () => {
        this.appendMsg({},true)
        
    }
    appendMsg(data, self) {
        let _this = this;
        let message_wrap = document.getElementById("message-wrap");
        let div = document.createElement("div");
        if (self) {
            let value = this.refs.textarea.value;
            div.className = "self_message message";
            div.innerHTML = '<div class="message-logo-wrap"><img src="' + this.props.userData.logo + '"/></div><div class="message-info-wrap">' + value + '</div>';
            this.socket.emit('private_message', _this.props.userData._id,_this.state.chat_person.id, value );
            this.refs.textarea.value = "";

        } else {
            
            div.className = "other_message message";
            div.innerHTML = '<div class="message-logo-wrap"><img src="' + this.props.userData.logo + '"/></div><div class="message-info-wrap">' + data + '</div>';

        }
        message_wrap.appendChild(div);

    }

    componentWillUnmount() {
        console.log("destory")
        document.onkeydown = null;
    }
    render() {
        return (
            <div className="chat">
                <Header field={{ title: 'heihei', path: "/chat" }} />
                <div className="chat-content">
                    <div className="text-wrap">
                        <div id="message-wrap">

                        </div>
                    </div>
                    <div className="chat-bottom">
                        <div className="bottom-left-btn">
                            <span className="iconfont icon-face"></span>
                        </div>
                        <div className="bottom-inputWrap">
                            <textarea ref="textarea"></textarea>
                        </div>
                        <div className="bottom-right-btn">
                            <span className="iconfont icon-more2"></span>
                            <span onClick={this.onSend} className="iconfont icon-send"></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    console.log(state, 'satte')
    return {
        userData: state.save_info
    }
}
export default connect(mapStateToProps)(Chat);