import React,{Component} from 'react'
import './userCard.css'
import Header from '../header/Header.js'

class InfoCard extends Component {
    constructor(props){
        super(props)
        console.log(props,'usercard')
    }
    toChat = () => {
        this.props.history.replace({
            pathname:'/chat',
            params:{
                id:this.props.history.location.params.id
            }
        });
    }

    render(){
        return (
            <div id='userCard'>
                <Header  field={{title:'详细资料',path:"/userCard"}} />
                <div onClick={this.toChat} className="green_btn">发消息</div>
            </div>
        )
    }
}

export default InfoCard;