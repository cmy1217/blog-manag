import React, { Component } from 'react'
import './style.css'
import Form from './components/LoginForm'
export default class Login extends Component {
    render() {
        return (
            <div className="login">
               <Form history={this.props.history}></Form>
            </div>
        )
    }
}
