import React, { Component } from 'react';
import News from './News';
import Loading from './Loading';
import PropTypes from 'prop-types';
import Template from './Template';
import Typed from 'typed.js';

import InfiniteScroll from "react-infinite-scroll-component";

export default class Newsitem extends Component {
    static defaulPprops = {
        country: 'in',
        pageSize: 3,
        category: 'general',
        img: 'front',
        img2: 'front',
        first: 'Taza',
        third: 'By',
        second: 'Khabbar',
        card: false,
        authorColor: 'black',

    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        img: PropTypes.string,
        first: PropTypes.string,
        second: PropTypes.string
    }

    state = {
        articles: [],
        loading: false,
        page: 1,
        totalResults: 0

    };
    async listed() {
        this.setState({ loading: true })
        this.props.setProgress(30);
        let data = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6936648668704caba2290c5e15354045&pageSize=${this.props.pageSize}&page=${this.state.page}`;
        this.props.setProgress(50);
        let api = await fetch(data);
        let url = await api.json();
        this.props.setProgress(70);
        this.setState({ articles: url.articles, totalResults: url.totalResults, loading: false });
        this.props.setProgress(100);
    }
    async componentDidMount() {
        this.listed();


    }
    fetchMoreData = async () => {
        try {
            const nextPage = this.state.page + 1;
            const data = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6936648668704caba2290c5e15354045&pageSize=${this.props.pageSize}&page=${nextPage}`;
            const api = await fetch(data);
            const url = await api.json();

            if (url.articles.length > 0) {
                // Check if the first three articles are the same as the existing ones
                const areFirstThreeDuplicates = url.articles.slice(0, 3).every(newArticle =>
                    this.state.articles.some(existingArticle => existingArticle.url === newArticle.url)
                );

                if (!areFirstThreeDuplicates) {
                    this.setState(prevState => ({
                        articles: [...prevState.articles, ...url.articles],
                        totalResults: url.totalResults,
                        page: nextPage,
                        loading: false
                    }));
                } else {
                    console.warn("Duplicate articles found in the first three. Ignoring.");
                    this.setState({ loading: false });
                }
            } else {
                console.warn("No new articles received from the API.");
                this.setState({ loading: false });
            }
        } catch (error) {
            console.error("Error fetching more data:", error);
            // Handle the error
            this.setState({ loading: false });
        }
    };



    render() {
       
        let { name, headColor } = this.props
        return (
            <>
                <Template first={this.props.first} third={this.props.third} second={this.props.second} img={this.props.img} img2={this.props.img2} />
                <h1 className="title my-7" style={name}> <hr className="dashed" style={{ borderTop: '3px dashed #ff005d' }} /><small id='head-1'>News</small><small id='head-2' style={headColor}>Template</small></h1>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length < this.state.totalResults}
                    loader={<Loading />}
                >


                    <div className='container'>
                        <div className="row" style={{ marginTop: '30px' }}>
                            {this.state.articles && this.state.articles.map((element) => (

                                <div className="col-md-4 cards" key={element.url} >
                                    <div className='name' >{element.name}</div>
                                    <News
                                        title={element.title?.slice(0, 60) ?? "Default Title"}
                                        description={element.description?.slice(0, 88) ?? "Garena Free Fire MAX Redeem Codes India Today 2023 December 13: Garena has listed new se"}
                                        imgUrl={element.urlToImage ?? "https://images.moneycontrol.com/static-mcnews/2023/11/stocks_sensex_nifty_stockmarket5-2-770x433.jpg"}

                                        btnUrl={element.url}
                                        name={element.source.name}
                                        author={element.author}
                                        date={element.publishedAt}
                                        cards={this.props.cards}
                                        authorColor={this.props.authorColor}

                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        );
    }
}
