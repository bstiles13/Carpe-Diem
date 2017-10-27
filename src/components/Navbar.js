import React from 'react';
import ModalLogin from './ModalLogin';

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
                    <button data-target="modal2" id="login-modal" className="btn-flat modal-trigger button-spacer">Sign In</button>
                </div>
                <ModalLogin setUser={this.props.setUser} />
            </header>
        )
    }
}