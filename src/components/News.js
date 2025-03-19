import React, { Component } from 'react';
import { gsap } from 'gsap';

export default class News extends Component {
    constructor(props) {
        super(props);
        this.cardRef = React.createRef();
        this.imageRef = React.createRef();
        this.titleRef = React.createRef();
        this.buttonRef = React.createRef();
    }
    
    componentDidMount() {
        // Make sure card is visible
        if (this.cardRef.current) {
            gsap.set(this.cardRef.current, {
                opacity: 1,
                scale: 1,
                y: 0,
                clearProps: "all"
            });
            
            // Add event listeners for hover effects
            this.cardRef.current.addEventListener('mouseenter', this.handleMouseEnter);
            this.cardRef.current.addEventListener('mouseleave', this.handleMouseLeave);
        }
    }
    
    componentWillUnmount() {
        // Clean up event listeners
        if (this.cardRef.current) {
            this.cardRef.current.removeEventListener('mouseenter', this.handleMouseEnter);
            this.cardRef.current.removeEventListener('mouseleave', this.handleMouseLeave);
        }
    }
    
    handleMouseEnter = () => {
        // Animate card on hover
        gsap.to(this.cardRef.current, {
            y: -10,
            scale: 1.02,
            boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
            duration: 0.3,
            ease: 'power2.out'
        });
        
        // Animate image
        if (this.imageRef.current) {
            gsap.to(this.imageRef.current, {
                scale: 1.1,
                duration: 0.5,
                ease: 'power1.out'
            });
        }
        
        // Animate title
        if (this.titleRef.current) {
            gsap.to(this.titleRef.current, {
                textShadow: '0 0 5px rgba(255,255,255,0.5)',
                duration: 0.3
            });
        }
        
        // Animate button
        if (this.buttonRef.current) {
            gsap.to(this.buttonRef.current, {
                scale: 1.05,
                backgroundColor: '#09a7c0',
                duration: 0.3
            });
        }
    }
    
    handleMouseLeave = () => {
        // Reset animations on mouse leave
        gsap.to(this.cardRef.current, {
            y: 0,
            scale: 1,
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            duration: 0.3,
            ease: 'power2.out'
        });
        
        // Reset image
        if (this.imageRef.current) {
            gsap.to(this.imageRef.current, {
                scale: 1,
                duration: 0.5,
                ease: 'power1.out'
            });
        }
        
        // Reset title
        if (this.titleRef.current) {
            gsap.to(this.titleRef.current, {
                textShadow: 'none',
                duration: 0.3
            });
        }
        
        // Reset button
        if (this.buttonRef.current) {
            gsap.to(this.buttonRef.current, {
                scale: 1,
                backgroundColor: '#0dcaea',
                duration: 0.3
            });
        }
    }
    
    getCategoryBadgeClass = () => {
        const { name } = this.props;
        const lowerName = name ? name.toLowerCase() : '';
        
        if (lowerName.includes('business') || lowerName.includes('finance') || lowerName.includes('money')) {
            return 'badge-business';
        } else if (lowerName.includes('tech') || lowerName.includes('digital')) {
            return 'badge-technology';
        } else if (lowerName.includes('health') || lowerName.includes('medical')) {
            return 'badge-health';
        } else if (lowerName.includes('science') || lowerName.includes('research')) {
            return 'badge-science';
        } else if (lowerName.includes('entertainment') || lowerName.includes('movie') || lowerName.includes('tv')) {
            return 'badge-entertainment';
        } else {
            return 'badge-general';
        }
    }
    
    render() {
        let { title, description, imgUrl, btnUrl, name, author, date, cards, authorColor } = this.props;
        const badgeClass = this.getCategoryBadgeClass();
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        
        return (
            <div className="card" ref={this.cardRef} style={{opacity: 1, visibility: 'visible'}}>
                <div className={`badge-category ${badgeClass}`}>
                    {name}
                </div>
                <div className='body' style={{...typeof cards === "object" ? cards : {}, opacity: 1, visibility: 'visible'}}>
                    <div className="position-relative overflow-hidden">
                        <img 
                            src={imgUrl} 
                            className="card-img-top" 
                            alt="news" 
                            ref={this.imageRef}
                            style={{opacity: 1, visibility: 'visible'}}
                        />
                        <div 
                            className="position-absolute bottom-0 start-0 w-100 p-3" 
                            style={{background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', opacity: 1, visibility: 'visible'}}
                            ref={this.titleRef}
                        >
                            <h5 className="card-title text-white mb-0">{title}</h5>
                        </div>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <a 
                                href={btnUrl} 
                                className="btn btn-primary rounded-pill px-4" 
                                style={{backgroundColor: '#0dcaea', borderColor: '#0dcaea'}}
                                ref={this.buttonRef}
                            >
                                Read More
                            </a>
                            <small className="text-muted">
                                {formattedDate}
                            </small>
                        </div>
                        <div className="card-footer mt-3 p-0 border-0">
                            <p className="card-text mb-0">
                                <small className="text" style={typeof authorColor === "string" ? { color: authorColor } : authorColor}>
                                    By {!author ? "Unknown" : author}
                                </small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
