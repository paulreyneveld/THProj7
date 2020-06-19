import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Import API Config

import apiKey from 'config.js';

// Component imports
import Test from './Components/Test';
import Nav from './Components/Nav';
import Photo from './Components/Photo';
import NotFound from './Components/NotFound';
import SearchForm from './Components/SearchForm';
import PhotoContainer from './Components/PhotoContainer';

class App extends Component {
  render() {  
    return (
      <div className="App">
        <SearchForm />
        <Test />
        <Nav />
        <PhotoContainer />
        <Photo />
        <NotFound />
      </div>
    );
  }
}

export default App;
