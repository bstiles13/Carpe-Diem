import React, { Component } from 'react';
import moment from 'moment';

export class Clock extends Component {
  state = { time: moment().format('h:mm:ss A') }

  componentDidMount() {
    setInterval(
      () => this.setState({ time: moment().format('h:mm:ss A') }),
      1000
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.state.time}
      </React.Fragment>
    )
  }
}