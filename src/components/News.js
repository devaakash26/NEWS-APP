import React, { Component } from 'react'

export default class News extends Component {
    render() {
        let { title, description, imgUrl, btnUrl, name, author, date,cards,authorColor } = this.props;
        return (
            <>
                <div className="card">
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {name}
                        <span className="visually-hidden">unread messages</span>
                    </span>
                    <div className='body' style={cards}>
                        <img src={imgUrl} className="card-img-top" alt="news" />
                        <div className="card-body"  >
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <a href={btnUrl} className="btn bg-info">Read More</a>
                            <p className="card-text" style={{ marginTop: '10px' }}>
                                <small className="text" style={authorColor} >
                                    By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}
                                </small>
                            </p>

                        </div>
                    </div>
                </div>


            </>

        )
    }
}
