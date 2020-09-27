import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import {getCationNum} from '../../api'
 import {Card} from 'antd'
class Bar extends Component {
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
               data: cation
           },
           yAxis: {},
           series: [{
               name: '数量',
               type: 'bar',
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
            <Card title={title} style={{height:"100%"}}>
                <ReactEcharts style={{minHeight:"500px"}} option={this.getOption(this.state.cation,this.state.num)} />
            </Card> 
        )
    }
    componentDidMount(){
        this.setCation()
    }

    setCation = async () =>{
        const arr = await getCationNum()
            let cation = []
            let num = []
            arr.map(item=>{
                cation.push(item.cation)
                num.push(item.num)
                return 1
            })
            this.setState({cation,num})
        
       
    }
}
export default  Bar