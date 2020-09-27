import React, { Component } from 'react'
import { Card, Button, Modal, Table, Select, Input, message} from 'antd';
import {EditFilled,ExclamationCircleFilled } from '@ant-design/icons'
import {getArticle, deleteArticle, getByCation} from '../../api'
import {Link} from 'react-router-dom'
import timer from '../../utils/timer'
const Option = Select.Option
export default class Article extends Component {
    state={
        article:[],
        loading:true,
        page:1,
        total:0,
        searchValue:''
    }

    setArticle =  (page=1,value='')=>{
        this.setState({loading:true},async ()=>{
          let set
        if(this.state.searchValue!==''){
           set = await getByCation(value,1,5)
           this.setState({page})
        }else{

           set = await getArticle(page,5)
          
        }
        const {total,data} = set
       
        const article = data.map(item=>{
            item.timer = timer(parseInt(item.timer/1000),0)
            return item
        })
        
        this.setState({article,total,page,loading:false})
        })
        
    }
    getComment =  (arr) =>{
      Modal.confirm({
        title: '系统提示',
        icon: <ExclamationCircleFilled />,
        content: '你想要删除此篇文章吗?',
        onOk:async ()=> {
          const result = await deleteArticle(arr.id)
          const {state,msg} = result
          let newPage
          if((this.state.page-1)*5===this.state.total-1){
            newPage = this.state.page-1
          }else{
            newPage = this.state.page
          }
      
          if(state){
            message.success(msg)
            this.setArticle(newPage)
          }else{
            message.error(msg)
          }
        },

      })
    }




    initColumns = ()=>{
        this.columns = [
            {
              title: '文章',
              dataIndex: 'title',
              key: 'title',
            },
            {
              title: '分类',
              dataIndex: 'cation',
              key: 'cation',
            },
            {
              title: '详情',
              render:(h)=> (
                <Link to={{pathname:"/manag/article/detail",state:h}}>文章详情</Link>
              )
            },
          
            {
              title: '操作',
              width:300,
              render:(arr)=> (
                <span className="arricle-span">
                    <Link  to={{pathname:'/manag/article/add',state:arr}}>
                    <Button type="primary"
                      style={{marginLeft:"20px"}}
                     
                    >修改
                    </Button>
                    </Link>
                   
                    <Button type="primary"
                    danger
                    style={{marginLeft:"70px"}} 
                    className="article-delete"
                     onClick={()=>{this.getComment(arr)}} 
                     >删除
                    </Button>
                   
                </span>
              ),
            },
           
          ]
    }

    UNSAFE_componentWillMount(){
        this.initColumns()
    }

    componentDidMount(){
        this.setArticle(this.state.page,'')
    }
    render() {
        const title = (
          <span>
            <Select className="article-select" value='1' style={{width:150}}>
              <Option value='1'>分类搜索</Option>
              <Option value='2'>文章名搜索</Option>
            </Select>
            <Input 
            placeholder="关键字" 
            style={{width:150,margin:"0 15px"}}
            onChange={(e)=>{this.setState({searchValue:e.target.value})}}
            ></Input>
            <Button type="primary" onClick={()=>{this.setArticle(1,this.state.searchValue)}}>搜索</Button> 
          </span>
        )
        const extra = (
          <Link to="/manag/article/add">
            <Button type="primary" icon={<EditFilled />} >
                写文章
            </Button>
          </Link>
            
        )
         const {total} = this.state
          
        return (
            <div>
              <Card 
               title={title}
               extra={extra} 
               style={{minHeight:600}}
               className="article-card"
               >
               <Table
               rowKey='id'
               bordered
               loading={this.state.loading}
               dataSource={this.state.article} 
               columns={this.columns} 
               pagination={{
                 total,
                 current:this.state.page,
                 defaultPageSize:5,
                 showQuickJumper:true,
                 onChange:(page)=>{this.setArticle(page,'')}
                }}
               />

              </Card>
            </div>
        )
       
    }
}
