import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
//import NewsItem from './Components/NewsItem';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  //Link
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state={
    pogress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
          height={5}
        color='#f11946'
        progress={this.state.progress}
        
      />
          <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress}key = "general" pageSize={5} country="in" category="general" />} />
            <Route exact path="/general" element={<News setProgress={this.setProgress}key = "general" pageSize={5} country="in" category="general" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress}key = "business" pageSize={5} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress}key = "entertainment" pageSize={5} country="in" category="entertainment" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress}key = "health" pageSize={5} country="in" category="health" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress}key = "science" pageSize={5} country="in" category="science" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress}pageSize={5} key="sports" country="in" category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress}key = "technology" pageSize={5} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
