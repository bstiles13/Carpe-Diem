import React from 'react';

export default class Google extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    onChange(e) {
        this.setState({
            query: e.target.value
        })
    }

    onSubmit(e) {
        if (e.key === 'Enter') {
            console.log('Submit');
            let q = this.state.query;
            console.log('q:', q);
            window.open('http://google.com/search?q=' + q);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="input-field col s12">
                    <i className="material-icons prefix">search</i>
                    <input id="google-search" type="text" onChange={this.onChange.bind(this)} onKeyPress={this.onSubmit.bind(this)} />
                    <label id="google-label" htmlFor="google-search">Google Search...</label>
                </div>
            </div>
        )
    }
}