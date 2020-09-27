import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';

import {Card} from 'antd'
class Line extends Component {
    state={
      cation:["学习笔记","环境搭建","知识总结","日记"],
      num:[12,15,20,3]   
    }
    getOption = (cation,num) =>{
        return{
           
           title: {
               text: '分类文章数量'
           },
           tooltip: {},
           legend: {
               data:['数量']
           },
           xAxis: {
               data:cation
           },
           yAxis: {},
           series: [{
               name: '数量',
               type: 'line',
               data: num
           }]
            
    
        }
    }
    render() {
        const title = (
            <span style={{color:"#1DA57A"}}>
                博客文章
            </span>
        )
        return (
            <Card title={title} >
                <ReactEcharts style={{minHeight:"500px"}} option={this.getOption(this.state.cation,this.state.num)} />
            </Card> 
        )
    }
    componentDidMount(){
        this.setCation()
    }

    setCation =  () =>{
       
       
       
    }
}

export default Line