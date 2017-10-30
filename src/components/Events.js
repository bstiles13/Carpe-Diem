import React from 'react';
import Weather from './Weather';
import Activites from './Activities';

export default class Events extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            locationInput: '',
            locations: ['80138', '90028'],
            editing: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            locationInput: e.target.value
        })
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
                                <i className="material-icons success-icon">send</i>
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