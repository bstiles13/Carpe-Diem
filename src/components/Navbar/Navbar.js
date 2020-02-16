import React from 'react';
import { Link } from 'react-router-dom'

import './Navbar.scss';

export default class Navbar extends React.Component {
  render() {
    return (
      <header className='navbar'>
        <div id='header-left' className='header-child'></div>
        <div id='header-center' className='header-child'>
          <div className='navbar-title'>CARPE DIEM</div>
          <span>Homepage. Planner. <b>You.</b></span>
        </div>
      </header>
    )
  }
}