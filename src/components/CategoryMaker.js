import React from 'react';

export default class CategoryMaker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
            categoryName: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate() {
        console.log(this.state.categoryName);
    }

    handleChange(e) {
        this.setState({
            categoryName: e.target.value
        })
    }

    render() {
        return (
            <div id='category-maker'>
                {
                    this.state.toggle
                        ? <div>
                            <input id='template-input' placeholder='Category Name' onChange={this.handleChange}/>
                            <br />
                            <button className="custom-button" onClick={() => this.props.addCategory(this.state.categoryName)}>Create<i className="material-icons left">add</i></button>
                            <br />
                            <button className="custom-button" onClick={() => this.setState({ toggle: false, categoryName: '' })}>Close<i className="material-icons left">close</i></button>
                        </div>
                        : <i id='add' className="material-icons apply-pointer" onClick={() => this.setState({ toggle: true })}>add</i>
                }
            </div>
        )
    }
}