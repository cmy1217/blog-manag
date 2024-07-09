import axios from 'axios'
import {message} from 'antd'
axios.defaults.baseURL='/network'
export default function(url, data={}, type='post') {
    return new Promise((resolve,reject)=>{
        let promise
        if(type==='GET'){
            promise = axios.get(url,{
                params:data
            })
        }else{
            promise = axios.post(url,data)
        }
        promise.then(response=>{
            resolve(response.data)
        }).catch(err=>{
          message.error(err.message)
        })
    })

}