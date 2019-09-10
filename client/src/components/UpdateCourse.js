import React, { Component } from 'react';
import config from '../config';
import Form from './Form';
import { Redirect } from 'react-router-dom';
import loading from '../img/loading.gif';

class UpdateCourse extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
            isLoading: true,
            errors: null
        }
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        fetch(`${config.apiBaseUrl}/courses/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(res => this.setState(prevState => {
                if (res.course) {
                    return {
                        title: res.course.title,
                        description: res.course.description,
                        estimatedTime: res.course.estimatedTime,
                        materialsNeeded: res.course.materialsNeeded,
                        id: res.course.user.id,
                        isLoading: false
                    }
                } else {
                    console.error(res.errors.errors.message);
                    return this.props.history.push('/notfound');
                }
            }));
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
        const courseId = this.props.match.params.id;
        
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state;

        const updatedCourse = {
            title,
            description,
            estimatedTime,
            materialsNeeded
        }

        context.data.updateCourse(emailAddress, password, updatedCourse, courseId)
            .then(errors => {
                if (errors.errors) {
                    console.error(errors.errors);
                    this.setState({
                        errors: errors.errors
                    });
                } else {
                    this.props.history.push(`/courses/${courseId}`);
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
        let renderedData;
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors
        } = this.state;
        const { context } = this.props;
        const authUser = JSON.parse(context.authenticatedUser);

        if (!this.state.isLoading) {
            renderedData = (
                <div className="bounds course--detail">
                    <h1>Update Course</h1>
                    <div>
                        <Form
                            cancel={this.cancel}
                            errors={errors}
                            submit={this.submit}
                            submitButtonText="Update Course" 
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
                                                            onChange={this.change} 
                                                            value={materialsNeeded}
                                                                />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )}/>
                    </div>
                </div>
            )

            if (authUser && authUser.user.user.id === this.state.id) {
                return (
                    <div>
                        {renderedData}
                    </div>
                )
            } else {
                return <Redirect to='/forbidden' />
            }
        } else {
            renderedData = <img src={loading} className="centered" alt="Loading" />

            return (
                <div>
                    {renderedData}
                </div>
            )
        }
    }
}

export default UpdateCourse;