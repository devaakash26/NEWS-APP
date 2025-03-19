import React, { Component } from 'react';
import { gsap } from 'gsap';
import '../index.css';

class ShootingStar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shootingStars: [],
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.shootingStarRefs = [];
  }

  componentDidMount() {
    // Add resize listener
    window.addEventListener('resize', this.handleResize);
    
    // Start generating shooting stars
    this.shootingStarInterval = setInterval(this.createShootingStar, 3000);
  }
  
  componentWillUnmount() {
    // Clean up
    window.removeEventListener('resize', this.handleResize);
    clearInterval(this.shootingStarInterval);
  }
  
  handleResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }
  
  createShootingStar = () => {
    const { width, height } = this.state;
    
    // Only create a shooting star 30% of the time
    if (Math.random() > 0.3) return;
    
    const id = Date.now();
    const startX = Math.random() * width * 0.3;
    const startY = Math.random() * height * 0.3;
    const angle = Math.random() * 60 - 30; // -30 to 30 degrees
    
    const newStar = {
      id,
      startX,
      startY,
      angle,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 2 + 1
    };
    
    this.setState(prevState => ({
      shootingStars: [...prevState.shootingStars, newStar]
    }), () => {
      // Create a ref for the new star
      this.shootingStarRefs.push(React.createRef());
      
      // Animate the shooting star
      setTimeout(() => {
        this.animateShootingStar(this.shootingStarRefs.length - 1);
      }, 100);
    });
  }
  
  animateShootingStar = (index) => {
    const starRef = this.shootingStarRefs[index];
    const star = this.state.shootingStars[index];
    
    if (!starRef || !starRef.current) return;
    
    // Create the shooting star animation
    gsap.to(starRef.current, {
      x: this.state.width,
      y: this.state.height,
      opacity: 0,
      duration: star.duration,
      ease: "power1.in",
      onComplete: () => {
        // Remove the star from state after animation
        this.setState(prevState => ({
          shootingStars: prevState.shootingStars.filter(s => s.id !== star.id)
        }));
        
        // Remove the ref
        this.shootingStarRefs = this.shootingStarRefs.filter((_, i) => i !== index);
      }
    });
  }

  render() {
    const { shootingStars } = this.state;
    
    return (
      <div className="shooting-stars-container">
        {shootingStars.map((star, index) => (
          <div
            key={star.id}
            ref={this.shootingStarRefs[index]}
            className="shooting-star"
            style={{
              left: `${star.startX}px`,
              top: `${star.startY}px`,
              width: `${star.size * 10}px`,
              height: `${star.size}px`,
              transform: `rotate(${star.angle}deg)`,
              opacity: 1
            }}
          >
            <div className="shooting-star-tail"></div>
          </div>
        ))}
      </div>
    );
  }
}

export default ShootingStar; 