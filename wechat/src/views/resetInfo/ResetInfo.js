import React, { Component } from "react"
import './resetInfo.css'
import Header from '../header/Header.js'
import { connect } from 'react-redux'
import axios from 'axios'

class ResetInfo extends Component {
    componentDidMount(){
        console.log(this)
        this.refs.input.value = this.props.self_nickname;
    }
    save_username(){
        let val = this.refs.input.value;
        axios.post("/savenickname",{nickname:val,id:this.props.self_id}).then(res=>{
            this.props.dispatch({type:"SAVENICKNAME",data:{nickname:val}});
        })
    }
    render() {
        const style = { padding:"0 .1rem",borderTop: ".01rem solid #f0f0f0", borderBottom: ".01rem solid #f0f0f0", width: "100%", height: ".4rem", borderRadius: ".02rem" };
        return (
            <div id="resetInfo">
                <Header onSavename = {this.save_username.bind(this)} field={{ title: '设置姓名', path: "/resetInfo" }} />
                <div style={{ paddingTop: ".2rem" }}>
                    <input ref="input" style={style} type="text" />
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        self_nickname: state.save_info.nickname,
        self_id: state.save_info._id
    }
}

export default connect(mapStateToProps)(ResetInfo)