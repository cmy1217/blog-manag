import React, { Component ,Fragment} from 'react'
import './style.less'
import ListAticle from './list'
import AddAticle  from './add'
import UpdateAticle from './update'
import DetailArticle from './detail'
import {Redirect, Route, Switch} from 'react-router-dom'
export default class Article extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route path='/manag/article' exact component={ListAticle}></Route>
                    <Route path='/manag/article/add' component={AddAticle}></Route>
                    <Route path='/manag/article/update' component={UpdateAticle}></Route>
                    <Route path='/manag/article/detail' component={DetailArticle}></Route>
                    <Redirect to='/manag/article'></Redirect>
                </Switch>
            </Fragment>
        )
    }
}
