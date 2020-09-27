import Home from './views/admin'
import Login from './views/login'
import React, { Component } from 'react'
import { BrowserRouter, Route ,Switch} from "react-router-dom"
export default class App extends Component {
  render() {
    return (
        <BrowserRouter>
         <Switch>
          <Route path='/manag/login' component={Login}></Route>  
          <Route path='/manag'   component={Home}></Route>
         </Switch>
        
        </BrowserRouter>
    )
  }
}

