import React from 'react';
import logo from '../logo.svg';

export default class Navbar extends React.Component {
    render() {
        return (
            <header className="App-header">
                <div id="header-left" className="header-child"></div>
                <div id="header-center" className="header-child">
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    <div className="App-title">CARPE DIEM</div>
                    <span>Homepage. Planner. <b>You.</b></span>
                </div>
                <div id="header-right" className="header-child">
                    <button id="sign-in-button">Sign In</button>
                </div>
            </header>
        )
    }
}