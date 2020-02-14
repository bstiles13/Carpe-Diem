import React, { Component } from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom'
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import RouteMenu from './components/RouteMenu/RouteMenu';
import Home from './components/Home/Home';
import Events from './components/Events/Events';
import Login from './components/Login/Login';
import ModalWelcome from './components/ModalWelcome/ModalWelcome';

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: null
    }
    this.checkUser = this.checkUser.bind(this);
    this.setUser = this.setUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.checkUser();
  }

  checkUser() {
    let userHistory = localStorage.getItem('carpeToken');
    if (userHistory != null && userHistory != 'null' && userHistory != undefined) {
      this.setUser(userHistory);
    } else {
      this.setUser(null);
    }
  }

  setUser(user) {
    this.setState({ user: user });
  }

  logout() {
    localStorage.setItem('carpeToken', null);
    this.setState({ user: null })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar user={this.state.user} setUser={this.setUser} logout={this.logout} />
          <RouteMenu />
          <div id="app-content">
            <Route exact path="/" render={props => <Home user={this.state.user} />} />
            <Route path="/today" render={props => <Events user={this.state.user} />} />
            <Route path="/login" render={props => <Login checkUser={this.checkUser} />} />
          </div>
          {this.state.user == null ? <ModalWelcome /> : false}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
