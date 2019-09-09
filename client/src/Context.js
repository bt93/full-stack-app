import React, { Component } from 'react';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {
    constructor() {
        super();
        this.data = new Data();
        this.state = {
            authenticatedUser: null
        }
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
    
    signIn = async (emailAddress, password) => {
        const user = await this.data.getUser(emailAddress, password);

        if (user !== null) {
            this.setState(() => {
                return {
                    authenticatedUser: user
                }
            });
            // TODO SET COOKIE
        }
        return user;
    }

    signOut = () => {
        this.setState({ authenticatedUser: null });

        // TODO DELETE COOKIE
    }
}

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