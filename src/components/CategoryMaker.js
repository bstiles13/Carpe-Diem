import React from 'react';

export default class CategoryMaker extends React.Component {

    constructor() {
        super();
        this.state = {
            toggle: false
        }
    }

    render() {
        return (
            <div id='new-card' className='custom-card' onClick={() => this.setState({toggle: true})}>
                {this.state.toggle ? <div><input placeholder='Category Name'/><a className="waves-effect waves-light btn"><i className="material-icons left">add</i>Create</a></div> : <i id='add' className="material-icons">add</i>}
            </div>
        )
    }
}