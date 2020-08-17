import React, { Component } from 'react';
import './App.css';

// Routing import
import {
  BrowserRouter,
  Route, 
  Switch,
  Redirect,   
} from 'react-router-dom';

// Axios Import
import axios from 'axios';

// Import API Config

import apiKey from './config.js';

// Component imports
import Nav from './Components/Nav';
import NotFound from './Components/NotFound';
import SearchForm from './Components/SearchForm';
import PhotoContainer from './Components/PhotoContainer';

export class App extends Component {
  // Initializes state placeholders/defaults.
  constructor() {
    super();
    this.state = {
      searchedImages: [],
      dogImages: [],
      waterfallImages: [],
      sunsetImages: [],
    };
  }
  
  // Obtains API information on app start
  componentDidMount() {
    this.performSearch('dogs', 'dogImages');
    this.performSearch('waterfalls', 'waterfallImages');
    this.performSearch('sunsets', 'sunsetImages');
  }

  // Generic Axios request to update state
  performSearch = (query, keyState = 'searchedImages') => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        [keyState]: response.data.photos.photo
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
          <SearchForm onSearch={this.performSearch} />
          <Nav />  
          <Switch>
            <Route exact path="/" render={ () => 
                <Redirect to="/dogs" />
            }/>

            <Route path="/dogs" render={ () => 
                <PhotoContainer
                  data={this.state.dogImages}
                />
            }/>
            <Route path="/waterfalls" render={ () => 
                <PhotoContainer
                  data={this.state.waterfallImages}
                />
            }/>          
            <Route path="/sunsets" render={ () => 
                <PhotoContainer
                  data={this.state.sunsetImages}
                />
            }/>
            <Route path="/search/:query" render={ () => 
                <PhotoContainer
                  data={this.state.searchedImages}
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
