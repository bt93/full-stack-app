import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserSignUp extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            emailAddress: '',
            password: '',
            confirmPassword: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <input 
                                    id="firstName" 
                                    name="firstName" 
                                    type="text" 
                                    className="" 
                                    placeholder="First Name" 
                                    value={this.state.firstName}
                                    onChange={this.handleInputChange}
                                     />
                            </div>
                            <div>
                                <input 
                                    id="lastName" 
                                    name="lastName" 
                                    type="text" 
                                    className="" 
                                    placeholder="Last Name" 
                                    value={this.state.lastName}
                                    onChange={this.handleInputChange}
                                     />
                            </div>
                            <div>
                                <input 
                                    id="emailAddress" 
                                    name="emailAddress" 
                                    type="text" 
                                    className="" 
                                    placeholder="Email Address" 
                                    value={this.state.emailAddress} 
                                    onChange={this.handleInputChange}
                                    />
                            </div>
                            <div>
                                <input 
                                    id="password" 
                                    name="password" 
                                    type="password" 
                                    className="" 
                                    placeholder="Password" 
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                     />
                            </div>
                            <div>
                                <input 
                                    id="confirmPassword" 
                                    name="confirmPassword" 
                                    type="password" 
                                    className="" 
                                    placeholder="Confirm Password" 
                                    value={this.state.confirmPassword}
                                    onChange={this.handleInputChange}
                                     />
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign Up</button>
                                <Link to="/" className="button button-secondary" >Cancel</Link>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>
        )
    }
}

export default UserSignUp;