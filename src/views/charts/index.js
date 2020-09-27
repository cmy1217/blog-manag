import React, { Component, Fragment } from 'react'
import {Switch, Route} from 'react-router-dom'
import Bar from './bar'
import Line from './line'
import Pie from './pie'

class Graphical extends Component {

    render() {
        return (
            <Fragment>
              <Switch>
                 <Route path="/manag/charts" exact component={Bar}></Route>
                 <Route path="/manag/charts/line" component={Line}></Route>
                 <Route path="/manag/charts/pie" component={Pie}></Route>
              </Switch>
            </Fragment>
        )
    }



}
export default  Graphical