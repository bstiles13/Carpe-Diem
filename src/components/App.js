import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'
import './App.css';
// import Placeholder from './Placeholder';
import Navbar from './Navbar';
import Home from './Home';
import Events from './Events';

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
      <BrowserRouter>
        <div className="App">
          <Navbar setUser={this.setUser} />
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/today">Today's Events</Link></li>
          </ul>
          <Route exact path="/" component={Home} />
          <Route path="/today" component={Events} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
