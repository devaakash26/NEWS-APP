import React, { Component } from 'react';
import news from '../img/news.png'
import { gsap } from 'gsap';

export default class Template extends Component {
  constructor(props) {
    super(props);
    // Create refs for elements we want to animate
    this.headlineRef = React.createRef();
    this.subheadline1Ref = React.createRef();
    this.subheadline2Ref = React.createRef();
    this.paragraphRef = React.createRef();
    this.buttonsRef = React.createRef();
    this.imageRef = React.createRef();
    this.svgRef = React.createRef();
    
    // State to track mouse position for image movement
    this.state = {
      mouseX: 0,
      mouseY: 0
    };
  }
  
  componentDidMount() {
    // Ensure buttons are visible immediately
    if (this.buttonsRef.current) {
      const buttons = this.buttonsRef.current.querySelectorAll('button');
      buttons.forEach(button => {
        button.style.opacity = '1';
        button.style.visibility = 'visible';
      });
    }
    
    // Simple animation for the newspaper image
    if (this.imageRef.current) {
      gsap.to(this.imageRef.current, {
        y: 15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
    // Add event listener for mouse movement
    document.addEventListener('mousemove', this.handleMouseMove);
  }
  
  componentWillUnmount() {
    // Clean up event listener
    document.removeEventListener('mousemove', this.handleMouseMove);
  }
  
  handleMouseMove = (e) => {
    // Calculate mouse position relative to the center of the screen
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    
    // Apply parallax effect to the newspaper image
    if (this.imageRef.current) {
      gsap.to(this.imageRef.current, {
        rotationY: mouseX * 0.5,
        rotationX: -mouseY * 0.5,
        x: mouseX * 0.5,
        y: mouseY * 0.5,
        duration: 1,
        ease: "power2.out"
      });
    }
    
    // Apply parallax effect to the background shape
    if (this.svgRef.current) {
      gsap.to(this.svgRef.current, {
        x: mouseX * 1.2,
        y: mouseY * 1.2,
        duration: 1.5,
        ease: "power2.out"
      });
    }
  }

  render() {
    let { first, second, third, img, img2, titleStyle } = this.props;
    return (
      <div className='front-container container mt-4'>
        <div className='row align-items-center' id='main-row'>
          <div className='col-md-6'>
            <div className="headline-container p-4">
              <h1 className='headlines text-start d-block' ref={this.headlineRef} style={titleStyle}>{first}</h1>
              <h2 className='headlines-1 text-start d-block' ref={this.subheadline1Ref} style={{ marginTop: '10px' }}>{second}</h2>
              <h2 className='headlines-1 text-start d-block' ref={this.subheadline2Ref} style={{ marginTop: '10px' }}>{third}</h2>
              <p className="lead mt-4 text-muted" ref={this.paragraphRef}>
                Stay informed with the latest breaking news, in-depth analysis, and exclusive stories from around the world.
              </p>
              <div className="mt-4 d-flex" ref={this.buttonsRef}>
                <button 
                  className="btn btn-primary btn-lg rounded-pill px-4 me-2 hero-btn" 
                  style={{
                    backgroundColor: '#0dcaea', 
                    borderColor: '#0dcaea', 
                    opacity: 1, 
                    visibility: 'visible'
                  }}
                >
                  Latest News
                </button>
                <button 
                  className="btn btn-outline-secondary btn-lg rounded-pill px-4 hero-btn" 
                  style={{
                    opacity: 1, 
                    visibility: 'visible'
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='image position-relative' style={{ perspective: '1000px' }}>
              <img 
                src={img} 
                alt="Front Image" 
                className='front-image rounded-3 shadow' 
                ref={this.imageRef}
                style={{ transformStyle: 'preserve-3d' }}
              />
              <div 
                className="position-absolute" 
                style={{bottom: '-20px', right: '-20px', zIndex: '-1'}}
                ref={this.svgRef}
              >
                <svg width="150" height="150" viewBox="0 0 200 200">
                  <path fill="#0dcaea" d="M42.8,-65.2C54.9,-56.7,64.2,-43.9,70.5,-29.5C76.8,-15.1,80.1,0.9,76.7,15.7C73.3,30.5,63.2,44.1,50.4,53.6C37.6,63.1,22.1,68.5,5.2,72.1C-11.7,75.7,-30,77.5,-43.7,70.1C-57.4,62.7,-66.5,46.1,-72.3,28.8C-78.1,11.5,-80.6,-6.5,-76.3,-22.9C-72,-39.3,-61,-54.1,-46.9,-62.1C-32.8,-70.1,-15.7,-71.3,-0.1,-71.1C15.5,-70.9,30.7,-73.7,42.8,-65.2Z" transform="translate(100 100)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
