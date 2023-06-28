import React, { Component } from 'react'
import LoadingBar from 'react-top-loading-bar'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'


export default class App extends Component {
  api_key = process.env.REACT_APP_NEWS_API
  state = {
    progress: 10
  }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <div style={{ backgroundColor: "rgb(228, 245, 255)" }}>
        <Router>
          <Navbar />
          <LoadingBar
            color='#ec3824'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} api_key={this.api_key} key="general" category="general" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} api_key={this.api_key} key="bussiness" category="business" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} api_key={this.api_key} key="entertainment" category="entertainment" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} api_key={this.api_key} key="health" category="health" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} api_key={this.api_key} key="science" category="science" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} api_key={this.api_key} key="sports" category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} api_key={this.api_key} key="technology" category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
