import React from 'react';
import axios from 'axios';

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
        let locations = this.props.locations;
        if (isNaN(this.state.locationInput) || parseInt(this.state.locationInput) < 501 || parseInt(this.state.locationInput) > 99950) {
            this.setState({ warningToggle: true })
        } else {
            locations.unshift(this.state.locationInput);
            axios.post('/updatelocations', { locations: locations, user: this.props.user }).then(data => {
                let result = data.data;
                if (result == true) {
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
            if (result == true) {
                this.props.changeZip(0);
                this.props.getLocations();
            }
        })
    }

    renderLocations() {
        let locations = this.props.locations;
        return locations.map((zip, index) => {
            return (
                <span className="zip" key={index}>
                    <span onClick={() => this.props.changeZip(index)}>{zip}</span>
                    <i className="material-icons" onClick={() => this.removeLocation(index)}>close</i>
                </span>
            )
        })
    }

    render() {
        return (
            <div id='zip-container'>
                <span>Choose Location</span>
                {this.renderLocations()}
                {
                    this.state.editing || this.props.locations.length == 0
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
        )
    }
}