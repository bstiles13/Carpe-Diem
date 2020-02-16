import React from 'react';
import axios from 'axios';
import { Label, Icon, Input, Button } from 'semantic-ui-react';

import './Locations.scss';

export default class Locations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationInput: '',
      editing: false,
      warningToggle: false,
      warningText: 'Please enter valid zip code'
    }
    this.handleChange = this.handleChange.bind(this);
    this.saveLocation = this.saveLocation.bind(this);
    this.removeLocation = this.removeLocation.bind(this);
  }

  handleChange(e) {
    this.setState({
      locationInput: e.target.value
    })
  }

  saveLocation() {
    const { locationInput } = this.state;
    const { locations, user } = this.props;

    if (locationInput === '' || isNaN(locationInput) || parseInt(locationInput) < 501 || parseInt(locationInput) > 99950) {
      this.setState({ warningToggle: true })
    } else {
      locations.unshift(locationInput);
      axios.post('/updatelocations', { locations, user }).then(data => {
        let result = data.data;
        if (result) {
          this.setState({ editing: false })
          this.setState({ warningTogggle: false })
          this.props.changeZip(0);
          this.props.getLocations();
        }
      })
    }
  }

  removeLocation(index) {
    let locations = this.props.locations;
    locations.splice(index, 1);
    axios.post('/updatelocations', { locations: locations, user: this.props.user }).then(data => {
      let result = data.data;
      if (result) {
        this.props.changeZip(0);
        this.props.getLocations();
      }
    })
  }

  renderLocations() {
    let locations = this.props.locations;

    if (!locations) return;

    return locations.map((zip, index) => {
      return (
        <Label as='a' size='big' key={index}>
          <span onClick={() => this.props.changeZip(index)}>{zip}</span>
          <Icon name='delete' onClick={() => this.removeLocation(index)} />
        </Label>
      )
    })
  }

  render() {
    const { locations } = this.props;

    if (!locations) return false;

    return (
      <div className='zip-container'>
        <span className='zip-container-title'>Your Location(s)</span>
        {this.renderLocations()}
        {
          this.state.editing || this.props.locations.length === 0
            ? <div className='edit-location-container'>
              <Input type='text' placeholder='Enter zip code...' action>
                <input onChange={this.handleChange} />
                <Button.Group>
                  <Button onClick={this.saveLocation}>Add</Button>
                  <Button.Or />
                  <Button onClick={() => this.setState({ editing: false })}>Cancel</Button>
                </Button.Group>
              </Input>
              {
                this.state.warningToggle
                  ? <div className='login-warning'>{this.state.warningText}</div>
                  : false
              }
            </div>
            : (
              <Label as='a' size='big' onClick={() => this.setState({ editing: true })}>
                New Zip
              </Label>
            )
        }
      </div>
    )
  }
}