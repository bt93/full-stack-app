import React , { Component } from 'react';
import { Link } from 'react-router-dom';

class UserSignIn extends Component {
    render() {
        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <form>
                            <div>
                            <input id="emailAddress" name="emailAddress" type="text" class="" placeholder="Email Address" value="" />
                            </div>
                            <div>
                            <input id="password" name="password" type="password" class="" placeholder="Password" value="" />
                            </div>
                            <div class="grid-100 pad-bottom">
                                <button class="button" type="submit">Sign In</button>
                                <Link class="button button-secondary" to="/">Cancel</Link>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                </div>
            </div>
        )
    }
}

export default UserSignIn;