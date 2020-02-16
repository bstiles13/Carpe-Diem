import React from 'react';
import { Link } from 'react-router-dom'
import { Modal } from 'semantic-ui-react';

import './ModalWelcome.scss';

export default class ModalWelcome extends React.Component {
  state = { modalOpen: true }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    return (
      <Modal
        className='welcome-modal'
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size='small'
      >
        <Modal.Header className='welcome-modal-header'>
          <h2>Hello!</h2>
        </Modal.Header>
        <Modal.Content className='welcome-modal-content'>
          <Link to='/login' onClick={this.handleClose}>
            <span className='modal-action modal-close'><b>Sign in </b></span>
          </Link>
          to customize your homepage experience, or continue as a guest and explore some of the web's most popular destinations.
        </Modal.Content>
      </Modal>
    )
  }
}