import axios from './axios'
import jsopn from 'jsonp'
import {message} from 'antd'

export const sendLoign = (username,password) => axios('/clogin',{username,password},'POST')

export const sendUserLogin = (username,password) => axios('/clogin/user',{username,password},'POST')

export const getArticle = (page,num) => axios('/carticle',{page,num})

export const getCationNum = () => axios('/ccharts')

export const getByCation = (cation,page,num) => axios('/carticle/search',{cation,page,num})

export const deleteArticle = (id) => axios('/carticle/delete',{id})

export const addArticle = ({md,value}) => axios('/carticle/add',{md,value},'POST')

export const getRole = (page,num) => axios('/crole',{page,num})

export const addRole = (value) => axios('/crole/add',value,'POST')

export const powerRole = (arr,id,name) => axios('/crole/power',{arr,id,name},'POST')

export const getHit = () => axios('/chome')

export const getSum = () => axios('/chome/sum')

export const getComment = () => axios('/ccomment')

export const deleteComment = (id) => axios('/ccomment/delete',{id})

export const deldteRole = (id) => axios('/crole/delete',{id})

export const getWeather = (city) =>{
    return new Promise((resolve,reject)=>{
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsopn(url,{},(err,data)=>{
            if(!err){
                const {dayPictureUrl,weather} = data.results[0].weather_data[0]
                resolve({dayPictureUrl,weather})
            }else{
                message.error('获取天气失败')
            }
        })
    })
   
}
