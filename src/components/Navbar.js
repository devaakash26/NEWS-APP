import React, { Component } from 'react'
import '../index.css'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        // Check localStorage for theme preference
        const savedTheme = localStorage.getItem('theme');
        this.state = {
            isDarkMode: savedTheme === 'dark',
            isScrolled: false
        };
        
        // Create refs for animation
        this.navbarRef = React.createRef();
        this.logoRef = React.createRef();
        this.navItemsRef = React.createRef();
        this.toggleRef = React.createRef();
    }
    
    componentDidMount() {
        // Add scroll event listener
        window.addEventListener('scroll', this.handleScroll);
        
        // Initial animation
        gsap.from(this.navbarRef.current, {
            y: -100,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
        
        gsap.from(this.logoRef.current, {
            x: -50,
            opacity: 0,
            duration: 0.6,
            delay: 0.2,
            ease: "back.out(1.7)"
        });
        
        gsap.from(this.navItemsRef.current.children, {
            y: -20,
            opacity: 0,
            duration: 0.4,
            stagger: 0.1,
            delay: 0.4,
            ease: "power2.out"
        });
        
        gsap.from(this.toggleRef.current, {
            scale: 0,
            rotation: 180,
            opacity: 0,
            duration: 0.6,
            delay: 0.8,
            ease: "elastic.out(1, 0.3)"
        });
    }
    
    componentWillUnmount() {
        // Remove scroll event listener
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    handleScroll = () => {
        // Check if page is scrolled
        const isScrolled = window.scrollY > 50;
        
        if (isScrolled !== this.state.isScrolled) {
            this.setState({ isScrolled });
            
            // Animate navbar on scroll
            gsap.to(this.navbarRef.current, {
                padding: isScrolled ? '8px 0' : '12px 0',
                boxShadow: isScrolled ? '0 5px 20px rgba(0,0,0,0.2)' : '0 2px 15px rgba(0,0,0,0.1)',
                duration: 0.3,
                ease: "power2.out"
            });
        }
    }

    render() {
        let { toggle, style } = this.props;
        const { isScrolled } = this.state;
        
        return (
            <>
            <nav 
                className="navbar navbar-expand-lg shadow-sm" 
                style={{
                    ...style, 
                    padding: isScrolled ? '8px 0' : '12px 0',
                    transition: 'all 0.3s ease'
                }}
                ref={this.navbarRef}
            >
                <div className="container" >
                    <Link className="navbar-brand d-flex align-items-center" to="/" ref={this.logoRef}>
                        <img src={require('../img/logo.png')} alt="Logo" className='logo me-2' />
                        <span className="fw-bold text-white fs-4">DevHub</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0" ref={this.navItemsRef}>
                            <li className="nav-item mx-1">
                                <Link className="nav-link text-white fw-semibold px-3 rounded-pill nav-hover" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item mx-1">
                                <Link className="nav-link text-white fw-semibold px-3 rounded-pill nav-hover" to="/business">Business</Link>
                            </li>
                            <li className="nav-item mx-1">
                                <Link className="nav-link text-white fw-semibold px-3 rounded-pill nav-hover" to="/entertainment">Entertainment</Link>
                            </li>
                            <li className="nav-item mx-1">
                                <Link className="nav-link text-white fw-semibold px-3 rounded-pill nav-hover" to="/science">Science</Link>
                            </li>
                            <li className="nav-item mx-1">
                                <Link className="nav-link text-white fw-semibold px-3 rounded-pill nav-hover" to="/technology">Technology</Link>
                            </li>
                            <li className="nav-item mx-1">
                                <Link className="nav-link text-white fw-semibold px-3 rounded-pill nav-hover" to="/health">Health</Link>
                            </li>
                            <li className="nav-item mx-1">
                                <Link className="nav-link text-white fw-semibold px-3 rounded-pill nav-hover" to="/about">About</Link>
                            </li>
                        </ul>

                        <div className="d-flex align-items-center" ref={this.toggleRef}>
                            <label className="toggle ms-3" htmlFor="switch">
                                <input id="switch" className="input" onChange={toggle} type="checkbox" checked={localStorage.getItem('theme') === 'dark'} />
                                <div className="icon icon--moon">
                                    <svg height="24" width="24" fill="currentColor" viewBox="0 0 24 24" className='icon-dark' xmlns="http://www.w3.org/2000/svg">
                                        <path clipRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" fillRule="evenodd"></path>
                                    </svg>
                                </div>

                                <div className="icon icon--sun">
                                    <svg height="24" width="24" fill="currentColor" viewBox="0 0 24 24" className='icon-dark' xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path>
                                    </svg>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </nav>
            </>
        )
    }
}
