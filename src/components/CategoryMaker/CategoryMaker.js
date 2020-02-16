import React from 'react';
import { Icon, Button, Input } from 'semantic-ui-react';

import './CategoryMaker.scss';

export default class CategoryMaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      categoryName: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      categoryName: e.target.value
    })
  }

  render() {
    return (
      <div
        className='category-maker'
        onClick={this.state.toggle ? false : () => this.setState({ toggle: true })}
      >
        {
          this.state.toggle
            ? <div>
              <Input inverted placeholder='Category Name' onChange={this.handleChange} />
              <br />
              <Button inverted onClick={() => this.props.addCategory(this.state.categoryName)}>
                <Icon name='plus' />
                Create
              </Button>
              <br />
              <Button inverted onClick={() => this.setState({ toggle: false, categoryName: '' })}>
                <Icon name='close' />
                Cancel
              </Button>
            </div>
            : <Icon inverted name='plus' />
        }
      </div>
    )
  }
}