import React, { Component } from 'react'
import './style.css'
import LeftNavHeader from './components/leftnavheader'
import LeftNavBody from './components/leftnavbody'
export default class LeftNav extends Component {
    render() {
        return (
            <div className="left-nav">
                <LeftNavHeader/>
                <LeftNavBody path={this.props.path}/>
            </div>
        )
    }
}
