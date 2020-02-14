import React from 'react';
import { Link } from 'react-router-dom'

import './Navbar.scss';

export default class Navbar extends React.Component {
    render() {
        return (
            <header className="navbar">
                <div id="header-left" className="header-child"></div>
                <div id="header-center" className="header-child">
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    <div className="App-title">CARPE DIEM</div>
                    <span>Homepage. Planner. <b>You.</b></span>
                </div>
                <div id="header-right" className="header-child">
                    {this.props.user != null
                    ? <div id='user-container'><span>Hi {this.props.user}</span><br/><button className="custom-button" onClick={this.props.logout}>Sign Out</button></div>
                    : <Link to="/login"><button className="custom-button">Sign In</button></Link>
                    }
                </div>
            </header>
        )
    }
}