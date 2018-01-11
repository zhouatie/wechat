import React, { Component } from 'react'
import './user.css'
import Header from '../header/Header.js'
import Footer from '../footer/Footer.js'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class User extends Component {
    render() {
        return (
            <div id='user'>
                <Header field={{ title: '我', path: "/user" }} />
                <div className="userInfo-content">
                    <Link to="/editInfo" className="edit_userInfo">
                        <div className="logo-wrap">
                            <img src={ this.props.self_logo } alt="" />
                        </div>
                        <div className="textWrap">
                            <div className="user-username">{this.props.self_username}</div>
                            <div className="user-nickname">微信号:  {this.props.self_nickname}</div>
                        </div>
                        <div className="arrow">
                            <span className="iconfont icon-arrow-right"></span>
                        </div>
                    </Link>
                    <div className="items-wrap">
                         <div className="user-item">
                             <div className="icon-wrap">
                                <span className="iconfont icon-qianbao"></span>
                             </div>
                             <div className="textWrap">钱包</div>
                             <div className="arrow">
                                 <span className="iconfont icon-arrow-right"></span>
                             </div>
                         </div>
                    </div>
                    <div className="items-wrap">
                         <div className="user-item">
                             <div className="icon-wrap">
                                <span className="shoucang">
                                    <img src="./image/shoucang.svg" alt=""/>
                                </span>
                             </div>
                             <div className="textWrap">收藏</div>
                             <div className="arrow">
                                 <span className="iconfont icon-arrow-right"></span>
                             </div>
                         </div>
                         <div className="user-item">
                             <div className="icon-wrap">
                                <span style={{fontSize:'.2rem'}} className="iconfont icon-photo"></span>
                             </div>
                             <div className="textWrap">相册</div>
                             <div className="arrow">
                                 <span className="iconfont icon-arrow-right"></span>
                             </div>
                         </div>
                         <div className="user-item">
                             <div className="icon-wrap">
                                <span style={{fontSize:'.2rem'}} className="iconfont icon-kabao"></span>
                             </div>
                             <div className="textWrap">卡包</div>
                             <div className="arrow">
                                 <span className="iconfont icon-arrow-right"></span>
                             </div>
                         </div>
                         <div className="user-item">
                             <div className="icon-wrap">
                                <span style={{fontSize:'.2rem'}} className="iconfont icon-face2"></span>
                             </div>
                             <div className="textWrap">表情</div>
                             <div className="arrow">
                                 <span className="iconfont icon-arrow-right"></span>
                             </div>
                         </div>
                    </div>
                    <div className="items-wrap">
                         <div className="user-item">
                             <div className="icon-wrap">
                                <span  style={{fontSize:'.2rem'}} className="iconfont icon-setting"></span>
                             </div>
                             <div className="textWrap">设置</div>
                             <div className="arrow">
                                 <span className="iconfont icon-arrow-right"></span>
                             </div>
                         </div>
                    </div>
                </div>
                <Footer />
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
export default connect(mapStateToProps)(User)