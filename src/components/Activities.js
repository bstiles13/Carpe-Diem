import React from 'react';
import axios from 'axios';
import Preloader from './Preloader';

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
            toggledTab: 0,
            togglePreloader: false
        }
        this.setActivities = this.setActivities.bind(this);
        // this.getActivities = this.getActivities.bind(this);
        this.toggleCategory = this.toggleCategory.bind(this);
        this.renderImage = this.renderImage.bind(this);
    }

    componentDidMount() {
        console.log('mounting');
        this.setActivities();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps != this.props) {
            console.log('props changed');
            this.setActivities();
        }
        console.log('no prop change');
        // console.log(this.state.activities);
    }

    setActivities() {
        let ids = [
            { category: 'Family Activities', id: 'family_fun_kids' },
            { category: 'Music', id: 'music' },
            { category: 'Sports', id: 'sports' },
            { category: 'Comedy', id: 'comedy' },
            { category: 'Outdoors', id: 'outdoors_recreation' }
        ]
        this.setState({ togglePreloader: true })
        // let url = 'https://api.eventful.com/json/events/search?...&location=' + this.props.locations[this.props.locationIndex] + '&within=100&&date=Future&t=This+Week&category=' + id + '&app_key=KJbX3nZkSCDVrQCJ'
        axios.get('https://api.eventful.com/json/events/search?...&location=' + this.props.locations[this.props.locationIndex] + '&within=100&date=Future&t=This+Week&category=' + ids[0].id + '&app_key=KJbX3nZkSCDVrQCJ').then(data => {
            let activities = this.state.activities;
            activities[ids[0].category] = data.data.events.event;
            this.setState({ activities: activities }, () => {
                axios.get('https://api.eventful.com/json/events/search?...&location=' + this.props.locations[this.props.locationIndex] + '&within=100&&date=Future&t=This+Week&category=' + ids[1].id + '&app_key=KJbX3nZkSCDVrQCJ').then(data => {
                    let activities = this.state.activities;
                    activities[ids[1].category] = data.data.events.event;
                    this.setState({ activities: activities }, () => {
                        axios.get('https://api.eventful.com/json/events/search?...&location=' + this.props.locations[this.props.locationIndex] + '&within=100&&date=Future&t=This+Week&category=' + ids[2].id + '&app_key=KJbX3nZkSCDVrQCJ').then(data => {
                            let activities = this.state.activities;
                            activities[ids[2].category] = data.data.events.event;
                            this.setState({ activities: activities }, () => {
                                axios.get('https://api.eventful.com/json/events/search?...&location=' + this.props.locations[this.props.locationIndex] + '&within=100&&date=Future&t=This+Week&category=' + ids[3].id + '&app_key=KJbX3nZkSCDVrQCJ').then(data => {
                                    let activities = this.state.activities;
                                    activities[ids[3].category] = data.data.events.event;
                                    this.setState({ activities: activities }, () => {
                                        axios.get('https://api.eventful.com/json/events/search?...&location=' + this.props.locations[this.props.locationIndex] + '&within=100&&date=Future&t=This+Week&category=' + ids[4].id + '&app_key=KJbX3nZkSCDVrQCJ').then(data => {
                                            let activities = this.state.activities;
                                            activities[ids[4].category] = data.data.events.event;
                                            this.setState({ activities: activities }, () => {  
                                                this.setState({ togglePreloader: false })                                                
                                                console.log('got events')
                                            })
                                        })
                                        console.log('got events')
                                    })
                                })
                                console.log('got events')
                            })
                        })
                        console.log('got events')
                    })
                })
                console.log('got events')
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
            return <li key={index} className="tab col s3" onClick={() => this.toggleCategory(key, index)}><a className={this.state.toggledTab == index ? "active" : ""} href="#">{key}</a></li>
        })
    }

    renderActivities() {
        console.log('RENDERING ACTIVITIES');
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
                <div className="card-image" style={{ 'backgroundImage': 'url(' + this.renderImage(this.state.toggledCategory) + ')', 'backgroundPosition': 'left center', 'backgroundSize': 'cover' }}>
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
                        {
                            this.state.togglePreloader
                            ? <Preloader />
                            : this.renderActivities()
                        }
                    </div>
                </div>
            </div>
        )
    }
}