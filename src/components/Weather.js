import React from 'react';
import axios from 'axios';
import Preloader from './Preloader';
import moment from 'moment';

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
        let url = 'https://api.openweathermap.org/data/2.5/forecast/daily?zip=' + this.props.location + '&appid=1c57aba5a8389d9dcf250be4f7cce17b&cnt=11&units=imperial';
        axios.get(url).then(data => {
            this.setState({
                weather: data.data
            })
        })
    }

    renderToday() {
        if (this.state.weather != null) {
            let today = this.state.weather.list[0];
            let icon = today.weather[0].icon;
            let img = 'http://openweathermap.org/img/w/' + icon + '.png';
            return (
                <div>
                    <div className='event-content-header'>TODAY</div>
                    <div id='today'>
                        <div className='today-child'>
                            <img src={img} />
                        </div>
                        <div className='today-child'>
                            <span style={{'fontSize': '25px'}}>{today.temp.max.toFixed(0)} °</span>
                        </div>
                        <div className='today-child'>
                            <div>L {today.temp.min.toFixed(0)}° H {today.temp.max.toFixed(0)}°</div>
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
            let forecast = this.state.weather.list;
            forecast.shift();
            let renderForecast = forecast.map((day, index) => {
                return (
                    <div className='daily' key={index}>
                        <h5>{moment.unix(day.dt).format('ddd')}</h5>
                        <div>{moment.unix(day.dt).format("DD MMM YYYY")}</div>
                        <div className='daily-details'>
                            <div className='daily-child'>{day.weather[0].main.toUpperCase()}</div>
                            <div className='daily-child'>HIGH: {day.temp.max.toFixed(0)}</div>
                            <div className='daily-child'>LOW: {day.temp.min.toFixed(0)}</div>
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
        let city = this.state.weather ? this.state.weather.city : '';

        return (
            <div id='weather-container' className="event-card">
                <div className='event-card-title grey darken-4'>
                    <h5 className='event-header'>WEATHER</h5>
                    {this.state.weather != null ? <div>{city.name + ', ' + city.country}</div> : false}
                </div>
                <div className='event-card-content'>
                    {this.renderToday()}
                    {this.renderForecast()}
                </div>
            </div>
        )
    }
}