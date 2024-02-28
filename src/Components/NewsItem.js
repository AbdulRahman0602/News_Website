import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, news, author, date, source } = this.props
        return (
            <div className='container'>
                <div className="card">
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{source}
                    </span>
                    <img src={!imageUrl ? "https://fox5sandiego.com/wp-content/uploads/sites/15/2024/02/snapshot-2024-02-05T214909.060.jpg?w=1280" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} At {new Date(date).toGMTString()} </small></p>
                        <a rel="noreferrer" href={news} target='_blank' className="btn btn-dark">Read More</a>
                    </div>
                </div>
            </div>

        )
    }
}

export default NewsItem
