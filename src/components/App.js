import React, { Component } from 'react';
import './App.css';
// import Placeholder from './Placeholder';
import Navbar from './Navbar';
import Google from './Google';
import Favorites from './Favorites';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div id="app-content">
          <br />
          <Google />
          <Favorites />
        </div>
      </div>
    );
  }
}

export default App;
