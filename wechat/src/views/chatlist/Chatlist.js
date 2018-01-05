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

  componentWillMount() {

  }
  render() {
    console.log(this.props.chatlists, '56789');
    let chatlists = this.props.chatlists;

    let lists = Object.keys(chatlists);

    let listItems = lists.map((value,index) =>
      <List key={index}
        list_obj={chatlists[value]} />
    );
    console.log(listItems,'length')
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
          {listItems}
        </div>
        <Footer />
      </div>
    );
  }
}

let mapStatesToProps = (state) => {
  console.log(state, '?')
  return {
    chatlists: state.save_info.rooms
  }
}

export default connect(mapStatesToProps)(Chatlist);
