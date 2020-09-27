import React, { Component } from 'react'
import Editor from 'for-editor'

export default class RichMarkdown extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }
  componentDidMount(){
      if(this.props.md){
          this.setState({value:this.props.md})
      }
 
  }
  handleChange = (value)=> {
    this.setState({
      value
    })
  }

  render() {
    const { value } = this.state
  return <Editor disabled={this.props.disable} value={value} height={550} onChange={this.handleChange} />
  }
}

