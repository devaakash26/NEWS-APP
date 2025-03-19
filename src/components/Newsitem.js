import React, { Component } from 'react';
import News from './News';
import Loading from './Loading';
import PropTypes, { element } from 'prop-types';
import Template from './Template';
import InfiniteScroll from "react-infinite-scroll-component";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default class Newsitem extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 3,
        category: 'general',
        img: 'front',
        img2: 'front',
        first: 'Taza',
        third: 'By',
        second: 'Khabbar',
        card: false,
        authorColor: 'black',
    };

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        img: PropTypes.string,
        first: PropTypes.string,
        second: PropTypes.string,
        setProgress: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        };
        
        // Create ref for news cards container
        this.newsCardsRef = React.createRef();
    }

    componentDidMount() {
        this.listed();
    }
    
    componentDidUpdate(prevProps, prevState) {
        // If new articles were loaded, animate them
        if (prevState.articles.length !== this.state.articles.length && this.newsCardsRef.current) {
            this.animateCards();
        }
    }
    
    animateCards = () => {
        // Get all card elements
        const cards = this.newsCardsRef.current.querySelectorAll('.col-md-4');
        
        // First ensure all cards are visible
        gsap.set(cards, {
            opacity: 1,
            y: 0,
            clearProps: "all"
        });
        
        // Then animate them
        gsap.from(cards, {
            y: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            onComplete: () => {
                // Ensure cards are visible after animation
                gsap.set(cards, {
                    opacity: 1,
                    y: 0,
                    clearProps: "all"
                });
            }
        });
    }

    async listed() {
        try {
            this.setState({ loading: true });
            this.props.setProgress(30);

            const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
            console.log("API Key:", API_KEY);
            
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${API_KEY}`;
            console.log("Fetching from URL:", url);

            this.props.setProgress(50);
            const response = await fetch(url);
            const data = await response.json();
            console.log("API Response:", data);

            this.props.setProgress(70);
            
            if (data.status === "ok" && Array.isArray(data.articles)) {
                console.log("Articles received:", data.articles.length);
                this.setState({
                    articles: data.articles,
                    totalResults: data.totalResults,
                    loading: false
                });
                
                // Animate cards after they're loaded
                setTimeout(() => {
                    this.animateCards();
                }, 100);
            } else {
                console.error("Invalid data format or error:", data);
                this.setState({ 
                    loading: false,
                    articles: [] 
                });
            }
            
            this.props.setProgress(100);
            
        } catch (error) {
            console.error("Error fetching news:", error);
            this.setState({ loading: false });
            this.props.setProgress(100);
        }
    }

    fetchMoreData = async () => {
        try {
            const nextPage = this.state.page + 1;
            const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${API_KEY}&page=${nextPage}`;
            console.log("Fetching more data from:", url);

            const response = await fetch(url);
            const data = await response.json();
            console.log("More data response:", data);

            if (data.status === "ok" && Array.isArray(data.articles)) {
                this.setState({
                    articles: [...this.state.articles, ...data.articles],
                    page: nextPage
                });
            } else {
                console.error("Error fetching more data:", data);
            }
        } catch (error) {
            console.error("Error fetching more news:", error);
        }
    };

    render() {
        let { name, headColor } = this.props;
        console.log("Current articles in state:", this.state.articles);
        
        return (
            <>
                <Template first={this.props.first} third={this.props.third} second={this.props.second} img={this.props.img} img2={this.props.img2} />
                <h1 className="title my-7" style={name}> <hr className="dashed" style={{ borderTop: '3px dashed #ff005d' }} /><small id='head-1'>News</small><small id='head-2' style={headColor}>Template</small></h1>
                
                {this.state.loading && <Loading />}
                
                {this.state.articles && this.state.articles.length > 0 ? (
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length < this.state.totalResults}
                        loader={<Loading />}
                    >
                        <div className='container'>
                            <div className="row" style={{ marginTop: '30px' }} ref={this.newsCardsRef}>
                                {this.state.articles.map((element, index) => (
                                    <div className="col-md-4 cards" key={element.url || index} data-index={index}>
                                        <div className='name'>{element.name}</div>
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
                ) : (
                    !this.state.loading && (
                        <div className="container text-center mt-5">
                            <h3>No news articles found. Please try again later.</h3>
                        </div>
                    )
                )}
            </>
        );
    }
}
