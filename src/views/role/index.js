import React, { Component } from 'react'
import {Card, Table, Button, Modal, Form, Input, message, Tree } from 'antd'
import {getRole, addRole, powerRole, deldteRole} from '../../api'
import {ExclamationCircleFilled } from '@ant-design/icons'
import getData from '../../utils/timer'
import {connect} from 'react-redux'
import './style.less'
const {Item} = Form
class Role extends Component {
    formRef = React.createRef();
    formRefT = React.createRef();
    state={
        role:[],
        loading:false,
        page:1,
        total:0,
        checked:0,
        visible: false,
        visibleT:false,
        peple:{},
        defalutS:[]
    }
    
    setRole =  (page=1,num=5) =>{
      this.setState({loading:true},async()=>{
        const result =  await  getRole(page,num)
        const {total,data} = result
        this.setState({total,role:data,peple:{},checked:0,page,loading:false})
      }) 
    }
    showModal = () => {
        this.setState({
          visible: true
        })
    }
    showModalT = () => {
        this.setState({
          visibleT: true
        })
    }
    
    handleOk = e => {
      this.formRef.current.validateFields().then( async value=>{
        const reslut = await addRole(value)
        const {state,msg} = reslut
        if(state){
         message.success(msg)
         this.formRef.current.resetFields()
         this.setState({visible: false},()=>{
             this.setRole(this.state.page)
         })
        }
        else{
         message.error(msg)
        }

        this.setState({
          visible: false
        })
      }).catch(err=>{

      })

    }

    handleOkT = async e => {
      const {id} = this.state.peple
      const result = await powerRole(this.state.defalutS,id,this.props.user.name)
      const {state,msg} = result
      if(state){
        message.success(msg)
        this.setRole(this.state.page)
        this.setState({visibleT:false})
      }
      else{
          message.error(msg)
      }
      
    }
    deleteCrole = async (arr) =>{
      Modal.confirm({
        title: '系统提示',
        icon: <ExclamationCircleFilled />,
        content: '你想要删除此人吗?',
        onOk:async ()=> {
          const result = await deldteRole(arr.id)
          const {state,msg} = result
          if(state){
            message.success(msg)
            this.setRole()
          }
          else{
            message.error(msg)
          }
        },

      })
     
    }

    handleCancel = e => {

        this.setState({
          visible: false
        })
    }

    handleCancelT = e => {

        this.setState({visibleT: false})
    }


    render() {
       
        const treeData = [
            {
              title: '所有权限',
              key: 'Croot',
              children: [
                {
                  title: '首页',
                  key: 'home',
                },
                {
                  title: '文章管理',
                  key: 'article',
                  
                },
                {
                  title: '角色管理',
                  key: 'role',
                },
                {
                  title: '评论管理',
                  key: 'comment',
                },
               
              ],
            },
          ];
        const {total} = this.state
        const {name} = this.state.peple
        const title = (
            <span>
                <Button type="primary" onClick={this.showModal}>创建角色</Button>&nbsp;&nbsp;&nbsp;
                <Button type="primary" onClick={this.showModalT} disabled={!name}>添加权限</Button>
            </span>
        )
        return (
           
           <Card title={title}>
              <Table
              className="roel-table"
              rowKey='id'
              bordered
              loading={this.state.loading}
              dataSource={this.state.role} 
              columns={this.columns} 
              rowSelection={{type:"radio",
              selectedRowKeys:[this.state.checked],
              onSelect:(role)=>{
                const {power} = role
                let arr = []
                arr.push(power.split(' ').filter(v=>v.length>0))
                this.setState({checked:role.id,peple:role,defalutS:arr[0]})
              }
            }}
              onRow={this.onRow}
              pagination={{
                defaultCurrent:1,
                total,
                defaultPageSize:5,
                showQuickJumper:true,
                onChange:(page,pagesize)=>this.setRole(page,5)
               }}
              />
              <Modal
                title="添加角色"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <Form 
                ref={this.formRef}
                labelCol={5} wrapperCol={10}>
                    <Item
                    name="name" 
                    label="角色名称"
                    rules={[{required:true,message:'角色名称不能为空'},
                            {max:24,message:'角色名称最多24位'},
                            {pattern:/^[0-9a-zA-Z_]+$/,message:'密码只能是数字字母下划线'}
                         ]}
                    >
                        <Input />
                    </Item>
 
                    <Item
                    name="password"
                    label="密码"
                    rules={[{required:true,message:'密码不能为空'},
                            {min:4,message:'密码至少四位'},
                            {max:12,message:'密码最多十二位'},
                            {pattern:/^[0-9a-zA-Z_]+$/,message:'密码只能是数字字母下划线'}
                          ]}
                    >
                        <Input type="password" style={{width:'93%',marginLeft:"7%"}} />
                    </Item>

                </Form>
               
              </Modal>

              <Modal
                title="设置角色权限"
                visible={this.state.visibleT}
                onOk={this.handleOkT}
                onCancel={this.handleCancelT}
              >
                <Form 
                ref={this.formRefT}
                labelCol={5} wrapperCol={10}>
                    <Item
                    name="name"
                    label="角色名称"
                    >
                      <Input placeholder={name} disabled/>
                    </Item>
                </Form>

                <Tree
                  checkable
                  defaultExpandAll
                  checkedKeys={this.state.defalutS}
                  onCheck={this.onCheck}
                  treeData={treeData}
                />
              </Modal>
           </Card>
        )
    }

    UNSAFE_componentWillMount(){
        this.initColumns()
    }

    componentDidMount(){
      this.setRole()
    }

    onRow = (role) =>{
        return {
            onClick:event =>{
                const {power} = role
                let arr = []
                arr.push(power.split(' ').filter(v=>v.length>0))
                this.setState({checked:role.id,peple:role,defalutS:arr[0]})
            }
        }
    }

    onCheck = (checkedKeys, info) => {
       this.setState({defalutS:checkedKeys})
    }
    


    initColumns = ()=>{
        this.columns = [
            {
              title: '角色',
              dataIndex: 'name',
              key: 'title',
            },
            {
              title: '创建时间',
              dataIndex: 'create_time',
              render:(create_time) => getData(parseInt(create_time/1000),0)
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render:(auth_time) => getData(parseInt(auth_time/1000),0)
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
               
            },
            {
              title: '操作',
              width:300,
              render:(arr)=> (
                <span>
                    <Button type="primary"
                    danger
                    style={{marginLeft:"70px"}} 
                     onClick={()=>{this.deleteCrole(arr)}} 
                     >删除
                    </Button>
                   
                </span>
              ),
            },
           
          ]
    }

    
}
export default connect(state=>({user:state.user}),{})(Role)