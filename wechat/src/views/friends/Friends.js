import React, { Component } from "react"
import './friends.css'
import Header from '../header/Header.js'
import Footer from '../footer/Footer.js'
import { connect } from 'react-redux'
import { SearchBar, Toast } from 'antd-mobile';
import axios from 'axios'


class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:""
        }
    }
    toUserCard = (id) => {
        console.log(id,'Friends.js');
        this.props.history.push({
            pathname:"/userCard",
            params:{
                id:id
            }
        })
    }
    successToast = function () {
        Toast.success('Load success !!!', 1);
    }
    failToast = function () {
        Toast.fail('Load failed !!!', 1);
    }
    onSubmit = (value) => {
        let _this = this;
        // if (!value ) return this.setState({ search_lists: [] });

        // axios.post('/getUsers', { username: value }).then((res) => {
        //     this.setState({ search_lists: res.data.userInfo });
        // })
    }
    onChange = (value) => {
        this.setState({ value });
        this.onSubmit(value);
    }
    clear = () => {
        this.setState({ value: '' });
    }
    
    componentWillMount() {

    }

    
    render() {
        console.log(this.props,'props')
        return (
            <div id="friends">
                <Header title="通讯录" />
                <div>
                    <div style={{ fontSize: 14 }}>
                        <SearchBar
                            value={this.state.value}
                            placeholder="搜索"
                            onSubmit={this.onSubmit}
                            onChange={this.onChange}
                        />
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
                            <div onClick={()=>{this.toUserCard(list.id)}} key={index} className="friend_list">
                                <div className="friend_list_logoWrap">
                                    <img className="friend_list_logo" src="./image/icon_moren_face.png" alt="" />
                                </div>
                                <div className="friend_name">{list.nickname}</div>
                            </div>
                        ,this)}
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