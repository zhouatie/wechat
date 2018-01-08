import React, { Component } from 'react';
import './chatlist.css'
import Header from '../header/Header.js';
import Footer from '../footer/Footer.js';
import List from './List.js'
import { connect } from 'react-redux'
import { SearchBar, Toast } from 'antd-mobile';
import axios from 'axios'

class Chatlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }
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
  toChat = (id) => {
    let obj = this.props.friends.find(o => o.id == id)
    this.props.history.push({
      pathname: "/chat",
      params: {
        friend: obj
      }
    })
  }
  componentDidMount() {
    window.socket._callbacks.$common_message = [];
    let _this = this;

    window.socket.on("common_message", function (from_id, to_id, data) {
      if (window.location.pathname == "/chat" || to_id != _this.props.self_id) return false;
      let from_person = _this.props.friends.find(o => o.id == from_id);

      let info_data = {
        room_id: from_id,
        nickname: from_person.nickname,
        date: new Date().getTime(),
        info: data,
        username: from_person.username,
        logo: from_person.logo,
        has_read: false,
      }

      window.store.dispatch({ type: "ADD_CHATS", data: info_data })
    })

  }
  componentWillUnmount() {

  }

  render() {
    return (
      <div id="chatlist">
        <Header field={{ title: '微信', path: "/chatlist" }} />
        <div style={{ fontSize: 14 }}>
          <SearchBar
            value={this.state.value}
            placeholder="搜索"
            onSubmit={this.onSubmit}
            onChange={this.onChange}
          />
        </div>
        <div className="listWrap">
          {
            this.props.chatlists.map((obj, index) =>
              <List onChat={this.toChat} key={index}
                list_obj={obj} />
            )
          }
        </div>
        <Footer />
      </div>
    );
  }
}

let mapStatesToProps = (state) => {
  return {
    self_id: state.save_info._id,
    chatlists: state.save_info.rooms,
    friends: state.save_info.friends
  }
}

export default connect(mapStatesToProps)(Chatlist);
