import React, { Component } from 'react';
import { gsap } from 'gsap';
import '../index.css';

class StarryBackground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: [],
      width: window.innerWidth,
      height: window.innerHeight,
      mouseX: 0,
      mouseY: 0
    };
    this.starsRef = React.createRef();
    this.starRefs = [];
  }

  componentDidMount() {
    // Create stars
    this.generateStars();
    
    // Add resize listener
    window.addEventListener('resize', this.handleResize);
    
    // Add mouse move listener
    window.addEventListener('mousemove', this.handleMouseMove);
    
    // Start animation
    this.animateStars();
  }
  
  componentWillUnmount() {
    // Clean up
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('mousemove', this.handleMouseMove);
  }
  
  handleResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    }, () => {
      // Regenerate stars on resize
      this.generateStars();
    });
  }
  
  handleMouseMove = (e) => {
    this.setState({
      mouseX: e.clientX,
      mouseY: e.clientY
    }, () => {
      // Apply parallax effect to stars
      this.applyParallaxToStars();
    });
  }
  
  applyParallaxToStars = () => {
    if (this.starRefs.length === 0) return;
    
    const { mouseX, mouseY, width, height } = this.state;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Calculate mouse position relative to center
    const relativeX = (mouseX - centerX) / centerX;
    const relativeY = (mouseY - centerY) / centerY;
    
    // Apply subtle movement to stars based on mouse position
    this.starRefs.forEach((starRef, index) => {
      if (!starRef.current) return;
      
      const star = this.state.stars[index];
      const depth = star.size / 3; // Smaller stars move more (appear further away)
      
      gsap.to(starRef.current, {
        x: relativeX * 20 * depth,
        y: relativeY * 20 * depth,
        duration: 1,
        ease: "power1.out"
      });
    });
  }
  
  generateStars = () => {
    const { width, height } = this.state;
    const starCount = Math.floor((width * height) / 3000); // Adjust density as needed
    
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        blinkDelay: Math.random() * 5
      });
    }
    
    this.setState({ stars }, () => {
      // Create refs for each star
      this.starRefs = stars.map(() => React.createRef());
    });
  }
  
  animateStars = () => {
    if (this.starRefs.length === 0) return;
    
    // Animate each star with random timing
    this.starRefs.forEach((starRef, index) => {
      if (!starRef.current) return;
      
      const star = this.state.stars[index];
      
      // Create twinkling animation
      gsap.to(starRef.current, {
        opacity: 0.1,
        duration: 1 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: star.blinkDelay
      });
      
      // Create subtle size animation
      gsap.to(starRef.current, {
        scale: 0.5 + Math.random() * 0.5,
        duration: 3 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
      });
    });
  }
  
  // Create a special glowing star that follows the cursor
  renderCursorStar = () => {
    const { mouseX, mouseY } = this.state;
    
    if (mouseX === 0 && mouseY === 0) return null;
    
    return (
      <div 
        className="cursor-star"
        style={{
          left: `${mouseX}px`,
          top: `${mouseY}px`
        }}
      />
    );
  }

  render() {
    const { stars } = this.state;
    
    return (
      <div className="starry-background" ref={this.starsRef}>
        {stars.map((star, index) => (
          <div
            key={star.id}
            ref={this.starRefs[index]}
            className="star"
            style={{
              left: `${star.x}px`,
              top: `${star.y}px`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              backgroundColor: index % 20 === 0 ? '#0dcaea' : index % 15 === 0 ? '#ffd400' : 'white'
            }}
          />
        ))}
        {this.renderCursorStar()}
      </div>
    );
  }
}

export default StarryBackground; 