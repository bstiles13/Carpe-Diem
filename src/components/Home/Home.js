import React from 'react';
import Google from '../Google/Google';
import Favorites from '../Favorites/Favorites';

import './Home.scss';

export default class Home extends React.Component {
    render() {
        return (
            <div id='home'>
                <br />
                <div className='home-header'>Search</div>
                <Google />
                <div className='home-header'>Bookmarks</div>
                <Favorites user={this.props.user}/>
            </div>
        )
    }
}