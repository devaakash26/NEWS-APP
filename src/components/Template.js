import React, { Component } from 'react';
import news from '../img/news.png'

export default class Template extends Component {
  render() {
    let { first, third, second,  img, img2,titleStyle } = this.props;
    return (
      <div className='front-container container'>
        <div className='row' id='main-row'>
          <div className='col-md-6'>
            <p className='headlines text-center' style={titleStyle}>{first} </p>
            <p className='headlines-1 text-center' style={{ marginTop: '-27px' }}>{third} </p>
            <p className='headlines-1 text-center' style={{ marginTop: '-27px' }}>{second} </p>

          </div>
          <div className='col-md-6'>
            <div className='image'>
              <img src={img} alt="Front Image" className='front-image' />
            </div>
          </div>
        </div>


      </div>
    );
  }
}
