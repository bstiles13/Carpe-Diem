import React from 'react';
import axios from 'axios';
import Weather from './Weather';
import Activites from './Activities';

export default class Events extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            locationInput: '',
            locations: [defaultLocation],
            locationIndex: 0,
            editing: false,
            warningToggle: false,
            warningText: 'Please enter valid zip code'
        }
        this.handleChange = this.handleChange.bind(this);
        this.getLocations = this.getLocations.bind(this);
        this.saveLocation = this.saveLocation.bind(this);
        this.changeZip = this.changeZip.bind(this);
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
            axios.post('/findlocations', { user: this.props.user }).then(data => {
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
            axios.post('/updatelocations', { locations: locations, user: this.props.user }).then(data => {
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

    removeLocation(index) {
        let locations = this.state.locations;
        locations.splice(index, 1);
        axios.post('/updatelocations', { locations: locations, user: this.props.user }).then(data => {
            let result = data.data;
            if (result == true) {
                console.log('save successful');
                this.setState({ locationIndex: 0 })
                this.getLocations();
            }
        })
    }

    changeZip(index) {
        this.setState({
            locationIndex: index
        })
    }

    renderLocations() {
        let locations = this.state.locations;
        return locations.map((zip, index) => {
            return (
                <span className="zip">
                    <span onClick={() => this.changeZip(index)}>{zip}</span>
                    <i className="material-icons" onClick={() => this.removeLocation(index)}>close</i>
                </span>
            )
        })
    }

    render() {
        return (
            <div id='events'>
                <div id='zip-container'>
                    <span>Choose Location</span>
                    {this.renderLocations()}
                    {
                        this.state.editing || this.state.locations.length == 0
                            ? <div>
                                <div className="input-field inline">
                                    <input placeholder="Enter zip code..." type="text" className="validate" onChange={this.handleChange} />
                                </div>
                                <i className="material-icons success-icon apply-pointer" onClick={this.saveLocation}>send</i>
                                {
                                    this.state.warningToggle
                                        ? <div className='login-warning'>{this.state.warningText}</div>
                                        : false
                                }
                            </div>
                            : <i className="material-icons apply-pointer" onClick={() => this.setState({ editing: true })}>add</i>
                    }
                </div>
                <br />
                {
                    this.state.locations.length > 0
                        ? (
                            <div id='divider'>
                                <Weather locations={this.state.locations} locationIndex={this.state.locationIndex} />
                                <Activites locations={this.state.locations} locationIndex={this.state.locationIndex} />
                            </div>
                        )
                        : false
                    }

            </div>
        )
    }
}

let defaultLocation = ['10012']