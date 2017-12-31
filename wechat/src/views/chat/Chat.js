import React, { Component } from 'react'
import './chat.css'
import { connect } from 'react-redux'
import Header from '../header/Header.js'



class Chat extends Component {


    componentDidMount() {

    }
    onSend = () => {
        console.log(this.props.userData,'data')
        let message_wrap = document.getElementById("message-wrap");
        let div = document.createElement("div");
        div.className = "self_message message";
        div.innerHTML = '<div class="message-logo-wrap"><img src="'+this.props.userData.logo+'"/></div><div class="message-info-wrap">' + this.refs.textarea.value + '</div>';
        message_wrap.appendChild(div);
        this.refs.textarea.value = "";
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