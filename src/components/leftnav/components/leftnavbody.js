import React, { Component } from 'react'
import { Menu } from 'antd';
import getPower from '../../../utils/getPower'
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {PieChartOutlined, AreaChartOutlined,
       BarChartOutlined,LineChartOutlined, 
       HomeOutlined, FormOutlined, TeamOutlined,MessageOutlined} from '@ant-design/icons';
const { SubMenu } = Menu;
class LeftNavBody extends Component {
    state={
      MenuList:[]
    }
    setMenu = () =>{
      const str = this.props.user.power
      const MenuList = getPower(str)
      this.setState({MenuList})
    }
    DisplayN = (str) =>{
      let show = false
      this.state.MenuList.map(item=>{
        if(item.indexOf(str)>=0){
          show = true
        }
        return 1
      })
      return show
    }
    componentDidMount(){
      this.setMenu()
    }

    render() {
      let path = this.props.location.pathname
      let open = ''
      if(path.indexOf('/charts')===0){
        open = '/chartsd'
      }
        return (
        <div style={{ width: 200 }}>
            <Menu
              mode="inline"
              theme="dark"
              selectedKeys={[path]}
              defaultOpenKeys={[open]}
            > 
              
              {!this.DisplayN('home')?'':(
              <Menu.Item key="/manag/home" icon={<HomeOutlined />}>
                <Link to='/manag/home'>
                  首页
                </Link>
              </Menu.Item>
              )}
              
              {!this.DisplayN('article')?'':(
              <Menu.Item key="/manag/article" icon={<FormOutlined />}>
                <Link to="/manag/article">
                 文章管理
                 </Link>
              </Menu.Item>
              )}

              {!this.DisplayN('role')?'':(
               <Menu.Item key="/manag/role" icon={<TeamOutlined />}>
                <Link to="/manag/role">
                 角色管理
                </Link>
              </Menu.Item>
              )}

              {
                !this.DisplayN('comment')?'':(
                <Menu.Item key="/manag/comment" icon={<MessageOutlined />}>
                  <Link to="/manag/comment">
                   评论管理
                  </Link>
                </Menu.Item>
                )
              }

          

              <SubMenu key="/manag/chartsd" icon={<AreaChartOutlined />} title="图表">
                <Menu.Item key="/manag/charts"icon={<BarChartOutlined />} >
                  <Link to="/manag/charts">柱形图</Link>
                </Menu.Item> 
                <Menu.Item key="/manag/charts/line"icon={<LineChartOutlined />} >
                  <Link to="/manag/charts/line">折线图</Link>
                </Menu.Item> 
                <Menu.Item key="/manag/charts/pie"icon={<PieChartOutlined />} >
                  <Link to="/manag/charts/pie">饼图</Link>
                </Menu.Item> 
              </SubMenu>
            </Menu>
          </div>
        )
    }
}

export default connect(state=>({user:state.user}))(withRouter(LeftNavBody))