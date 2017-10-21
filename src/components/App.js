import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import Google from './Google';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Carpe Diem</h1>
        </header>
        <br />
        <Google />
      </div>
    );
  }
}

export default App;
