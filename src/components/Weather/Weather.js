import React from 'react';
import axios from 'axios';
import { Step, Image } from 'semantic-ui-react';
import { get } from 'lodash';
import Preloader from '../Preloader/Preloader';
import moment from 'moment';
import { weather } from '../weather';
import { Clock } from './Clock/Clock';
import { Chart } from './Chart/Chart';

import './Weather.scss';

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
    if (prevProps !== this.props) {
      this.getWeather();
    }
  }

  getWeather() {
    const { location } = this.props;

    if (!location) return;

    // this.setState({ weather }); // enable for testing

    let url = `https://api.weatherapi.com/v1/forecast.json?key=d33533a8d2374bdf80c114629201502&q=${location}&days=10`
    axios.get(url)
      .then(data => {
        this.setState({ weather: data.data })
      })
      .catch(error => {
        return error;
      })
  }

  renderForecast = (forecast) => {
    if (forecast) {
      return forecast.map((day, index) => {
        return (
          <Step key={index} active={index === 0}>
            <img src={day.day.condition.icon} />
            <Step.Content>
              <Step.Title>{moment(day.date).format('ddd')}</Step.Title>
              <Step.Description>HIGH: {day.day.maxtemp_f.toFixed(0)}</Step.Description>
              <Step.Description>LOW: {day.day.mintemp_f.toFixed(0)}</Step.Description>
            </Step.Content>
          </Step>
        )
      })
    }
  }

  renderToday = (today) => {
    if (!today) return;

    return (
      <div className='today-details'>
        <div className='row-one'>
          <div className='details-left'>
            <div>
              <div className='details-primary'>{today.temp_f}°</div>
              <div>{today.condition.text}</div>
            </div>
          </div>
          <div className='details-right'>
            <div>
              <div className='details-primary'><Clock /></div>
              <div>{moment().format('dddd, MMMM Do YYYY')}</div>
            </div>
          </div>
        </div>
        <div className='row-two'>
          <div className='details-left'>
            <Image size='small' src={today.condition.icon} />
          </div>
          <div className='details-right'>
            <div className='sub-row'>
              <div className='label'>Precipitation</div>
              <div className='text'>{today.precip_in} in</div>
            </div>
            <div className='custom-divider'></div>
            <div className='sub-row'>
              <div className='label'>Feels Like</div>
              <div className='text'>{today.feelslike_f} °</div>
            </div>
            <div className='custom-divider'></div>
            <div className='sub-row'>
              <div className='label'>Humidity</div>
              <div className='text'>{today.humidity} %</div>
            </div>
            <div className='custom-divider'></div>
            <div className='sub-row'>
              <div className='label'>Wind</div>
              <div className='text'>{today.wind_mph} mph</div>
            </div>
            <div className='custom-divider'></div>
            <div className='sub-row'>
              <div className='label'>Direction</div>
              <div className='text'>{today.wind_dir}</div>
            </div>
            <div className='custom-divider'></div>
            <div className='sub-row'>
              <div className='label'>Visibility</div>
              <div className='text'>{today.vis_miles} miles</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { location } = this.props;

    if (!location) return false;

    return (
      <div id='weather-container' className="event-card">
]        <Step.Group stackable='tablet'>
          <Step className='location-details'>
            <Step.Content>
              <Step.Title>{get(this.state, 'weather.location.name', '')}</Step.Title>
              <Step.Description>Weather</Step.Description>
            </Step.Content>
          </Step>
          {this.renderForecast(get(this.state, 'weather.forecast.forecastday', []))}
        </Step.Group>
        <div className='weather-footer'>
          <div className='chart-container'>
            <Chart data={get(this.state, 'weather.forecast.forecastday', [])} />
            <div className='chart-header'>Weekly</div>
          </div>
          {this.renderToday(get(this.state, 'weather.current'))}
        </div>
      </div>
    )
  }
}