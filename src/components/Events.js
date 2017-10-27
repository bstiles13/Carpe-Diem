import React from 'react';
import axios from 'axios';
import Activites from './Activities';

export default class Events extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            locationInput: null,
            locations: ['80138', '90028'],
            weather: null
        }
    }

    componentDidMount() {
        this.getWeather();
    }

    setLocation(e) {
        this.setState({
            locationInput: e.target.value
        })
    }

    getWeather() {
        let url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22w=" + this.state.locations[0] + "%22)&format=json"
        axios.get(url).then(data => {
            this.setState({
                weather: data.data
            })
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

    renderToday() {
        if (this.state.weather != null) {
            let img = this.state.weather.query.results.channel.item.description;
            img = img.split('"')[1];
            return (
                <div>
                    <h5>{this.state.weather.query.results.channel.item.title}</h5>
                    <h5>Now:</h5>
                    <div id='today'>
                        <div className='today-child'>
                            <img src={img} />
                        </div>
                        <div className='today-child'>
                            <h4>{this.state.weather.query.results.channel.item.condition.temp} °</h4>
                        </div>
                        <div className='today-child'>
                            <div>L {this.state.weather.query.results.channel.item.forecast[0].low}° H {this.state.weather.query.results.channel.item.forecast[0].high}°</div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue-only">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div><div className="gap-patch">
                            <div className="circle"></div>
                        </div><div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    renderForecast() {
        if (this.state.weather != null) {
            let forecast = this.state.weather.query.results.channel.item.forecast;
            let renderForecast = forecast.map(day => {
                return (
                    <div className='daily'>
                        <h5>{day.day}</h5>
                        <div>{day.date}</div>
                        <hr />
                        <div>{day.text}</div>
                        <div>High: {day.high} Low: {day.low}</div>
                    </div>
                )
            })
            return (
                <div id='forecast'>
                    {renderForecast}
                </div>
            )
        }
    }

    render() {
        return (
            <div id='events'>
                <h5>Today's Events</h5>
                <hr />
                <div className="row">
                    <div className="input-field col s6">
                        <i className="material-icons prefix">add_location</i>
                        <input id="icon_prefix" type="text" className="validate" onChange={this.setLocation.bind(this)} />
                        <label htmlFor="icon_prefix">Add Location</label>
                    </div>
                </div>
                <div id='zip-chips'>
                    {this.renderLocations()}
                </div>
                <br />
                {this.renderToday()}
                <div id='divider'>
                    <div id='weather'>
                        <h5>10-Day Forecast:</h5>
                        {this.renderForecast()}
                    </div>
                    <Activites locations={this.state.locations}/>
                </div>
            </div>
        )
    }
}