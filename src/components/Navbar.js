import React, { Component } from 'react'
import '../index.css'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        let { toggle, style } = this.props;
        return (
            <>            <nav className="navbar navbar-expand-lg" style={style}>
                <div className="container-fluid" >
                    <Link className="navbar-brand" to="/">
                        <img src={require('../img/logo.png')} alt="Logo" className='logo ' />

                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link  home  text-white" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link about text-white" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link about text-white" to="/business">Business</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link about text-white" to="/entertainment">Entertainment</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link about text-white" to="/science">Science</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link about text-white" to="/general">General</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link about text-white" to="/technology">Technology</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link about text-white" to="/health">Health</Link>
                            </li>
                        </ul>


                    </div>
                    <label className="toggle" htmlFor="switch">
                        <input id="switch" className="input" onChange={toggle} type="checkbox" />
                        <div className="icon icon--moon">
                            <svg height="32" width="32" fill="currentColor" viewBox="0 0 24 24" className='icon-dark' xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" fillRule="evenodd"></path>
                            </svg>
                        </div>

                        <div className="icon icon--sun">
                            <svg height="32" width="32" fill="currentColor" viewBox="0 0 24 24" className='icon-dark' xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path>
                            </svg>
                        </div>
                    </label>
                </div>
            </nav>
            </>

        )
    }

}
