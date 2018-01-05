import React, { Component } from 'react'
import './chat.css'
import { connect } from 'react-redux'
import Header from '../header/Header.js'
// const socket = require('socket.io-client')('0.0.0.0:4000');


class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            chat_person : [],
        }
    }

    componentDidMount() {
        this.loadSocket();
        this.setState({
            chat_person:this.props.history.location.params.friend
        });
    }
    
    loadSocket() {
        let _this = this,
            self_id = this.props.userData._id;


        window.socket.on("private_message", function (from_id,to_id,data) {
            if(from_id != _this.state.chat_person.id) return false;
            _this.appendMsg(data,false)
        })
    }
    onSend = () => {
        this.appendMsg({},true)
    }
    appendMsg(message, self) {
        let _this = this,
            message_wrap = document.getElementById("message-wrap"),
            div = document.createElement("div"),
            msg = self? this.refs.textarea.value : message;

        if (self) {

            div.className = "self_message message";
            div.innerHTML = '<div class="message-logo-wrap"><img src="' + this.props.userData.logo + '"/></div><div class="message-info-wrap">' + msg + '</div>';
            window.socket.emit('private_message', _this.props.userData._id,_this.state.chat_person.id, msg );
            this.refs.textarea.value = "";

        } else {
            
            div.className = "other_message message";
            div.innerHTML = '<div class="message-logo-wrap"><img src="' + this.state.chat_person.logo + '"/></div><div class="message-info-wrap">' + msg + '</div>';

        }
        
        message_wrap.appendChild(div);
        div.scrollIntoView();

        let data = {
            room_id: this.state.chat_person.id,
            nickname: this.state.chat_person.nickname,
            date: new Date().getTime(),
            info: msg,
            logo:self? this.props.userData.logo:this.state.chat_person.logo
        }

        this.props.dispatch({ type: "ADD_CHATS", data: data })

    }

    componentWillUnmount(){

    }

    render() {
        return (
            <div className="chat">
                <Header field={{ title: this.state.chat_person.username, path: "/chat" }} />
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
    return {
        userData: state.save_info
    }
}
export default connect(mapStateToProps)(Chat);