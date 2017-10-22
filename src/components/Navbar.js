import React from 'react';
import logo from '../logo.svg';

export default class Navbar extends React.Component {
    render() {
        return (
            <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                <div className="App-title">CARPE DIEM</div>
                <span>Homepage. Planner. <b>You.</b></span>
            </header>
        )
    }
}