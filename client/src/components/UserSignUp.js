import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

class UserSignUp extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            emailAddress: '',
            password: '',
            confirmPassword: '',
            errors: []
        }
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }
    
    change(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    submit(event) {
        const { context } = this.props;

        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword
        } = this.state
        
        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword
        }
        
        if (user.password === user.confirmPassword) {
           console.log(context.state.authenticatedUser)
        } else {
            alert('"Confirm Password" must match "Password"');
        }
    }

    render() {
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
            errors
        } = this.state;
        
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <Form
                            cancel={this.cancel}
                            errors={errors}
                            submit={this.submit}
                            submitButtonText="Sign Up"
                            elements={() => (
                                    <React.Fragment>
                                    <input 
                                        id="firstName" 
                                        name="firstName" 
                                        type="text" 
                                        className="" 
                                        placeholder="First Name" 
                                        value={firstName}
                                        onChange={this.change}
                                        />
                                    <input 
                                        id="lastName" 
                                        name="lastName" 
                                        type="text" 
                                        className="" 
                                        placeholder="Last Name" 
                                        value={lastName}
                                        onChange={this.change}
                                        />
                                    <input 
                                        id="emailAddress" 
                                        name="emailAddress" 
                                        type="text" 
                                        className="" 
                                        placeholder="Email Address" 
                                        value={emailAddress} 
                                        onChange={this.change}
                                        />
                                    <input 
                                        id="password" 
                                        name="password" 
                                        type="password" 
                                        className="" 
                                        placeholder="Password" 
                                        value={password}
                                        onChange={this.change}
                                        />
                                    <input 
                                        id="confirmPassword" 
                                        name="confirmPassword" 
                                        type="password" 
                                        className="" 
                                        placeholder="Confirm Password" 
                                        value={confirmPassword}
                                        onChange={this.change}
                                        />
                                </React.Fragment>
                            )}
                        />
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>
        )
    }
}

export default UserSignUp;