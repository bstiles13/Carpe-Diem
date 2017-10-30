import React, { PropTypes } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

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
                    invalidPassword: "Passwords do not match.",
                    invalidText: "Username and/or password is incomplete.",
                    invalidZip: "Invalid zip code."
                }
            }
        }
    }

    componentDidUpdate() {
        console.log(this.state.userForm);
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
        if (user.newPassword1 != user.newPassword2) {
            this.triggerWarning('invalidPassword');
        } else if (user.newUsername === '' || user.newPassword1 === '' || user.newPassword2 === '' || user.newZip === '') {
            this.triggerWarning('invalidText');
        } else if (isNaN(user.newZip) || parseInt(user.newZip) < 501 || parseInt(user.newZip) > 99950) {
            this.triggerWarning('invalidZip');
        } else {
            // Make the HTTP request:
            axios.post('http://localhost:3001/newuser', user).then(data => {
                // Read the result field from the JSON response.
                let result = data.data;
                if (result == true) {
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
            axios.post('http://localhost:3001/existinguser', user).then(data => {
                // Read the result field from the JSON response.
                let result = data.data;
                if (result == true) {
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

    sendTest() {
        axios.get('http://localhost:3001/test').then(data => {
            console.log(data);
        })
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
                    invalidPassword: "Passwords do not match.",
                    invalidText: "Username and/or password is incomplete."
                }
            }
        })
    }

    render() {
        return (
            <div id="login">
                <h5>SIGN IN</h5>
                {this.error('invalidText')}
                {this.error('invalidName')}
                {this.error('invalidPassword')}
                {this.error('invalidUser')}
                {this.error('invalidZip')}
                <hr />
                <div id="login-container">
                    <div id="new-user" className="login-child">
                        <h6 className='login-header'>Existing Users</h6><br />
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix login-icon">account_circle</i>
                                    <input id="username" type="text" className="validate" name="existingUsername" onChange={this.handleChange.bind(this)} />
                                    <label htmlFor="username">Username</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix login-icon">enhanced_encryption</i>
                                    <input id="password" type="password" className="validate" name="existingPassword" onChange={this.handleChange.bind(this)} />
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div id="old-user" className="login-child">
                        <h6 className='login-header'>New Users</h6><br />
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix login-icon">account_circle</i>
                                    <input id="username" type="text" className="validate" name="newUsername" onChange={this.handleChange.bind(this)} />
                                    <label htmlFor="username">Username</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix login-icon">enhanced_encryption</i>
                                    <input id="password1" type="password" className="validate" name="newPassword1" onChange={this.handleChange.bind(this)} />
                                    <label htmlFor="password1">Password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix login-icon">enhanced_encryption</i>
                                    <input id="password2" type="password" className="validate" name="newPassword2" onChange={this.handleChange.bind(this)} />
                                    <label htmlFor="password2">Re-enter password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix login-icon">location_on</i>
                                    <input id="zip" type="text" className="validate" name="newZip" onChange={this.handleChange.bind(this)} />
                                    <label htmlFor="zip">Zip Code</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div id="button-container">
                    <button className="waves-effect waves-light btn light-blue darken-1" onClick={this.startExistingLogin.bind(this)}>Sign In</button>
                    <button className="waves-effect waves-light btn deep-orange darken-2" onClick={this.startNewLogin.bind(this)}>Register</button>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);
