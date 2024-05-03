import React, { Component, useState } from 'react';
import Navbar from './components/Navbar';
import Newsitem from './components/Newsitem';
import Error from './components/Error';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import health from './img/health.webp'
import front from './img/news2.png'
import science from './img/science.jpg'
import technology from './img/technology.jpg'
import general from './img/general.jpg'
import buisness from './img/buisness.jpeg'
import news from './img/news.png'
import LoadingBar from 'react-top-loading-bar'
import Footer from './components/Footer';
// import Free from './components/Free'
class App extends Component {
  pageSize = 3;
  state = {
    style: '#0dcaea',
    color: 'black',  // default text color
    backgroundColor: 'white',  // default background color
    progress: 10,
    authorColor: 'grey',
    headColor: '#3e2d2d'
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  toggle = () => {
    this.setState((prevState) => ({
      style: prevState.style === 'black' ? '#0dcaf0' : 'black',
      color: prevState.color === 'black' ? 'white' : 'black',
      authorColor: prevState.color === 'grey' ? 'black' : 'grey',
      headColor: prevState.headColor === '#3e2d2d' ? '#c0b8b8' : '#3e2d2d',

      backgroundColor: prevState.backgroundColor === 'white' ? 'black' : 'white', // switch default and toggled background
    }), () => {
      document.body.style.backgroundColor = this.state.style === 'black' ? '#1e2327' : 'white';
      // document.body.style.backgroundColor = this.state.backgroundColor;
    });
  };




  render() {
    return (
      <>
        <Navbar toggle={this.toggle} style={{ backgroundColor: this.state.style }} />
        <LoadingBar
          color='rgb(218 91 131)'
          progress={this.state.progress}
          height='5px'

        />
        <Routes>
          <Route path='/' element={<Newsitem headColor={{ color: this.state.headColor }} authorColor={{ color: this.state.color }} cards={{ color: this.state.color, backgroundColor: this.state.backgroundColor }} setProgress={this.setProgress} key="general" country={'in'} pageSize={this.pageSize} category={'general'} img={front} first={"Taza Khabbar"} third={"By"} second={"Developer"} img2={news} />} />
          <Route path='/about' element={<About />} />

          <Route path='/science' element={<Newsitem headColor={{ color: this.state.headColor }} authorColor={{ color: this.state.color }} cards={{ color: this.state.color, backgroundColor: this.state.backgroundColor }} setProgress={this.setProgress} key="science" country={'in'} pageSize={this.pageSize} category={'science'} img={science} first={"News"} second={"Science"} third={"Of"} />} />
          <Route path='/health' element={<Newsitem headColor={{ color: this.state.headColor }} authorColor={{ color: this.state.color }} cards={{ color: this.state.color, backgroundColor: this.state.backgroundColor }} setProgress={this.setProgress} key="health" country={'in'} pageSize={this.pageSize} category={'health'} img={health} first={"News"} second={"Health"} third={"Of"} />} />
          <Route path='/business' element={<Newsitem headColor={{ color: this.state.headColor }} authorColor={{ color: this.state.color }} cards={{ color: this.state.color, backgroundColor: this.state.backgroundColor }} setProgress={this.setProgress} key="business" country={'in'} pageSize={this.pageSize} category={'business'} img={buisness} first={"News"} second={"Buisness"} third={"Of"} />} />
          <Route path='/entertainment' element={<Newsitem headColor={{ color: this.state.headColor }} authorColor={{ color: this.state.color }} cards={{ color: this.state.color, backgroundColor: this.state.backgroundColor }} setProgress={this.setProgress} key="entertainment" country={'in'} pageSize={this.pageSize} category={'entertainment'} img={technology} first={"News"} second={"Entertainment"} third={"Of"} />} />
          <Route path='/technology' element={<Newsitem headColor={{ color: this.state.headColor }} authorColor={{ color: this.state.color }} cards={{ color: this.state.color, backgroundColor: this.state.backgroundColor }} setProgress={this.setProgress} key="technology" country={'in'} pageSize={this.pageSize} category={'technology'} img={technology} first={"News"} second={"Technology"} third={"Of"} />} />
          <Route path='/general' element={<Newsitem headColor={{ color: this.state.headColor }} authorColor={{ color: this.state.color }} cards={{ color: this.state.color, backgroundColor: this.state.backgroundColor }} setProgress={this.setProgress} key="general" country={'in'} pageSize={this.pageSize} category={'general'} first={"News"} second={"General"} third={"Of"} img={general} />} />
          <Route path='*' element={<Error />} />
        </Routes>
        <Footer/>

      </>
    );
  }
}

export default App;
