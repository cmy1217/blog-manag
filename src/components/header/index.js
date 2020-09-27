import React, { Component } from 'react'
import './style.css'
import {withRouter} from 'react-router-dom'

import {getWeather} from '../../api'
import {connect} from 'react-redux'
import setnow from '../../utils/timer'
import {deleteLogin} from '../../redux/actions'
import storageUtils from '../../utils/storageUtils'
import LinkButton from '../../components/link-button'
import { Modal } from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons'
class Header extends Component {
    state={
        timer:'',
        dayPictureUrl:'',
        weather:''
    }


    setWeather = async ()=>{
      const {dayPictureUrl,weather} = await getWeather('河南')
      this.setState({dayPictureUrl,weather})
    }

    getTime = ()=>{
     this.interval = setInterval(()=>{
        const timer =  setnow(parseInt(Date.now()/1000) ,1)
        this.setState({timer})
      },1000)
     
    }

 
    
    handelExit = ()=>{
        Modal.confirm({
            title: '系统提示',
            icon: <ExclamationCircleOutlined />,
            content: '你想要退出吗?',
            onOk:()=> {
              storageUtils.removeUser()
              this.props.deleteLogin()
              this.props.history.replace('/manag')
            },
            onCancel() {
             
            },
          });
       
    }


    componentDidMount(){
        this.setWeather()
        this.getTime()
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    render() {

        const name = this.props.user.name

        return (
            <div className="header">
                <div className="header-top">
                  <span>欢迎 <span>{name}</span> </span>
                  
                  <LinkButton href="javascrip:" onClick={this.handelExit}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <h2>每一个不曾起舞的日子，都是对生命的辜负。</h2>
                    <div>
                        <span>{this.state.timer}</span>
                        <img src={this.state.dayPictureUrl} alt=""/>
                        <span>{this.state.weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {deleteLogin}
)(withRouter(Header)) 
