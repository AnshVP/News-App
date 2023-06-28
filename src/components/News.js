import React, { Component } from 'react'
import NewsItems from './NewsItems';
import Spinner from './Spinner';
<style>
    @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@700&display=swap');
</style>

export default class News extends Component {
    // api_key1 = process.env.REACT_APP_NEWS_API
    api_key2 = "b2c5d4240b514b95a01358116579afc8"
    constructor() {
        super();
        this.state = {
            loading: false,
            articles: [],
            page: 1,
            pageSize: 9,
            totalResults: 0,
            keyword: ''
        };
    }

    updateNews = async () =>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${this.api_key2}&category=${this.props.category}&page=${this.state.page}&pageSize=${this.state.pageSize}${this.state.keyword}`
        this.setState({ loading: true }) 
        this.props.setProgress(30)
        let data = await fetch(url)
        this.props.setProgress(50)
        let parsedData = await data.json()
        document.title = 'News-India ' + this.capitalize(this.props.category)

        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100)
    }

    async componentDidMount() {
        console.log(this.props.api_key)
        this.updateNews()
    }
    nextPage = async () =>{ 
        await this.setState({ page: (this.state.page + 1),articles: []})
        // console.log(this.state.page)
        this.updateNews()
    }
    prevPage = async () =>{
        await this.setState({ page: (this.state.page - 1),articles: [] })
        // console.log(this.state.page)
        this.updateNews()
    }
    capitalize(text) {
        return text[0].toUpperCase() + text.slice(1,)
    }
    search = async () =>{
        await this.setState({ keyword: `&q=${document.getElementById("keyword").value}`, page: 1 })
        this.updateNews()
    }
    render() {

        return (
            <div className="container">
                <h1 className="my-3 text-center">News-India {this.capitalize(this.props.category)}</h1>
                <div className="d-flex justify-content-center my-3">
                    <input className="form-control" type="search" placeholder="Search" aria-label="Search" id="keyword" style={{ width: "30rem" }} />
                    <button className="btn btn-outline-primary" onClick={this.search}>Search</button>
                </div>
                <div className="text-center">
                    {this.state.loading && <Spinner />}
                </div>
                <div className="row" >
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItems title={element.title ? element.title : "TITLE NOT AVAILABLE!!!"} imageUrl={element.urlToImage ? element.urlToImage : "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"} description={element.description ? element.description : "NO DESCRIPTION AVAILABLE!!!"} newsUrl={element.url} source={element.source.name} date={element.publishedAt ? element.publishedAt : "Date not Available"} author={element.author ? element.author : "Unknown"} /></div>
                    })}
                </div>
                <div className=" container d-flex justify-content-between">
                    <button className={`btn btn-primary ${this.state.page === Math.ceil(this.state.totalResults / this.state.pageSize) ? 'disabled' : ''}`} onClick={this.nextPage}>Next</button>
                    <div className="badge bg-danger" style={{ fontFamily: "'Kalam', cursive", fontWeight: "bolder", fontSize: "30px" }}>{this.state.page}</div>
                    <button className={`btn btn-primary ${this.state.page === 1 ? 'disabled' : ''}`} onClick={this.prevPage}>Prev</button>
                    {console.log("render")}
                </div>

            </div>
        )

    }
}
