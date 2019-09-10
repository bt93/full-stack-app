import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

const Context = React.createContext(); 

// Creates provider for context
export class Provider extends Component {
    constructor() {
        super();
        this.data = new Data();
        this.state = {
            authenticatedUser: Cookies.get('authenticatedUser') || null
        }
    }

    // Signs in user
    signIn = async (emailAddress, password) => {
        const user = await this.data.getUser(emailAddress, password);

        if (user !== null) {
            this.setState(() => {
                return {
                    authenticatedUser: JSON.stringify({user, password})
                }
            });
            Cookies.set('authenticatedUser', JSON.stringify({user, password}), { expires: 1 })
        }
        return user;
    }

    // Signs out user
    signOut = () => {
        this.setState({ authenticatedUser: null });

        Cookies.remove('authenticatedUser');
    }

    render() {
        const { authenticatedUser } = this.state;

        const value = {
            authenticatedUser,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut
            }
        };
        
        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        )
    }
    
    
}

// Creates consumer
export const Consumer = Context.Consumer;

export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        );
    }
}