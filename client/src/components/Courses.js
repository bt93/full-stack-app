import React, { Component } from 'react';
import { Link } from "react-router-dom";
import config from '../config';
import loading from '../img/loading.gif';

class Courses extends Component {
    state = {
        data: null,
        isLoading: true
    }

    componentDidMount() {
        fetch(`${config.apiBaseUrl}/courses`)
            .then(res => res.json())
            .then(res => this.setState(prevState => {
                return {
                data: res.courses,
                isLoading: false
            }
        }));
    }

    render() {
        let renderedData;

        if (!this.state.isLoading) {
            if (this.state.data.length > 0) {
                renderedData = this.state.data.map(course => {
                    return (
                        <div key={course.id} className="grid-33"><Link className="course--module course--link" to={`/courses/${course.id}`}>
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                        </Link></div>
                    )
                });
            }
        } else {
            renderedData = <img src={loading} className="centered" alt="Loading" />
        }
        
        return (
            <div className="bounds">
                {renderedData}
                <div className="grid-33"><Link className="course--module course--add--module" to="/courses/create">
                    <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add">
                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                    </svg>New Course</h3>
                </Link></div>
            </div>
        )
    }
}

export default Courses;