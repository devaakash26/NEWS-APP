import React, { Component } from 'react'
import error from "../img/eeror.gif"

export default class Error extends Component {
  render() {
    return (
      <div className='container'>
        <p> Hello Error</p>
        <img src={error} style={{height:'35rem'}}/>

      </div>
    )
  }
}
