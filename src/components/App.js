import React, { Component } from 'react';
import './App.css';
// import Placeholder from './Placeholder';
import Navbar from './Navbar';
import Google from './Google';
import Favorites from './Favorites';

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: null
    }
  }

  setUser(user) {
    this.setState({ user: user });    
  }

  render() {
    return (
      <div className="App">
        <Navbar setUser={this.setUser} />
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
