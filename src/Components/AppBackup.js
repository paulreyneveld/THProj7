import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Routing import
import {
  BrowserRouter,
  Route, 
  Switch   
} from 'react-router-dom';

// Axios Import
import axios from 'axios';

// Import API Config

import apiKey from './config.js';

// Component imports
import Test from './Components/Test';
import Nav from './Components/Nav';
import Photo from './Components/Photo';
import NotFound from './Components/NotFound';
import SearchForm from './Components/SearchForm';
import PhotoContainer from './Components/PhotoContainer';

export class App extends Component {
  
  constructor() {
    super();
    this.state = {
      dogImages: [],
      waterfallImages: [],
      sunsetImages: [],
      searchedImages: []
    };
  }

  componentDidMount() {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dog&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        console.log(response);
        this.setState({
          dogImages: response.data.photos.photo
        });
    })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
    });

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=waterfall&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        console.log(response);
        this.setState({
          waterfallImages: response.data.photos.photo
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sunset&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        console.log(response);
        this.setState({
          sunsetImages: response.data.photos.photo
      });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
    });
  
  }
  
  performSearch = (query = 'dogs') => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      console.log(response);
      this.setState({
        searchedImages: response.data.photos.photo
    });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
  });  
  }

  render() {  
    
    return (
     <BrowserRouter>
        <div className="App">
        <Route exact path="/" render={ () => 
            <SearchForm onSearch={this.performSearch} />
            <Nav />
              <PhotoContainer
                data={this.state.searchedImages}
              />
            }/>
          
          <Switch>

            <Route path="/dogs" render={ () => 
            <SearchForm onSearch={this.performSearch} />
            <Nav />            
              <PhotoContainer
                data={this.state.dogImages}
              />
            }/>

            <Route path="/waterfalls" render={ () => 
             <SearchForm onSearch={this.performSearch} />
            <Nav />           
              <PhotoContainer
                data={this.state.waterfallImages}
              />
            }/>

            <Route path="/sunsets" render={ () => 
            <SearchForm onSearch={this.performSearch} />
            <Nav />
              <PhotoContainer
                data={this.state.sunsetImages}
              />
            }/>

            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
