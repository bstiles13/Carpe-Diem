import React from 'react';
import axios from 'axios';
import { get, isNumber, replace } from 'lodash';
import moment from 'moment';
import { Menu, Image, Card, Item, Loader } from 'semantic-ui-react'
import { map } from 'lodash';
import placeholderImage from '../../assets/images/placeholder.png';
import familyHeader from '../../assets/images/family.jpg';
import musicHeader from '../../assets/images/music.jpg';
import sportsHeader from '../../assets/images/sports.png';
import comedyHeader from '../../assets/images/comedy.jpg';
import outdoorsHeader from '../../assets/images/outdoors.jpg';
import attractionsHeader from '../../assets/images/attractions.jpg';
import animalsHeader from '../../assets/images/animals.jpg';

import './Activities.scss';

export default class Activities extends React.Component {
  state = {
    activities: [],
    toggledCategory: 'Family Activities',
    toggledId: 'family_fun_kids',
    toggledTab: 0,
    togglePreloader: false
  }

  componentDidMount() {
    this.setActivities();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.location !== this.props.location ||
      prevState.toggledCategory !== this.state.toggledCategory
    ) {
      this.setActivities();
    }
  }

  // handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  setActivities = () => {
    const { location } = this.props;

    if (!location) return;

    this.setState({ isFetching: true })

    axios.post('/activities', { zip: location, id: this.state.toggledId })
      .then(data => {
        this.setState({ activities: data.data, isFetching: false })
      })
  }

  toggleCategory = (category, id, index) => {
    this.setState({
      toggledCategory: category,
      toggledId: id,
      toggledTab: index
    })
  }

  renderTabs = () => {
    const { toggledTab } = this.state

    if (!toggledTab && !isNumber(toggledTab)) return;

    return activityDefaults.map((activity, index) => {
      return (
        <Menu.Item
          key={index}
          name={activity.category}
          active={toggledTab === index}
          onClick={() => this.toggleCategory(activity.category, activity.id, index)}
        />
      )
    })
  }

  renderImage = (category) => {
    switch (category) {
      case 'Family Activities':
        return familyHeader
      case 'Music':
        return musicHeader
      case 'Sports':
        return sportsHeader
      case 'Comedy':
        return comedyHeader
      case 'Outdoors':
        return outdoorsHeader
      case 'Museums & Attractions':
        return attractionsHeader
      case 'Animals':
        return animalsHeader
      default:
        return;
    }
  }

  renderActivities = () => {
    return map(this.state.activities, (event, index) => {
      const imageUrl = replace(get(event, 'image.medium.url', get(event, 'image.url')), 'medium', 'large');
      const venue = event.venue_name || 'Click to learn more'
      const date = moment(new Date(event.start_time)).format('MMMM Do YYYY, h:mm a')
      return (
        <Card key={index} onClick={() => window.open(event.url, '_blank')}>
          <Image className='event-image' src={imageUrl || placeholderImage} verticalAlign='top' />
          <Card.Content>
            <Card.Header>{event.title}</Card.Header>
            <Card.Meta>{date}</Card.Meta>
            <Card.Description>{venue}</Card.Description>
            <Card.Description>{event.venue_address}</Card.Description>
          </Card.Content>
        </Card>
      )
    })
  }

  render() {
    const { location } = this.props;

    if (!location) return false;

    return (
      <div className='activities-container'>
        <div className='activities-header' style={{ backgroundImage: `url(${this.renderImage(this.state.toggledCategory)})`}}>
          <div>HAPPENING NEARBY</div>
        </div>
        <Menu className='category-list' pointing secondary inverted>
          {this.renderTabs()}
        </Menu>
        <div className='activities-content'>
          {
            this.state.isFetching
              ? (
                <div className='loader-container'>
                  <Loader active inverted inline='centered' size='large' />
                  <div className='loader-text'>Fetching Event Data</div>
                </div>
              )
              : (
                <Card.Group className='activity-list' itemsPerRow={5} stackable>
                  {this.renderActivities()}
                </Card.Group>
              )
          }
        </div>
      </div>
    )
  }
}

const activityDefaults = [
  { category: 'Family Activities', id: 'family_fun_kids' },
  { category: 'Music', id: 'music' },
  { category: 'Comedy', id: 'comedy' },
  { category: 'Sports', id: 'sports' },
  { category: 'Outdoors', id: 'outdoors_recreation' },
  { category: 'Museums & Attractions', id: 'attractions' },
  { category: 'Animals', id: 'animals' }
]