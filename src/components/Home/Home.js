import React from 'react';
import Search from '../Search/Search';
import Favorites from '../Favorites/Favorites';

import './Home.scss';

export default class Home extends React.Component {
  render() {
    return (
      <div id='home'>
        <br />
        <div className='home-header'>
          <div className='header-label'>QUICK SEARCH</div>
        </div>
        <Search />
        <div className='home-header'>
          <div className='header-label'>BOOKMARKS</div>
        </div>
        <Favorites user={this.props.user} />
      </div>
    )
  }
}