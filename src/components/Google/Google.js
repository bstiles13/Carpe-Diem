import React from 'react';

import './Google.scss';

export default class Google extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }

    onChange(e) {
        this.setState({
            query: e.target.value
        })
    }

    onSubmit(e) {
        if (e.key === 'Enter') {
            let q = this.state.query;
            window.open('http://google.com/search?q=' + q);
        }
    }

    render() {
        return (
            <div className='row'>
                <div className='input-field col s12'>
                    <input placeholder='Google Search...' id='google-search' type='text' onChange={this.onChange.bind(this)} onKeyPress={this.onSubmit.bind(this)} />
                </div>
            </div>
        )
    }
}