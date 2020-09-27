import React, { Component } from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import LeftNav from '../../components/leftnav'
import Header from '../../components/header'
import HomeIn from '../home'
import Article from '../article'
import Role from '../role'
import Commnet from '../comment'
import Graphical from '../charts'
import { Layout } from 'antd';
import {CaretLeftOutlined,CaretRightOutlined} from '@ant-design/icons'
const {  Sider, Content } = Layout;
class Home extends Component {
  state={
    nav:true
  }

  setNav = () =>{
    this.setState({nav:false})
  }

  setNavShow = () =>{
    this.setState({nav:true})
  }
    render() {
        const user = this.props.user
        if(!user || !user.id){
          return <Redirect to="/manag/login"></Redirect>
        }
        return (
                 <Layout style={{height:"100%"}}>
                   <Sider className={this.state.nav?"nav-show":"nav-none"}>
                      <LeftNav path={this.props.location.pathname}/>
                   </Sider>
                   <CaretLeftOutlined 
                   className={this.state.nav?"header-icon icon-max":"icon-none icon-max"}
                   style={{fontSize:"44px",color:"#1DA57A"}}
                   onClick={this.setNav} 
                   />
                   <CaretRightOutlined
                   className={this.state.nav?"icon-none icon-max":"icon-show icon-max"}
                    style={{fontSize:"44px",color:"#1DA57A"}}
                    onClick={this.setNavShow}
                   />
                   <Layout style={{background:"#F0F0F0"}}>
                     <Header/>
                     <Content style={{margin:"20px",background:"rgb(240,240,240)"}}>
                      
                      <Switch>
                       <Route path='/manag/home'  component={HomeIn}></Route>
                       <Route path='/manag/article'  component={Article}></Route>
                       <Route path='/manag/role' component={Role}></Route>
                       <Route path='/manag/charts' component={Graphical}></Route>
                       <Route path="/manag/comment" component={Commnet}></Route>
                       <Redirect to='/manag/home'></Redirect>
                      </Switch>
                       
                     </Content>
                     
                   </Layout>
                 </Layout>
        )
    }
}

export default connect(state=>({
  user:state.user,
}))(Home)