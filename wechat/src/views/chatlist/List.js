import React, { Component } from 'react';
import './list.css'

class List extends Component {
    constructor(props) {
        super(props)
    }
    changeDate(date) {
        return new Date(date).toLocaleTimeString().slice(0,-3);
    }
    render() {

        let info_arr = Object.values(this.props.list_obj)[0],
            len = Object.values(info_arr).filter(o => !o.has_read).length,
            last_info = info_arr[info_arr.length - 1];
        let num_style = len > 0 ? { "display": 'block' } : { "display": 'none' };
        return (
            <div onClick={() => { this.props.onChat(last_info.room_id) }} className="list">
                <div className="list_logo_wrap">
                    <img src={last_info.logo} alt="" />
                    <span style={num_style} className="newInfo_num">{len}</span>
                </div>
                <div className="list_text_wrap">
                    <div className="list_title">
                        <span className="list_title_text">{last_info.nickname}</span>
                        <span className="list_time">{this.changeDate(last_info.date)}</span>
                    </div>
                    <div className="list_content">{last_info.info}</div>
                </div>
            </div>
        )
    }
}

export default List;