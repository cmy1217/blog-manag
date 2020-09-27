import {sendLoign,sendUserLogin} from '../api/index'
import Local from '../utils/storageUtils'
import {message} from 'antd'


const getLogin = (data) =>{
  return ({
      type:'set_login',
      data
  })
}

export const deleteLogin = () =>{
  return({
    type:'delete_login'
  })
}



export const login = (username,password,LogSetion) =>{
    return async dispatch =>{
        if(LogSetion==='admin'){
            const response = await sendLoign(username,password)
            if(response.state){
              Local.saveUser(response)
              dispatch(getLogin(response))
              message.success(response.msg)
             
            }else{
              message.error(response.msg)
            }
          }else if(LogSetion==='user'){
            const response = await sendUserLogin(username,password)
            if(response.state){
              Local.saveUser(response)
              dispatch(getLogin(response))
              message.success(response.msg)
             
            }else{
              message.error(response.msg)
            }
          }else{
            message.error('登录失败')
          }
    
    }
}