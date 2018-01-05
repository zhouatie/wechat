import React, { Component } from 'react';
import './list.css'

class List extends Component {
    render () {
        console.log(this.props,'22')
        return (
            <div className="list">
                <div className="list_logo_wrap">
                    <img src={this.props.list_obj.logo} alt=""/>
                </div>
                <div className="list_text_wrap">
                    <div className="list_title">
                        <span className="list_title_text">{this.props.list_obj.nickname}</span>
                        <span className="list_time">{this.props.list_obj.date}</span>
                    </div>
                    <div className="list_content">{this.props.list_obj[this.props.list_obj.length-1].info}</div>
                </div>
            </div>
        )
    }
}

export default List;