import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../../redux/actions'
import { Form, Input, Button, Radio  } from 'antd';
import { UserOutlined, LockOutlined, KeyOutlined } from '@ant-design/icons';
/*eslint-disable*/
class LoginForm extends Component {
  state={
    code:''
  }
    render() {
        const user = this.props.user
        if(user&&user.id){
          return <Redirect to='/manag/home'></Redirect>
        }
        return (
            <div className="login-form-one">
                {this.NormalLoginForm()}
            </div>
        )
    }

    

    NormalLoginForm = () => {
    const onFinish = async values => {
      const {username,password,LogSetion} = values
      this.props.login(username,password,LogSetion)
    };
    
  
  
    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        
      >
        <Form.Item
          name="username"
          rules={[
            {required: true,message: '用户名不能为空!',},
            {min:4,message:'用户名至少四位',},
            {max:12,message:'用户名最多十二位'},
            {
              pattern:/^[a-zA-Z0-9_]+$/,
              message:'用户名必须是数字字母下划线'
            }
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '密码不能为空!',
            },
            {
              min:4,
              message:'密码最少4位'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item
         name="code"
         rules={[
           {validator:(rule,value)=> this.handelCode(value)}
         ]}
        >
          <Input
            prefix={<KeyOutlined />}
            type="text"
            placeholder="验证码"
            
          />
         
        </Form.Item>
        <canvas id="code" onClick={()=> this.setCode()} className="code" ></canvas>
        <Form.Item
          name="LogSetion"
          initialValue="admin"
        >
          <Radio.Group  className="radio-login"  buttonStyle="outline">
           <Radio.Button value="admin">管理员登录</Radio.Button>
           <Radio.Button value="user">用户登录</Radio.Button>
          </Radio.Group>
        </Form.Item>
         
         <Form.Item>
         <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
       
         </Form.Item>
      </Form>
    );
  };
  handelCode = (value) =>{
    if(value===this.state.code){
      return Promise.resolve()
    }
    else{
      return Promise.reject('请匹配验证码')
    }
    
  }


  setCode = () =>{
    let canvas = document.getElementById('code')
    let paint = canvas.getContext("2d")
    canvas.height = canvas.height
    paint.font = "oblique small-caps normal 102px arial"
    paint.fillStyle = "#ffffff"
    paint.fillText(this.getCode(),30,100)
  }


  getCode = () =>{
    let str = '0123456789zxcvbnmasdfghjklpoiuytrewq'
    let code = ''
    for (let i = 0; i < 4; i++) {
      code = code+str.charAt(parseInt(Math.random()*34))
      
    }
    this.setState({code})
    return code
  }

  componentDidMount(){
    this.setCode()
  }

}








export default connect(
  state =>({user:state.user}),
  {login}
)(LoginForm)