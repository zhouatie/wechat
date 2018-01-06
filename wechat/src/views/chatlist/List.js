import React, { Component } from 'react';
import './list.css'

class List extends Component {
    constructor(props){
        super(props)
    }
    changeDate(date){
        return date.toLocaleString();
    }
    render () {

        let info_arr = Object.values(this.props.list_obj)[0];
        let last_info = info_arr[info_arr.length-1];

        return (
            <div className="list">
                <div className="list_logo_wrap">
                    <img src={last_info.logo} alt=""/>
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