import React, { Component } from 'react'
import './chat.css'
import { connect } from 'react-redux'
import Header from '../header/Header.js'
// const socket = require('socket.io-client')('0.0.0.0:4000');


class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chat_person: []
        }
    }

    componentDidMount() {
        this.loadSocket();

        this.setState({
            chat_person: this.props.history.location.params.friend
        });

        let html = "",
            message_wrap = document.getElementById("message-wrap"),
            friend_id = this.props.history.location.params.friend.id,
            infos = this.props.self_rooms.find(o => o[friend_id]) ? this.props.self_rooms.find(o => o[friend_id])[friend_id] : [];

        for (var i = 0; i < infos.length; i++) {
            let classN = infos[i].username == this.props.self_username ? 'self_message' : 'other_message';
            html += this.info_tpl(classN, infos[i].logo, infos[i].info);
        };

        message_wrap.innerHTML = html;
        if (message_wrap.children.length > 0) message_wrap.children[message_wrap.children.length - 1].scrollIntoView();

        // 将该好友的消息设为已读
        infos.map(o => o.has_read = true);
    }

    info_tpl(classN, logo, info) {
        classN = classN == 'self_message' ? "self_message message" : "other_message message";
        return `
            <div class='${classN}'>
                <div class="message-logo-wrap"><img src='${logo}' /></div><div class="message-info-wrap">${info}</div>
            </div>
        `
    }

    loadSocket() {
        if (window.socket._callbacks.$private_message) return false;

        let _this = this,
            self_id = this.props.self_id;
        window.socket.on("private_message", function (from_id, to_id, data) {
            console.log(window.location.pathname=='/chatlist' , to_id != self_id,"收到消息")
            if (window.location.pathname!='/chat' || to_id != self_id) return false;
            _this.appendMsg(data, false)
        })
    }
    onSend = () => {
        this.appendMsg({}, true)
    }
    appendMsg(message, self) {

        let _this = this,
            message_wrap = document.getElementById("message-wrap"),
            div = document.createElement("div"),
            msg = self ? this.refs.textarea.value : message;

        if (self) {

            div.className = "self_message message animate_right";
            div.innerHTML = '<div class="message-logo-wrap"><img src="' + this.props.self_logo + '"/></div><div class="message-info-wrap">' + msg + '</div>';
            window.socket.emit('private_message', _this.props.self_id, _this.state.chat_person.id, msg);
            this.refs.textarea.value = "";

        } else {

            div.className = "other_message message animate_left";
            div.innerHTML = '<div class="message-logo-wrap"><img src="' + this.state.chat_person.logo + '"/></div><div class="message-info-wrap">' + msg + '</div>';

        }

        // 默认消息未读
        let read_bool = false;
        if (message_wrap) {
            message_wrap.appendChild(div);
            div.scrollIntoView();
            // 消息插入dom中，表示已读
            read_bool = true;
        };


        let data = {
            room_id: this.state.chat_person.id,
            nickname: this.state.chat_person.nickname,
            date: new Date().getTime(),
            info: msg,
            username: self ? this.props.self_username : this.state.chat_person.username,
            logo: self ? this.props.self_logo : this.state.chat_person.logo,
            has_read: read_bool
        }

        this.props.dispatch({ type: "ADD_CHATS", data: data })

    }
    onBack() {
        this.props.history.goBack();
    }
    componentWillUnmount() {

    }

    render() {
        console.log(this, 'this')
        let self_room = this.props.self_rooms[this.state.chat_person.id];

        return (
            <div className="chat">
                <Header onBack={this.onBack.bind(this)} field={{ title: this.state.chat_person.username, path: "/chat" }} />
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
        self_logo: state.save_info.logo,
        self_id: state.save_info._id,
        self_username: state.save_info.username,
        self_rooms: state.save_info.rooms
    }
}
export default connect(mapStateToProps)(Chat);