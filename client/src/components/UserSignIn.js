import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

class UserSignIn extends Component {
    constructor() {
        super();
        this.state = {
            emailAddress: '',
            password: '',
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
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { emailAddress, password } = this.state;

        context.actions.signIn(emailAddress, password)
            .then(user => {
                if (user === null) {
                    this.setState(() => {
                        return { errors: {
                            errors: [{message: 'Sign-in was unsuccessful'}] 
                        } };
                    });
                } else {
                    this.props.history.push(from);
                    console.log(`Success! ${emailAddress} is signed in!`);
                }
            })
            
            .catch(err => {
                console.error(err);
                this.props.history.push('/error');
            })
    }

    cancel = () => {
        this.props.history.push('/');
    }

    render() {
        const {
            emailAddress,
            password,
            errors
        } = this.state;
        
        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <Form
                            cancel={this.cancel}
                            errors={errors.errors}
                            submit={this.submit}
                            submitButtonText="Sign In"
                            elements={() => (
                                <React.Fragment>
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
                                </React.Fragment>
                            )}
                        />
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                </div>
            </div>
        )
    }
}

export default UserSignIn;