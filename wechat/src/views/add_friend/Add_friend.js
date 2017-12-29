import React,{Component} from "react"
import './add_friend.css'
import Header from '../header/Header.js'
import { connect } from 'react-redux'

class Add_friend extends Component {
    constructor(props){
        super(props);
        
    }
    componentWillMount(){
        
    }
    render(){
        return (
            <div id="friends">
                <Header title="添加朋友"/>
                <div>
                    tianjaipengyou
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        list_arr : state.userlists? state.userlists:[]
    }
}

export default connect(mapStateToProps)(Add_friend);