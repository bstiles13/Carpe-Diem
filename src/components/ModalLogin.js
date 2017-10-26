import React from 'react';
import axios from 'axios';

export default class ModalLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userForm: {
                existingUsername: '',
                existingPassword: '',
                newUsername: '',
                newPassword1: '',
                newPassword2: ''
            },
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
        } else if (user.newUsername === '' || user.newPassword1 === '' || user.newPassword2 === '') {
            this.triggerWarning('invalidText');
        } else {
            // Make the HTTP request:
            axios.post('/newuser', user).then(data => {
                // Read the result field from the JSON response.
                let result = data.data;
                if (result == true) {
                    localStorage.setItem('carpeToken', user.newUsername);
                    let modal = document.getElementById('modal2');
                    modal.modal('close');
                    this.props.setUser(user.newUsername);
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
                if (result == true) {
                    localStorage.setItem('carpeToken', user.newUsername);
                    let modal = document.getElementById('modal2');
                    modal.modal('close');
                    this.props.setUser(user.newUsername);                    
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
            <div id="modal2" className="modal">
                <div className="modal-content">
                    <h5>SIGN IN</h5>
                    {this.error('invalidText')}
                    {this.error('invalidName')}
                    {this.error('invalidPassword')}
                    {this.error('invalidUser')}
                    <hr />
                    <div id="login-container">
                        <div id="new-user" className="login-child">
                            <h6>Existing Users</h6><br />
                            <form className="col s12">
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">account_circle</i>
                                        <input id="username" type="text" className="validate" name="existingUsername" onChange={this.handleChange.bind(this)} />
                                        <label htmlFor="username">Username</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">enhanced_encryption</i>
                                        <input id="password" type="password" className="validate" name="existingPassword" onChange={this.handleChange.bind(this)} />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div id="old-user" className="login-child">
                            <h6>New Users</h6><br />
                            <form className="col s12">
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">account_circle</i>
                                        <input id="username" type="text" className="validate" name="newUsername" onChange={this.handleChange.bind(this)} />
                                        <label htmlFor="username">Username</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">enhanced_encryption</i>
                                        <input id="password1" type="password" className="validate" name="newPassword1" onChange={this.handleChange.bind(this)} />
                                        <label htmlFor="password1">Password</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">enhanced_encryption</i>
                                        <input id="password2" type="password" className="validate" name="newPassword2" onChange={this.handleChange.bind(this)} />
                                        <label htmlFor="password2">Re-enter password</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id="button-container">
                        <button className="waves-effect waves-light btn light-blue darken-1" onClick={this.startExistingLogin.bind(this)}>Sign In</button>
                        <button className="waves-effect waves-light btn deep-orange darken-2" onClick={this.startNewLogin.bind(this)}>Register</button>
                        <button onClick={this.sendTest}>Test</button>
                    </div>
                </div>
            </div>
        )
    }
}