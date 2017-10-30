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
        this.renderImage = this.renderImage.bind(this);
    }

    componentDidMount() {
        this.getActivities();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps != this.props) {
            this.getActivities();
        }
        console.log(this.state.activities);
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
        this.setState({
            toggledCategory: category
        })
        this.setState({
            toggledTab: index
        })
    }

    renderImage(category) {
        switch (category) {
            case 'Family Activities':
                return 'http://youthvoices.net/sites/default/files/image/124947/sep/header-family.jpg'
                break;
            case 'Music':
                return 'https://motechdevelopment.com/wp-content/uploads/2014/12/modern-colour-music-header-1c.jpg'
                break;
            case 'Sports':
                return 'http://pumpandtap.com/wp-content/uploads/2016/03/pumpandtap-sportsheader-e1457827819293.png'
                break;
            case 'Comedy':
                return 'https://www.singingsuccess.com/wp-content/uploads/2016/12/mic-header.jpg'
                break;
            case 'Outdoors':
                return 'https://blog.homeexchange.com/wp-content/uploads/2016/11/comm609_nightsky_header.jpg'
                break;
        }
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
            return (
                <li className="collection-item avatar">
                    <i className="material-icons circle">location_on</i>
                    <span className="title">{index.title}</span>
                    <p>{index.venue_address} <br />
                        {index.start_time}
                    </p>
                    <a href={index.url} target="_blank" className="secondary-content"><i className="material-icons">info_outline</i></a>
                </li>
            )
        })
        return (
            <div className="card activity-card">
                <div className="card-image" style={ {'backgroundImage': 'url(' + this.renderImage(this.state.toggledCategory) + ')', 'backgroundPosition': 'left center', 'backgroundSize': 'cover'} }>
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
                    <h5 className='event-header'>HAPPENING NEARBY</h5>
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