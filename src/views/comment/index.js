import React, { Component } from 'react'
import {getComment,deleteComment} from '../../api'
import {ExclamationCircleFilled } from '@ant-design/icons'
import { Card, Button, Modal, Table,  message} from 'antd';
import './style.less'
export default class Comment extends Component {
    state={
        comment:[],
        page:1
    }
    getComment =  (arr) =>{
        Modal.confirm({
          title: '系统提示',
          icon: <ExclamationCircleFilled />,
          content: '你想要删除这条评论吗?',
          onOk:async ()=> {
            const result = await deleteComment(arr.id)
            const {state,msg} = result
            if(state){
              message.success(msg)
              this.setCommnet()
            }else{
              message.error(msg)
            }
          },
  
        })
      }
    render() {
        const title = (
            <span>
             用户评论
            </span>
          )
        return (
            <Card title={title} style={{minHeight:600}} className="comment-card">
               <Table
                className="comment-table"
               rowKey='id'
               bordered
               loading={this.state.loading}
               dataSource={this.state.comment} 
               columns={this.columns} 
               pagination={{
                 defaultCurrent:this.state.page,
                 defaultPageSize:5,
                 showQuickJumper:true,
                }}
               />

              </Card>
        )
    }
    setCommnet = async () =>{
        const result = await getComment()
        this.setState({comment:result})
    }

    UNSAFE_componentWillMount(){
        this.initColumns()
    }

    componentDidMount(){
        this.setCommnet()
    }

    initColumns = ()=>{
        this.columns = [
            {
              title: '评论者',
              dataIndex: 'name',
            },
            {
              title: '评论',
              dataIndex: 'text',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
            {
                title: '文章',
                dataIndex: 'blogfor',
            },
            {
              title: '操作',
              width:300,
              render:(arr)=> (
                <span>
                    <Button type="primary"
                    danger
                    style={{marginLeft:"70px"}} 
                     onClick={()=>{this.getComment(arr)}} 
                     >删除
                    </Button>
                   
                </span>
              ),
            },
           
          ]
    }
}
