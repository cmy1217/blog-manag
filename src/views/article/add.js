import React, { Component } from 'react'
import {Card, Form, Input, Button, Radio, message  } from 'antd'
import {withRouter} from 'react-router-dom'
import {ArrowLeftOutlined} from '@ant-design/icons'
import RichMarkdown from './richmarkdown'
import {addArticle} from '../../api'
const {Item} = Form
const {TextArea} = Input


class UpdateAndAdd extends Component {

    formRef = React.createRef();
    richmarkdown = React.createRef();

    onFinish = async (value) =>{
      let md = this.richmarkdown.current.state.value
      const result = await addArticle({value,md})
      const {state, msg} = result
      if(state){
        this.formRef.current.resetFields()
        message.success(msg)
      }
      else{
        message.error(msg)
      }
    }

    

    render() {
        const {state} = this.props.location 
        const Ctitle = (
            <span> 
                <ArrowLeftOutlined 
                style={{color:"#1DA57A",margin:"0 15px"}}
                onClick={()=>{
                    this.props.history.goBack()
                }} />
                写文章
            </span>
        )
        const formItemLayout = {
            labelCol: {
              span: 0,
            },
            wrapperCol: {
              span: 20,
            },
          };
        return (
           <Card title={Ctitle}> 
             <Form 
              ref={this.formRef}
             {...formItemLayout} 
             onFinish={this.onFinish}
             
            >
                <Item name="title"
                
                initialValue={state?`${state.title}`:''} 
                label="文章名" 
                rules={
                [{required:true,message:'文章名不能为空'},
                ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || value.length>=2) {
                        return Promise.resolve();
                      }
                      return Promise.reject('文章名不能小于两位!');
                    },
                  }),
                ]
                }
                
                >
                   
                  <Input placeholder="请输入文章名" bordered={false}></Input>
                </Item>
                <Item
                name="desc" 
                label="文章描述"
                initialValue={state?`${state.description}`:''}
                rules={
                    [{required:true,message:'文章描述不能为空'}]
                    }>
                  <TextArea placeholder="请输入文章描述" bordered={false} autoSize={{minRows:2,maxRows:6}}></TextArea>
                </Item>
                
                <Item
                name="cation"
                label='分类选择'
                initialValue={state?`${state.cation}`:''}
                rules={[
                  {required:true,message:'分类的选择是必要的'}
                ]}
                >
                   <Radio.Group    >
                    <Radio.Button value="学习笔记">学习笔记</Radio.Button>
                    <Radio.Button value="环境搭建">环境搭建</Radio.Button>
                    <Radio.Button value="知识总结">知识总结</Radio.Button>
                    <Radio.Button value="日记">日记</Radio.Button>
                   </Radio.Group>
                </Item>
                
                <Item
                name="tag" 
                label="标签"
                initialValue={state?`${state.tag}`:''}
                rules={
                    [{required:true,message:'至少要有一个标签'}]
                    }>
                  <TextArea placeholder="多个标签使用空格隔开" bordered={false} autoSize={{minRows:2,maxRows:6}}></TextArea>
                </Item>
                
                <Item
                name="url" 
                label="图片"
                initialValue={state?`${state.url}`:''}
                rules={
                    [{required:true,message:'图片地址是必须的'}]
                    }>
                  <TextArea placeholder="建议使用图床地址" bordered={false} autoSize={{minRows:2,maxRows:6}}></TextArea>
                </Item>

                <Item
                name="md" 
                wrapperCol={24}
                
                >
                 <RichMarkdown md={state?state.md:null} ref={this.richmarkdown}/>
                </Item>
                <div style={{width:"100%",textAlign:"right"}}>
                <Button type="primary" htmlType="submit">提交</Button>
                </div>
                
             </Form>
           </Card>
        )
      
    }
   
}
export default  withRouter(UpdateAndAdd)