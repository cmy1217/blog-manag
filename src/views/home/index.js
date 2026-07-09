import React, { Component } from 'react'
import {Card, Statistic, Row, Col, Timeline } from 'antd'
import ReactEcharts from 'echarts-for-react';
import getData from '../../utils/timer'
import {getHit,getSum} from '../../api'
import {ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons'
import './style.less'
import BuilLog from './BuilLog';
class Home extends Component {
    state={
        data : [],
        time:[],
        sum:0
    }
    render() {
        return (
            <BuilLog/>
        )
    }
    componentDidMount(){
        this.setHit()
        this.setNum()
    }
    setNum = async () =>{
     const sum = await getSum()
     this.setState({sum:sum.sum})
    }


    setHit = async () =>{
        const result = await getHit()
        let data = []
        let time = []
        result.map(item=>{
            time.push(parseInt(item.hit))
            data.push(getData(parseInt(item.timer/1000),0))
            return 1
        })
        
        this.setState({data,time})

    }

    getOption = () =>{
      return{
        title:{
            text:'网站点击数'
        },
        xAxis: {
            type: 'category',
            data: this.state.data.sort()
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: this.state.time,
            type: 'line'
        }]
      }     
    }

    getOptionT = () =>{
        return{
            xAxis: {
                type: 'category',
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130, 200, 150, 80, 70, 110],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(220, 220, 220, 0.8)'
                }
            }]
        }
    }
    
    
}
export default Home