import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';

class Placeholder extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to Carpe Diem</h1>
            </header>
        );
    }
}

export default Placeholder;