import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CourseDetail extends Component {
    state = {
        id: this.props.match.params.id,
        data: null,
        isLoading: true
    }

    componentDidMount() {
        fetch(`http://localhost:5000/api/courses/${this.state.id}`)
            .then(res => res.json())
            .then(res => this.setState(prevState => {
                return {
                    data: res.course,
                    isLoading: false
                }
            }));
    }

    render() {
        let renderedData;

        if (!this.state.isLoading) {
            renderedData = (
                <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100"><span>
                        <Link className="button" to={`/update/${this.state.data.id}`}>Update Course</Link>
                        <Link className="button" to={`/delete/${this.state.data.id}`}>Delete Course</Link></span>
                        <Link className="button button-secondary" to="/">Return to List</Link></div>
                    </div>
                </div>
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
            </div>
            )
        } else {
            renderedData = <h1>Loading..</h1>
        }
        return (
            <div>
                {renderedData}
            </div>
        )
    }
}

export default CourseDetail;