import React from 'react';
import { withRouter } from 'react-router-dom';

class RouteMenu extends React.Component {

    constructor(props) {
        super(props);
        this.routeClick = this.routeClick.bind(this);
    }

    routeClick(path) {
        this.props.history.push(path);
    }

    render() {
        return (
            <div >
                <ul id="route-menu" className="tabs tabs-transparent">
                    <li className="tab" onClick={() => this.routeClick('/')}><a href="#">Home</a></li>
                    <li className="tab" onClick={() => this.routeClick('/today')}><a href="#">My City</a></li>
                </ul>
            </div>
        )
    }

}

export default withRouter(RouteMenu);