import React, { Component } from 'react'
import loading from '../img/spinner.gif'
export default class Loading extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} style={{height:'79px'}}/>
      </div>
    )
  }
}
