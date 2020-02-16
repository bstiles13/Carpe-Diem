import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Input, Icon, Button } from 'semantic-ui-react';

import './Login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userForm: {
        existingUsername: '',
        existingPassword: '',
        newUsername: '',
        newPassword1: '',
        newPassword2: '',
        newZip: ''
      },
      warnings: {
        invalidUser: false,
        invalidName: false,
        invalidPassword: false,
        invalidText: false,
        invalidZip: false,
        warning: {
          invalidUser: 'Username and/or password is incorrect.',
          invalidName: 'Username already exists.',
          invalidPassword: 'Passwords do not match.',
          invalidText: 'Username and/or password is incomplete.',
          invalidZip: 'Invalid zip code.'
        }
      }
    }
  }

  handleChange(event) {
    let user = this.state.userForm;
    user[event.target.name] = event.target.value;
    this.setState({
      userForm: user
    })
  }

  startExistingLogin() {
    this.clearWarnings();
    this.loginExisting();
  }

  startNewLogin() {
    this.clearWarnings();
    this.loginNew();
  }

  loginNew() {
    let user = this.state.userForm;
    if (user.newPassword1 !== user.newPassword2) {
      this.triggerWarning('invalidPassword');
    } else if (user.newUsername === '' || user.newPassword1 === '' || user.newPassword2 === '' || user.newZip === '') {
      this.triggerWarning('invalidText');
    } else if (isNaN(user.newZip) || parseInt(user.newZip) < 501 || parseInt(user.newZip) > 99950) {
      this.triggerWarning('invalidZip');
    } else {
      // Make the HTTP request:
      axios.post('/newuser', user).then(data => {
        // Read the result field from the JSON response.
        let result = data.data;
        if (result) {
          localStorage.setItem('carpeToken', user.newUsername);
          this.props.checkUser();
          this.props.history.push('/');
        } else {
          this.triggerWarning('invalidName');
        }
      });
    }
  }

  loginExisting() {
    let user = this.state.userForm;
    if (user.existingUsername === '' || user.existingPassword === '') {
      this.triggerWarning('invalidText');
    } else {
      // Make the HTTP request:
      axios.post('/existinguser', user).then(data => {
        // Read the result field from the JSON response.
        let result = data.data;
        if (result) {
          localStorage.setItem('carpeToken', user.existingUsername);
          this.props.checkUser();
          this.props.history.push('/');
        } else {
          this.triggerWarning('invalidUser');
        }
      });
    }
  }

  triggerWarning(type) {
    let warnings = this.state.warnings;
    warnings[type] = true;
    this.setState({
      warnings: warnings
    })
  }

  error(type) {
    if (this.state.warnings[type]) {
      return (<div className='login-warning'>{this.state.warnings.warning[type]}</div>)
    }
  }

  clearWarnings() {
    this.setState({
      warnings: {
        invalidUser: false,
        invalidName: false,
        invalidPassword: false,
        invalidText: false,
        warning: {
          invalidUser: 'Username and/or password is incorrect.',
          invalidName: 'Username already exists.',
          invalidPassword: 'Passwords do not match.',
          invalidText: 'Username and/or password is incomplete.'
        }
      }
    })
  }

  render() {
    return (
      <div className='login'>
        <h3>SIGN IN</h3>
        <div className='error-text'>
          {this.error('invalidText')}
          {this.error('invalidName')}
          {this.error('invalidPassword')}
          {this.error('invalidUser')}
          {this.error('invalidZip')}
        </div>
        <hr />
        <div className='login-container'>
          <div id='new-user' className='login-child'>
            <h3 className='login-header'>Existing Users</h3><br />
            <form className='col s12'>
              <div className='row'>
                <div className='input-field col s12'>
                  <Icon circular inverted name='user' className='material-icons prefix login-icon' />
                  <Input type='text' placeholder='Username' name='existingUsername' onChange={this.handleChange.bind(this)} />
                </div>
              </div>
              <div className='row'>
                <div className='input-field col s12'>
                  <Icon circular inverted name='key' className='material-icons prefix login-icon' />
                  <Input type='password' placeholder='Password' name='existingPassword' onChange={this.handleChange.bind(this)} />
                </div>
              </div>
            </form>
          </div>
          <div id='old-user' className='login-child'>
            <h3 className='login-header'>New Users</h3><br />
            <form className='col s12'>
              <div className='row'>
                <div className='input-field col s12'>
                  <Icon circular inverted name='user' className='material-icons prefix login-icon' />
                  <Input type='text' placeholder='Username' name='newUsername' onChange={this.handleChange.bind(this)} />
                </div>
              </div>
              <div className='row'>
                <div className='input-field col s12'>
                  <Icon circular inverted name='key' className='material-icons prefix login-icon' />
                  <Input type='password' placeholder='Password' name='newPassword1' onChange={this.handleChange.bind(this)} />
                </div>
              </div>
              <div className='row'>
                <div className='input-field col s12'>
                  <Icon circular inverted name='key' className='material-icons prefix login-icon' />
                  <Input type='password' placeholder='Re-enter password' name='newPassword2' onChange={this.handleChange.bind(this)} />
                </div>
              </div>
              <div className='row'>
                <div className='input-field col s12'>
                  <Icon circular inverted name='map marker alternate' className='material-icons prefix login-icon' />
                  <Input type='text' placeholder='Zip Code' name='newZip' onChange={this.handleChange.bind(this)} />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='button-container'>
          <Button onClick={this.startExistingLogin.bind(this)}>Sign In</Button>
          <Button onClick={this.startNewLogin.bind(this)}>Register</Button>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);
