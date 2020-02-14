import React from 'react';
import axios from 'axios';
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
        if (prevProps != this.props) {
            this.getLocations();
        }
    }

    getLocations() {
        if (this.props.user != null) {
            axios.post('/findlocations', { user: this.props.user }).then(data => {
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

    changeZip(index) {
        this.setState({
            locationIndex: index
        })
    }

    render() {
        return (
            <div id='events'>
                <Locations user={this.props.user} locations={this.state.locations} getLocations={this.getLocations} changeZip={this.changeZip}/>
                <br />
                {
                    this.state.locations.length > 0
                        ? (
                            <div id='divider'>
                                <Weather location={this.state.locations[this.state.locationIndex]} />
                                <Activites location={this.state.locations[this.state.locationIndex]} />
                            </div>
                        )
                        : false
                    }

            </div>
        )
    }
}

let defaultLocation = ['10012']