import React, { Component } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { map, get } from 'lodash';
import moment from 'moment';

export class Chart extends Component {
  mapData = (forecast) => {
    return map(forecast, day => {
      return {
        label: moment(day.date).format('ddd'),
        high: get(day, 'day.maxtemp_f'),
        low: get(day, 'day.mintemp_f')
      }
    });
  }

  render() {
    const data = this.mapData(this.props.data);

    if (!data || data.length < 1) return false;

    return (
      <LineChart
        title="Chart of PU x UV"
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="high" stroke="#eb5334" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="low" stroke="#349beb" />
      </LineChart>
    );
  }
}