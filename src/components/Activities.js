import React from 'react';
import axios from 'axios';
import Preloader from './Preloader';

export default class Activities extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activities: null,
            toggledCategory: 'Family Activities',
            toggledTab: 0,
            togglePreloader: false
        }
        this.setActivities = this.setActivities.bind(this);
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
        this.setState({ togglePreloader: true })
        let zip = this.props.locations[this.props.locationIndex];
        axios.post('/activities', { zip: zip, activities: activityDefaults }).then(data => {
            console.log('RECEIVED ACTIVITY DATA');
            this.setState({ activities: data.data })
            this.setState({ togglePreloader: false })

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
            case 'Museum & Attractions':
                return 'http://www.vam.ac.uk/__data/assets/image/0014/240008/closed_header_2.jpg'
                break;
        }
    }

    renderTabs() {
        return activityDefaults.map((activity, index) => {
            return <li key={index} className="tab col s3" onClick={() => this.toggleCategory(activity.category, index)}><a className={this.state.toggledTab == index ? "active" : ""} href="#">{activity.category}</a></li>
        })
    }

    renderActivities() {
        let list = this.state.togglePreloader
            ? <Preloader />
            : (
                this.state.activities != null
                    ? this.state.activities[this.state.toggledCategory].map((event, index) => {
                        return (
                            <li className="collection-item avatar" key={index}>
                                <i className="material-icons circle">location_on</i>
                                <span className="title">{event.title}</span>
                                <p>{event.venue_address} <br />
                                    {event.start_time}
                                </p>
                                <a href={event.url} target="_blank" className="secondary-content"><i className="material-icons">info_outline</i></a>
                            </li>
                        )
                    })
                    : false
            )
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

let activityDefaults = [
    { category: 'Family Activities', id: 'family_fun_kids' },
    { category: 'Music', id: 'music' },
    { category: 'Sports', id: 'sports' },
    { category: 'Comedy', id: 'comedy' },
    { category: 'Outdoors', id: 'outdoors_recreation' },
    { category: 'Museum & Attractions', id: 'attractions' }
]