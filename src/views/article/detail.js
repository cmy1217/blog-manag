import React, { Component } from 'react'
import {Card, List, } from 'antd'
import RichMarkdown from './richmarkdown'
import {ArrowLeftOutlined} from '@ant-design/icons'
import {withRouter} from 'react-router-dom'
const Item = List.Item
class Detail extends Component {
    render() {
        const {title,hit,cation,description,tag,timer,url,md} = this.props.location.state
        const Ctitle = (
            
            <span> 
                <ArrowLeftOutlined 
                style={{color:"#1DA57A",margin:"0 15px"}}
                onClick={()=>{
                    this.props.history.goBack()
                }} />
                文章详情
            </span>
        )
        return (
          <Card title={Ctitle} className="article-detail">
            <List>
                <Item>
                    <span className="left">文章名</span>
                    <span className="right">{title}</span>
                </Item>
                <Item>
                    <span className="left">描述</span>
                    <span className="right">{description}</span>
                </Item>
                <Item>
                    <span className="left">分类</span>
                    <span className="right">{cation}</span>
                </Item>
                <Item>
                    <span className="left">标签</span>
                    <span className="right">{tag}</span>
                </Item>
                <Item>
                    <span className="left">时间</span>
                    <span className="right">{timer}</span>
                </Item>
                <Item>
                    <span className="left">点击数</span>
                    <span className="right">{hit}</span>
                </Item>
                <Item>
                    <span className="left">配图</span>
                    <span className="right"><img src={`${url}`} alt=""/></span>
                    
                </Item>
               
                    <RichMarkdown md={md} disable={true}/>
              
              
            </List>
          </Card>
        )
    }
}
export default withRouter(Detail)
