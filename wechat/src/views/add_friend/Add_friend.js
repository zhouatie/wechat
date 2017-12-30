import React, { Component } from "react"
import './add_friend.css'
import Header from '../header/Header.js'
import { connect } from 'react-redux'
import { SearchBar, Toast } from 'antd-mobile';
import axios from 'axios'

class Add_friend extends Component {
    constructor(props) {
        super(props);

    }
    state = {
        value: '',
        search_lists: []
    };
    // componentDidMount() {
    //     this.autoFocusInst.focus();
    // }
    successToast = function () {
        Toast.success('Load success !!!', 1);
    }
    failToast = function () {
        Toast.fail('Load failed !!!', 1);
    }
    onSubmit = (value) => {
        let _this = this;
        if (!value ) return this.setState({ search_lists: [] });

        axios.post('/getUsers', { username: value }).then((res) => {
            this.setState({ search_lists: res.data.userInfo });
        })
    }
    onChange = (value) => {
        this.setState({ value });
        this.onSubmit(value);
    }
    clear = () => {
        this.setState({ value: '' });
    }
    handleClick = () => {
        this.manualFocusInst.focus();
    }
    onAdd_friend = (obj) => {
        let data = { id: obj._id,nickname:obj.nickname };
        console.log(data);
        axios.post('/makeFriend',data ).then(res => {
            if(res.data.status=='success'){
                this.props.dispatch({type:"ADD_FRIEND",data:data})
                this.setState({value:" ",search_lists:[]});
                this.successToast();
            }else {
                this.failToast();
            }
        })
    }
    componentWillMount() {

    }
    render() {

        return (
            <div id="friends">
                <Header title="添加朋友" />
                <div style={{ fontSize: 14 }}>
                    <SearchBar
                        value={this.state.value}
                        placeholder="搜索"
                        onSubmit={this.onSubmit}
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <div style={{ marginTop: ".1rem" }} className="friend_lists">
                        {
                            this.state.search_lists.map((obj, index) => {
                                return (
                                    <div onClick={() => {
                                        this.onAdd_friend(obj)
                                    }} key={index} className="friend_list">
                                        <div className="friend_list_logoWrap">
                                            <img className="friend_list_logo" src={obj.logo_src ? obj.logo_src : "./image/icon_moren_face.png"} alt="" />
                                        </div>
                                        <div className="friend_name">{obj.username}</div>
                                    </div>
                                )
                            }, this)
                        }
                    </div>

                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        list_arr: state.userlists ? state.userlists : []
    }
}

export default connect(mapStateToProps)(Add_friend);