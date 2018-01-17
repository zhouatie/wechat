import React, { Component } from 'react'
import './editInfo.css'
import Header from '../header/Header.js'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class EditInfo extends Component {
    render() {
        return (
            <div id="editInfo">
                <Header field={{ title: '个人信息', path: "/editInfo" }} />
                <div className="userInfo-content">
                    <div style={{ marginTop: 0 }} className="items-wrap">
                        <Link to="/uploadLogo" className="upload_logo">
                            <div className="textWrap">
                                <div className="">头像</div>
                            </div>
                            <div className="logo-wrap">
                                <img src={this.props.self_logo} alt="" />
                            </div>
                            <div className="arrow">
                                <span className="iconfont icon-arrow-right"></span>
                            </div>
                        </Link>
                        <Link style={{display:'flex',color:'#000'}} to="/resetInfo" className="user-item">
                            <div className="textWrap">名字</div>
                            <div className="text-info">{this.props.self_nickname}</div>
                            <div className="arrow">
                                <span className="iconfont icon-arrow-right"></span>
                            </div>
                        </Link>
                        <div className="user-item">
                            <div className="textWrap">微信号</div>
                            <div style={{ marginRight: 0 }} className="text-info">{this.props.self_username}</div>
                        </div>
                        <div className="user-item">
                            <div className="textWrap">我的二维码</div>
                            <div className="arrow">
                                <span className="iconfont icon-arrow-right"></span>
                            </div>
                        </div>
                        <div className="user-item">
                            <div className="textWrap">更多</div>
                            <div className="arrow">
                                <span className="iconfont icon-arrow-right"></span>
                            </div>
                        </div>
                    </div>
                    <div className="items-wrap">
                        <div className="user-item">
                            <div className="textWrap">我的地址</div>
                            <div className="arrow">
                                <span className="iconfont icon-arrow-right"></span>
                            </div>
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
        self_username: state.save_info.username,
        self_nickname: state.save_info.nickname,
    }
}
export default connect(mapStateToProps)(EditInfo)