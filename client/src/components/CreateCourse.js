import React, { Component } from 'react';
import Form from './Form';

class CreateCourse extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
            errors: null
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
        const authUser = JSON.parse(context.authenticatedUser);
        const emailAddress = authUser.user.user.emailAddress;
        const password = authUser.password;
        
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state;

        const newCourse = {
            title,
            description,
            estimatedTime,
            materialsNeeded
        }

        context.data.createCourse(emailAddress, password, newCourse)
            .then(errors => {
                if (errors.errors) {
                    console.error(errors.errors);
                    this.setState({
                        errors: errors.errors
                    });
                } else {
                    this.props.history.push('/');
                }
            })
            .catch(err => {
                console.error(err);
                this.props.history.push('/error');
            });
    }
    
    cancel = () => {
        this.props.history.push('/');
    }

    render() {
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors
        } = this.state;
        const { context } = this.props;
        const authUser = JSON.parse(context.authenticatedUser);

        if (context.authenticatedUser && authUser.user.user.id === this.state.data.user.id) {
            
        }
        return (
        <div className="bounds course--detail">
            <h1>Create Course</h1>
            <Form
                cancel={this.cancel}
                errors={errors}
                submit={this.submit}
                submitButtonText="Create Course"
                elements={() => (
                    <React.Fragment>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input 
                                        id="title" 
                                        name="title" 
                                        type="text" 
                                        className="input-title course--title--input" 
                                        placeholder="Course title..."
                                        onChange={this.change}
                                        value={title}
                                            />
                                </div>
                                <p>By: {authUser.user.user.firstName} {authUser.user.user.lastName}</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea 
                                        id="description" 
                                        name="description" 
                                        className="" 
                                        placeholder="Course description..."
                                        onChange={this.change}
                                        value={description}
                                            />
                                </div>
                            </div>
                            </div>
                            <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <div>
                                        <input 
                                            id="estimatedTime"
                                            name="estimatedTime"
                                            type="text"
                                            className="course--time--input"
                                            placeholder="Hours"
                                            onChange={this.change}
                                            value={estimatedTime}
                                                />
                                    </div>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <div>
                                        <textarea 
                                            id="materialsNeeded"
                                            name="materialsNeeded"
                                            className="" 
                                            placeholder="List materials..." 
                                            onChange={this.change}
                                            value={materialsNeeded}
                                                />
                                    </div>
                                </li>
                                </ul>
                            </div>
                        </div>
                    </React.Fragment>
                )}
            />    
        </div>
        )
    }
}

export default CreateCourse;