import React from 'react';
import axios from 'axios';
import { get } from 'lodash';
import moment from 'moment';
import Preloader from './Preloader';
import familyHeader from '../images/family.jpg';
import musicHeader from '../images/music.jpg';
import sportsHeader from '../images/sports.png';
import comedyHeader from '../images/comedy.jpg';
import outdoorsHeader from '../images/outdoors.jpg';
import attractionsHeader from '../images/attractions.jpg';
import animalsHeader from '../images/animals.jpg';


export default class Activities extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activities: null,
            toggledCategory: 'Family Activities',
            toggledId: 'family_fun_kids',
            toggledTab: 0,
            togglePreloader: false
        }
        this.setActivities = this.setActivities.bind(this);
        this.toggleCategory = this.toggleCategory.bind(this);
        this.renderImage = this.renderImage.bind(this);
    }

    componentDidMount() {
        this.setActivities();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps != this.props) {
            this.setActivities();
        }
    }

    setActivities() {
        this.setState({ togglePreloader: true })
        let zip = this.props.location;
        axios.post('/activities', { zip: zip, id: this.state.toggledId }).then(data => {
            this.setState({ activities: data.data })
            this.setState({ togglePreloader: false })

        })
    }

    toggleCategory(category, id, index) {
        this.setState({
            toggledCategory: category,
            toggledId: id,
            toggledTab: index
        }, () => {
            this.setActivities();
        })
    }

    renderTabs() {
        return activityDefaults.map((activity, index) => {
            return <li key={index} className="tab col s3" onClick={() => this.toggleCategory(activity.category, activity.id, index)}><a className={this.state.toggledTab == index ? "active" : ""} href="#">{activity.category}</a></li>
        })
    }

    renderImage(category) {
        switch (category) {
            case 'Family Activities':
                return familyHeader
                break;
            case 'Music':
                return musicHeader
                break;
            case 'Sports':
                return sportsHeader
                break;
            case 'Comedy':
                return comedyHeader
                break;
            case 'Outdoors':
                return outdoorsHeader
                break;
            case 'Museums & Attractions':
                return attractionsHeader
                break;
            case 'Animals':
                return animalsHeader
                break;
        }
    }

    renderActivities() {
        let list = this.state.togglePreloader
            ? <Preloader />
            : (
                this.state.activities != null
                    ? this.state.activities.map((event, index) => {
                        const imageUrl = get(event, 'image.medium.url', get(event, 'image.url'));
                        const venue = event.venue_name || 'Click to learn more'
                        const date = moment(new Date(event.start_time)).format('MMMM Do YYYY, h:mm a')
                        return (
                            <li className="collection-item avatar activity-item" key={index} onClick={() => window.open(event.url, "_blank")}>
                                <div className='event-content'>
                                    <div className='left-content'>
                                        <div className='event-details'><div className='event-label'>What:</div> {event.title}</div>
                                        <div className='event-details'><div className='event-label'>Where:</div> {venue}</div>
                                        <div className='event-details'><div className='event-label'>Address:</div> {event.venue_address}</div>
                                        <div className='event-details'><div className='event-label'>Time:</div> {date}</div>
                                    </div>
                                    <div className='right-content'>
                                        <img src={imageUrl} />
                                    </div>
                                </div>
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
                    <div>
                        <div id="activity-tabs" className="col s12">
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
    { category: 'Comedy', id: 'comedy' },
    { category: 'Sports', id: 'sports' },
    { category: 'Outdoors', id: 'outdoors_recreation' },
    { category: 'Museums & Attractions', id: 'attractions' },
    { category: 'Animals', id: 'animals' }
]