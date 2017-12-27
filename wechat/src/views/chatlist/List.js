import React, { Component } from 'react';
import './list.css'

class List extends Component {
    render () {
        return (
            <div className="list">
                <div className="list_logo_wrap">
                    <img src="" alt=""/>
                </div>
                <div className="list_text_wrap">
                    <div className="list_title">
                        <span className="list_title_text">12</span>
                        <span className="list_time">下午8:24</span>
                    </div>
                    <div className="list_content">33333</div>
                </div>
            </div>
        )
    }
}

export default List;