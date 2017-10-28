import React from 'react';
import Google from './Google';
import Favorites from './Favorites';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="home">
                <br />
                <Google />
                <Favorites user={this.props.user}/>
            </div>
        )
    }
}