import React from 'react';
import axios from 'axios';

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
            let img = this.state.weather.query.results.channel.item.description;
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
                    <h5>WEATHER</h5>
                </div>
                <div className='event-card-content'>
                    {this.renderToday()}
                    {this.renderForecast()}
                </div>
            </div>
        )
    }
}