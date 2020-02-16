import React from 'react';
import axios from 'axios';
import { get } from 'lodash';
import Weather from '../Weather/Weather';
import Activites from '../Activities/Activities';
import Locations from '../Locations/Locations';

import './Events.scss';

export default class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      locationIndex: 0,
    }
    this.getLocations = this.getLocations.bind(this);
    this.changeZip = this.changeZip.bind(this);
  }

  componentDidMount() {
    this.getLocations();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.getLocations();
    }
  }

  getLocations() {
    if (!!this.props.user) {
      axios.post('/findlocations', { user: this.props.user }).then(data => {
        this.setState({
          locations: get(data, 'data.0.zip')
        })
      })
    } else {
      this.setState({
        locations: defaultLocation
      })
    }
  }

  changeZip(index) {
    this.setState({
      locationIndex: index
    })
  }

  render() {
    const currentLocation = get(this.state, ['locations', this.state.locationIndex]);
    return (
      <div id='events'>
        <Locations
          user={this.props.user}
          locations={this.state.locations}
          activeLocation={currentLocation}
          getLocations={this.getLocations}
          changeZip={this.changeZip} />
        <br />
        <div id='divider'>
          {this.props.toggle === 'weather' && <Weather location={currentLocation} /> }
          {this.props.toggle === 'activities' && <Activites location={currentLocation} /> }
        </div>
      </div>
    )
  }
}

let defaultLocation = ['10012']