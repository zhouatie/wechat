import React, { Component } from 'react'
import './uploadLogo.css'
import Header from '../header/Header.js'
import { connect } from 'react-redux'
import { ActionSheet, Toast } from 'antd-mobile';



const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

class UploadLogo extends Component {
    successToast(value) {
        Toast.success(value, 2);
    }
    failToast(value) {
        Toast.fail(value, 2);
    }

    showActionSheet = () => {
        const BUTTONS = ['拍照', '从手机相册选择', '保存图片', '关闭', '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            destructiveButtonIndex: BUTTONS.length - 2,
            // title: 'title',
            maskClosable: true,
            'data-seed': 'logId',
            wrapProps,
        },
            (buttonIndex) => {
                if (buttonIndex === 2) {
                    
                }
            });
    }


    render() {
        return (
            <div id="uploadLogo">
                <Header onOption={this.showActionSheet} field={{ title: '个人头像', path: "/uploadLogo" }} />
                <div className="uploadBg">
                    <img src={this.props.self_logo} alt=""/>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        self_logo: state.save_info.logo
    }
}

export default connect(mapStateToProps)(UploadLogo)