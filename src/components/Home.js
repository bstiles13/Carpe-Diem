import React from 'react';
import Google from './Google';
import Favorites from './Favorites';

export default class Home extends React.Component {
    render() {
        return (
            <div id="app-content">
                <br />
                <Google />
                <Favorites />
            </div>
        )
    }
}