import React, { Component } from 'react'
import {Card, Statistic, Row, Col, Timeline } from 'antd'
import ReactEcharts from 'echarts-for-react';
import getData from '../../utils/timer'
import {getHit,getSum} from '../../api'
import {ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons'
import './style.less'
class Home extends Component {
    state={
        data : [],
        time:[],
        sum:0
    }
    render() {
        return (
            <Card style={{minHeight:"650px"}}>
            <div style ={{display:"flex"}} >
            <Card size="small" title="文章总数" style={{ width: 300 ,flex:2,height:"200px",marginTop:30}}>
                 <Row gutter={16}>
                  <Col span={24}>
                    <Statistic value={this.state.sum} suffix="篇" />
                  </Col>
                  <Col span={244}> 
                  <Statistic
                    prefix="周同比"
                    value={`11.2%`}
                    precision={2}
                    valueStyle={{ color: '#3f8600',fontSize:14 }}
                    suffix={<ArrowUpOutlined />}
                  />
                  </Col>

                  <Col span={22}>
                  <Statistic
                    value={`9.30%`}
                    precision={2}
                    valueStyle={{ color: '#cf1322' ,fontSize:14 }}
                    prefix="日同比"
                    suffix={<ArrowDownOutlined />}
                  />
                  </Col>
                </Row>
              </Card>
              <ReactEcharts  style={{width:"800px",flex:6}} option={this.getOption()} />
            </div>
            
            <Card title="任务" className="home-card" >
                <div style={{display:"flex"}}>
                <Card 
                size="small" 
                title="留言数" 
                style={{width:500,flex:8}} 
                className="home-message">
                    <ReactEcharts option={this.getOptionT()}/>
                </Card>
                <Card size="small" className="home-info" title="任务" style={{width:300,flex:3,marginLeft:40}}>
                <Timeline>
                  <Timeline.Item color="green">新版本迭代</Timeline.Item>
                  <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
                  <Timeline.Item color="red">
                    <p>写接口</p>
                    <p>功能验收</p>
                  </Timeline.Item>
                  <Timeline.Item>
                    <p>登录功能设计</p>
                    <p>权限验证</p>
                    <p>页面排版</p>
                  </Timeline.Item>
                
                 
                </Timeline>
                </Card>
                </div>
               
             </Card>
          
            
            </Card>
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