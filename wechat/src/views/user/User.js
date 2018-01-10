import React, { Component } from 'react'
import Header from '../header/Header.js'
import Footer from '../footer/Footer.js'
import { connect } from 'react-redux'

class User extends Component {
    render(){
        return (
            <div id='user'>
                <Header field={{ title: '我', path: "/user" }} />
                <div>
                    223
                </div>
                <Footer/>
            </div>
        )
    }
}

export default connect()(User)