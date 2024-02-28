import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types' //shortcit impt

export class News extends Component {
    // articles = [
    //     {
    //         "source": {
    //             "id": "the-washington-post",
    //             "name": "The Washington Post"
    //         },
    //         "author": "Jesse Dougherty",
    //         "title": "NLRB ruling says Dartmouth men’s basketball players can unionize - The Washington Post",
    //         "description": "A regional director for the NLRB issued the ruling Monday, deciding that the basketball players are employees of their school. Dartmouth can still appeal.",
    //         "url": "https://www.washingtonpost.com/sports/2024/02/05/dartmouth-basketball-union/",
    //         "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/U3SEN35Y3BF3LJNKY3EPAKL6VY_size-normalized.jpg&w=1440",
    //         "publishedAt": "2024-02-06T02:06:00Z",
    //         "content": "A regional director for the National Labor Relations Board pushed college sports a bit further from amateurism Monday when she ruled the Dartmouth mens basketball team can hold a union election which… [+7442 chars]"
    //     }
    // ]
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category:'general'
      }
      static propTypes = {
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
      }
    constructor(props) {
        super(props);
        this.state = {
            // articles: this.articles,
            articles: [],
            loading: false,
            page:1
        }
        document.title=`${this.props.category}-NewsMonkey`
    }

    async componentDidMount() {
        this.props.setProgress(10)
        let url = `https:newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0eec68b0b8b94b39843da25b37cd2ff4&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({ articles: parsedData.articles, totalResults:parsedData.totalResults, loading:false})
        this.props.setProgress(100)
    }
    handleNextClick = async()=>{
        this.props.setProgress(10)
        if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
        
        console.log("Next")
        let url = `https:newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0eec68b0b8b94b39843da25b37cd2ff4&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({
            page:this.state.page+1,
            articles: parsedData.articles,
            loading:false
        })
        this.props.setProgress(100)
    }
    }
    handlePreviousClick= async ()=>{
        this.props.setProgress(10)
        console.log("Previous")
        let url = `https:newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0eec68b0b8b94b39843da25b37cd2ff4&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({
            page:this.state.page-1,
            articles: parsedData.articles,
            loading:false
        })
        this.props.setProgress(100)
    }
    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center'>NewsMonkey-Latest HeadLines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className='col-md-4' key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : " "} description={element.description ? element.description.slice(0, 84) : " "} imageUrl={element.urlToImage} news={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                        </div>

                    })}

                </div>
                <div className='container d-flex justify-content-between my-3'>
                    <button  disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous Page</button>
                    <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next Page &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
//helloworld-password
// 0eec68b0b8b94b39843da25b37cd2ff4--API