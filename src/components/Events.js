import React from 'react';
import axios from 'axios';
import Weather from './Weather';
import Activites from './Activities';

export default class Events extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            locationInput: '',
            locations: defaultLocation,
            editing: false,
            warningToggle: false,
            warningText: 'Please enter valid zip code'
        }
        this.handleChange = this.handleChange.bind(this);
        this.getLocations = this.getLocations.bind(this);
        this.saveLocation = this.saveLocation.bind(this);
    }

    componentDidMount() {
        this.getLocations();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps != this.props) {
            this.getLocations();
        }
        console.log('favorites updated', this.state.locations);
    }

    getLocations() {
        if (this.props.user != null) {
            console.log('user:', this.props.user);
            axios.post('http://localhost:3001/findlocations', { user: this.props.user }).then(data => {
                console.log('got locations', data);
                this.setState({
                    locations: data.data[0].zip
                })
            })
        } else {
            this.setState({
                locations: defaultLocation
            })
        }
    }

    handleChange(e) {
        this.setState({
            locationInput: e.target.value
        })
    }

    saveLocation() {
        let locations = this.state.locations;
        if (isNaN(this.state.locationInput) || parseInt(this.state.locationInput) < 501 || parseInt(this.state.locationInput) > 99950) {
            this.setState({ warningToggle: true })
        } else {
            locations.unshift(this.state.locationInput);
            axios.post('http://localhost:3001/updatelocations', { locations: locations, user: this.props.user }).then(data => {
                let result = data.data;
                if (result == true) {
                    console.log('save successful');
                    this.setState({ editing: false })
                    this.setState({ warningTogggle: false })
                    this.getLocations();
                }
            })
        }
    }

    renderLocations() {
        let locations = this.state.locations;
        return locations.map(zip => {
            return (
                <span className="zip">
                    <span>{zip}</span>
                    <i className="material-icons">close</i>
                </span>
            )
        })
    }

    render() {
        return (
            <div id='events'>
                <h5>Today's Events</h5>
                <hr />
                <div id='zip-container'>
                    {/* <span>My Location(s):</span> */}
                    {this.renderLocations()}
                    {
                        this.state.editing
                            ? <div>
                                <div className="input-field inline">
                                    <input placeholder="Zip code..." type="text" className="validate" onChange={this.handleChange} />
                                </div>
                                <i className="material-icons success-icon" onClick={this.saveLocation}>send</i>
                                {
                                    this.state.warningToggle
                                    ? <div className='login-warning'>{this.state.warningText}</div>
                                    : false
                                }
                            </div>
                            : <i className="material-icons" onClick={() => this.setState({ editing: !this.state.editing })}>add</i>
                    }
                </div>
                <br />

                <div id='divider'>
                    <Weather locations={this.state.locations} />
                    <Activites locations={this.state.locations} />
                </div>
            </div>
        )
    }
}

let defaultLocation = ['10012']