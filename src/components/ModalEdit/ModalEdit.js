import React from 'react';
import { Icon, Modal, Input, Button } from 'semantic-ui-react';
import { isNumber, get } from 'lodash';
import placeholder from '../../assets/images/placeholder.png';

import './ModalEdit.scss';

export default class ModalEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: get(props, ['favorites', props.toggledCategory, 'pages', props.toggledFavorite, 'name'])
    }
    this.handleNameEdit = this.handleNameEdit.bind(this);
  }

  handleNameEdit(e) {
    this.setState({
      nameInput: e.target.value
    })
  }

  render() {
    let favorites = this.props.favorites;
    let category = this.props.toggledCategory;
    let favorite = this.props.toggledFavorite;

    return (
      <Modal
        className='modal-edit'
        open={this.props.open}
        onClose={this.props.handleClose}
        size='mini'
      >
        <Modal.Header>Edit Favorite</Modal.Header>
        {
          isNumber(category) && isNumber(favorite)
            ? <React.Fragment>
              <Modal.Content>
                <div className='modal-body'>
                  <div className='modal-edit-content'>
                    <div className='label'>EDIT NAME</div>
                    <Input size='large' defaultValue={favorites[category].pages[favorite].name || ''} onChange={this.handleNameEdit} />
                    <div className='preview-content'>
                      <div className='label preview-label'>PREVIEW</div>
                      <div className='card-item'>
                        <div className='card-item-link favorite-text'>
                          <img className='url-logo circle' src={'//logo.clearbit.com/spotify.com' + favorites[category].pages[favorite].url} onError={(event) => event.target.setAttribute('src', placeholder)} alt='' />
                          <span>{this.state.nameInput || favorites[category].pages[favorite].name}</span>
                        </div>
                        <Icon name='arrows alternate' />
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={() => this.props.saveNameEdit(this.state.nameInput)}>Save</Button>
              </Modal.Actions>
            </React.Fragment>
            : false
        }
      </Modal>
    )
  }
}