import React, { Component } from "react"
import './friends.css'
import Header from '../header/Header.js'
import Footer from '../footer/Footer.js'
import { connect } from 'react-redux'

class Friends extends Component {
    constructor(props) {
        super(props);

    }
    componentWillMount() {

    }
    render() {
        console.log(this.props,'props')
        return (
            <div id="friends">
                <Header title="通讯录" />
                <div>
                    <div className="search-wrap">
                        <div className="input">
                            <span className="iconfont icon-search"></span>
                            搜索
                        <span className="iconfont icon-sound"></span>
                        </div>
                    </div>
                    <div className="friend_lists">
                        <div className="friend_list">
                            <div className="friend_list_logoWrap">
                                <img className="friend_list_logo" src="./image/icon_friend.png" alt="" />
                            </div>
                            <div className="friend_name">新的朋友</div>
                        </div>
                        <div className="friend_list">
                            <div className="friend_list_logoWrap">
                                <img className="friend_list_logo" src="./image/chats_icon.png" alt="" />
                            </div>
                            <div className="friend_name">群聊</div>
                        </div>
                    </div>
                    <div style={{ marginTop: ".1rem" }} className="friend_lists">
                        <div className="friend_list">
                            <div className="friend_list_logoWrap">
                                <img className="friend_list_logo" src="./image/icon_moren_face.png" alt="" />
                            </div>
                            <div className="friend_name">我</div>
                        </div>
                    </div>
                    <div style={{ marginTop: ".1rem" }} className="friend_lists">
                        {this.props.list_arr.map((list,index) =>
                            <div key={index} className="friend_list">
                                <div className="friend_list_logoWrap">
                                    <img className="friend_list_logo" src="./image/icon_moren_face.png" alt="" />
                                </div>
                                <div className="friend_name">{list.nickname}</div>
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        list_arr: state.save_info.friends ,
        groups: state.save_info.groups
    }
}

export default connect(mapStateToProps)(Friends);