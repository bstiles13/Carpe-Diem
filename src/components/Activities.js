import React from 'react';
import axios from 'axios';

export default class Activities extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activities: {
                'Family Activities': [],
                'Music': [],
                'Sports': [],
                'Comedy': [],
                'Outdoors': []
            },
            toggledCategory: 'Family Activities',
            toggledTab: 0
        }
        this.setActivities = this.setActivities.bind(this);
        this.getActivities = this.getActivities.bind(this);
        this.toggleCategory = this.toggleCategory.bind(this);
    }

    componentDidMount() {
        this.getActivities();      
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps != this.props) {
            this.getActivities();
        }
    }

    getActivities() {
        this.setActivities('Family Activities', 'family_fun_kids');
        this.setActivities('Music', 'music');
        this.setActivities('Sports', 'sports');
        this.setActivities('Comedy', 'comedy');
        this.setActivities('Outdoors', 'outdoors_recreation');
    }

    setActivities(category, id) {
        let url = 'http://api.eventful.com/json/events/search?...&location=' + this.props.locations[this.props.locationIndex] + '&within=100&&date=Future&t=This+Week&category=' + id + '&app_key=KJbX3nZkSCDVrQCJ'
        axios.get(url).then(data => {
            let activities = this.state.activities;
            activities[category] = data.data.events.event;
            this.setState({
                activities: activities
            })
        })
    }

    toggleCategory(category, index) {
        console.log(category);
        this.setState({
            toggledCategory: category
        })
        this.setState({
            toggledTab: index
        })
    }

    renderTabs() {
        let activities = this.state.activities;
        return Object.keys(activities).map((key, index) => {
            return <li className="tab col s3" onClick={() => this.toggleCategory(key, index)}><a className={this.state.toggledTab == index ? "active" : ""} href="#">{key}</a></li>
        })
    }

    renderActivities() {
        let activities = this.state.activities[this.state.toggledCategory];
        let list = activities.map(index => {
            return <li className="collection-item">{index.title}</li>
        })
        return (
            <div className="card activity-card">
                <div className="card-image">
                    <img src="https://c1.staticflickr.com/9/8661/16541122548_2428167c86_z.jpg" />
                    <span className="card-title">{this.state.toggledCategory}</span>
                </div>
                <div className="card-content">
                    <ul className="collection">
                        {list}
                    </ul>
                </div>
                <div className="card-action">
                    <a href="#">This is a link</a>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div id='activity-container' className="event-card">
                <div className='event-card-title grey darken-4'>
                    <h5>HAPPENING NEARBY</h5>
                </div>
                <div className='event-card-content'>
                    <div className="row">
                        <div className="col s12">
                            <ul className="tabs grey darken-4">
                                {this.renderTabs()}
                            </ul>
                        </div>
                    </div>
                    <div id='activity-list'>
                        {this.renderActivities()}
                    </div>
                </div>
            </div>
        )
    }
}