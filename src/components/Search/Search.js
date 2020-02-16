import React from 'react';
import { Input } from 'semantic-ui-react';

import './Search.scss';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      googleQuery: '',
      bingQuery: '',
      yahooQuery: ''
    }
  }

  onGoogleChange(e) {
    this.setState({
      googleQuery: e.target.value
    })
  }

  onGoogleSubmit(e) {
    if (e.key === 'Enter') {
      let q = this.state.googleQuery;
      window.open('https://google.com/search?q=' + q);
    }
  }

  onBingChange(e) {
    this.setState({
      bingQuery: e.target.value
    })
  }

  onBingSubmit(e) {
    if (e.key === 'Enter') {
      let q = this.state.bingQuery;
      window.open('https://www.bing.com/search?q=' + q);
    }
  }

  onYahooChange(e) {
    this.setState({
      yahooQuery: e.target.value
    })
  }

  onYahooSubmit(e) {
    if (e.key === 'Enter') {
      let q = this.state.yahooQuery;
      window.open('https://search.yahoo.com/search?p=' + q);
    }
  }

  render() {
    return (
      <div className='search-container'>
        <Input
          size='large'
          icon='google'
          placeholder='Google Search...'
          onChange={this.onGoogleChange.bind(this)}
          onKeyPress={this.onGoogleSubmit.bind(this)}
        />
        <Input
          size='large'
          icon='blogger b'
          placeholder='Bing Search...'
          onChange={this.onBingChange.bind(this)}
          onKeyPress={this.onBingSubmit.bind(this)}
        />
        <Input
          size='large'
          icon='yahoo'
          placeholder='Yahoo Search...'
          onChange={this.onYahooChange.bind(this)}
          onKeyPress={this.onYahooSubmit.bind(this)}
        />
      </div>
    )
  }
}