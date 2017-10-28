import React from 'react';
import { Link } from 'react-router-dom'

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
                    {this.props.user != null
                    ? <button id="logout-button" className="btn-flat button-spacer" onClick={this.props.logout}>Sign Out</button>
                    : <Link to="/login">Sign In</Link>
                    }
                </div>
            </header>
        )
    }
}