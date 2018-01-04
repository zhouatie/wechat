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
            chat_persons : []
        }
    }

    componentDidMount() {
        this.loadSocket();
        this.setState({
            chat_persons:[...this.state.chat_persons,this.props.history.location.params.friend]
        });
    }
    loadSocket() {
        var _this = this;

        _this.socket = io('http://localhost:8888');

        _this.socket.on('news', function (data) {
            _this.socket.emit('my other event', { my: 'data222' });
        });

        this.socket.on("message", function (data) {
            
            _this.appendMsg(data,false)
            
        })
    }
    onSend = () => {
        this.appendMsg({},true)
        
    }
    appendMsg(data, self) {
        let message_wrap = document.getElementById("message-wrap");
        let div = document.createElement("div");
        if (self) {
            let value = this.refs.textarea.value;
            div.className = "self_message message";
            div.innerHTML = '<div class="message-logo-wrap"><img src="' + this.props.userData.logo + '"/></div><div class="message-info-wrap">' + value + '</div>';
            this.socket.emit('message', { info: value });
            this.refs.textarea.value = "";

        } else {
            
            let value = data.info;
            div.className = "other_message message";
            div.innerHTML = '<div class="message-logo-wrap"><img src="' + this.props.userData.logo + '"/></div><div class="message-info-wrap">' + value + '</div>';

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