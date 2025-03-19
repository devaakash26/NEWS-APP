import React, { Component } from 'react';
import StarryBackground from './StarryBackground';
import ShootingStar from './ShootingStar';

class SkyBackground extends Component {
  render() {
    return (
      <>
        <StarryBackground />
        <ShootingStar />
      </>
    );
  }
}

export default SkyBackground; 