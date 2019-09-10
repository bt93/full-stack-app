import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import loading from '../img/loading.gif';

class CourseDetail extends Component {
    state = {
        id: this.props.match.params.id,
        data: null,
        isLoading: true
    }

    componentDidMount() {
        fetch(`${config.apiBaseUrl}/courses/${this.state.id}`)
            .then(res => res.json())
            .then(res => this.setState(prevState => {
                return {
                    data: res.course,
                    isLoading: false
                }
            }));
    }

    deleteCourse(id) {
        const { context } = this.props;
        const authUser = JSON.parse(context.authenticatedUser);
        const emailAddress = authUser.user.user.emailAddress;
        const password = authUser.password;

        if (window.confirm('Are you sure you want to delete this course?')) {
            context.data.deleteCourse(emailAddress, password, id)
                .then(errors => {
                    if (errors.errors) {
                        console.error(errors.errors);
                        this.props.history.push('/errors');
                    } else {
                        this.props.history.push('/');
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        } 
    }

    render() {
        let renderedData;
        let buttons;
        const { context } = this.props;
        const authUser = JSON.parse(context.authenticatedUser)

        if (!this.state.isLoading) {
            if (context.authenticatedUser && authUser.user.user.id === this.state.data.user.id) {
                buttons = (
                    <span>
                        <Link className="button" to={`/courses/${this.state.id}/update`}>Update Course</Link>
                        <button className="button" onClick={() => this.deleteCourse(this.state.id)}>Delete Course</button>
                    </span>
                )
            }

            renderedData = (
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>Name
                            <h3 className="course--title">{this.state.data.title}</h3>
                            <p>By: {this.state.data.user.firstName} {this.state.data.user.lastName}</p>
                        </div>
                        <div className="course--description">
                            <p>{this.state.data.description}</p>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    {this.state.data.estimatedTime ? (
                                        <h3>{this.state.data.estimatedTime}</h3>
                                    ) : (
                                        <h3>Data Unavailable</h3>
                                    )}
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    {this.state.data.materialsNeeded ? (
                                        <ul>
                                        {this.state.data.materialsNeeded.split('*').map((mat, i) => {
                                            if (i !== 0) {
                                                return <li key={i}>{mat}</li>
                                            } else {
                                                return null
                                            }
                                        })}
                                        </ul>
                                    ) : (
                                        <h3>Data Unavailable</h3>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        } else {
            renderedData = <img src={loading} className="centered" alt="Loading" />
        }
        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                            <div className="grid-100">
                            {buttons}
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>
                </div>
                {renderedData}
            </div>
        )
    }
}

export default CourseDetail;