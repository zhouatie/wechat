import React, { Component } from 'react'
import Header from '../header/Header.js'
import Footer from '../footer/Footer.js'

import { connect } from 'react-redux'

class Search extends Component {
    render() {
        return (
            <div id="search">
                <Header field={{ title: '发现', path: "/search" }} />
                <div>
                    search
                </div>
                <Footer/>
            </div>
        )
    }
}

export default connect()(Search)