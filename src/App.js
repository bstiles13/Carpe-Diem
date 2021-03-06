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
    userHistory
      ? this.setUser(userHistory)
      : this.setUser(null);
  }

  setUser(user) {
    this.setState({ user });
  }

  logout() {
    localStorage.removeItem('carpeToken');
    this.setState({ user: null })
  }

  render() {
    return (
      <BrowserRouter>
        <div className='app'>
          <Navbar user={this.state.user} setUser={this.setUser} logout={this.logout} />
          <RouteMenu user={this.state.user} logout={this.logout} />
          <div className='app-content'>
            <Route exact path='/' render={props => <Events user={this.state.user} toggle='weather' />} />
            <Route path='/mystuff' render={props => <Home user={this.state.user} />} />
            <Route path='/activities' render={props => <Events user={this.state.user} toggle='activities' />} />
            <Route path='/login' render={props => <Login checkUser={this.checkUser} />} />
          </div>
          {!this.state.user ? <ModalWelcome /> : false}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
