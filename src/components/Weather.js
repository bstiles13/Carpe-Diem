import React from 'react';
import axios from 'axios';
import Preloader from './Preloader';

export default class Weather extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            weather: null
        }
    }

    componentDidMount() {
        this.getWeather();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps != this.props) {
            this.getWeather();
        }
    }

    getWeather() {
        let url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22w=" + this.props.locations[this.props.locationIndex] + "%22)&format=json"
        axios.get(url).then(data => {
            this.setState({
                weather: data.data
            })
        })
    }

    renderToday() {
        if (this.state.weather != null) {
            let weather = this.state.weather.query.results.channel;
            let img = weather.item.description;
            img = img.split('"')[1];
            return (
                <div>
                    <div className='event-content-header'>TODAY</div>
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
                <Preloader />
            )
        }
    }

    renderForecast() {
        if (this.state.weather != null) {
            let forecast = this.state.weather.query.results.channel.item.forecast;
            let renderForecast = forecast.map((day, index) => {
                return (
                    <div className='daily' key={index}>
                        <h5>{day.day}</h5>
                        <div>{day.date}</div>
                        <div className='daily-details'>
                            <div className='daily-child'>{day.text.toUpperCase()}</div>
                            <div className='daily-child'>HIGH: {day.high.toUpperCase()}</div>
                            <div className='daily-child'>LOW: {day.low.toUpperCase()}</div>
                        </div>
                    </div>
                )
            })
            return (
                <div id='forecast'>
                    <div className='event-content-header'>10-DAY FORECAST</div>
                    {renderForecast}
                </div>
            )
        }
    }

    render() {
        return (
            <div id='weather-container' className="event-card">
                <div className='event-card-title grey darken-4'>
                    <h5 className='event-header'>WEATHER</h5>
                    {this.state.weather != null ? <div>{this.state.weather.query.results.channel.location.city + ', ' + this.state.weather.query.results.channel.location.region}</div> : false}
                </div>
                <div className='event-card-content'>
                    {this.renderToday()}
                    {this.renderForecast()}
                </div>
            </div>
        )
    }
}