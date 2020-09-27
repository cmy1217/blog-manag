import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';

import {Card} from 'antd'
class Pie extends Component {
    state={
        cation:["学习笔记","环境搭建","知识总结","日记"],
        num:[220,150,200,250]   
      }
    getOption = (cation,num) =>{  
        return {
           
                backgroundColor: '#2c343c',
            
                title: {
                    text: '文章饼形图',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#ccc'
                    }
                },
            
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
            
                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series: [
                    {
                        name: '分类数量',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: [
                            {value: num[0], name: cation[0]},
                            {value: num[1], name: cation[1]},
                            {value: num[2], name: cation[2]},
                            {value: num[3], name: cation[0]},
                    
                        ].sort(function (a, b) { return a.value - b.value; }),
                        roseType: 'radius',
                        label: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        labelLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        },
                        itemStyle: {
                            color: '#c23531',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
            
                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
            
        }
    }
    render() {
        const title = (
            <span style={{color:"#1DA57A"}}>
                博客文章
            </span>
        )
        return (
            <Card title={title} style={{minHeight:"500px"}}>
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
export default  Pie