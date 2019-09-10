import React, { Component } from 'react';
import config from '../config';
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
            errors: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch(`${config.apiBaseUrl}/courses/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(res => this.setState(prevState => {
                if (!res.course.estimatedTime || !res.course.materialsNeeded) {
                    return {
                        title: res.course.title,
                        description: res.course.description,
                        estimatedTime: '',
                        materialsNeeded: '',
                        isLoading: false
                    }
                } else {
                    return {
                        title: res.course.title,
                        description: res.course.description,
                        estimatedTime: res.course.estimatedTime,
                        materialsNeeded: res.course.materialsNeeded,
                        isLoading: false
                    }
                }
            }));
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
        
        const body = {
            title: this.state.title,
            description: this.state.description,
            estimatedTime: this.state.estimatedTime,
            materialsNeeded: this.state.materialsNeeded
        }

        // TODO set up PUT req
        console.log(body);
    }

    render() {
        let renderedData;

        if (!this.state.isLoading) {
            renderedData = (
                <div className="bounds course--detail">
                    <h1>Update Course</h1>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div>
                                        <input 
                                            id="title" 
                                            name="title" 
                                            type="text" 
                                            className="input-title course--title--input" 
                                            onChange={this.handleInputChange}
                                            value={this.state.title}
                                                />
                                        </div>
                                    <p>By Joe Smith</p>
                                </div>
                                <div className="course--description">
                                    <div>
                                        <textarea 
                                            id="description"
                                            name="description"
                                            className="" 
                                            onChange={this.handleInputChange}
                                            value={this.state.description}
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
                                                    onChange={this.handleInputChange}
                                                    value={this.state.estimatedTime}  
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
                                                    onChange={this.handleInputChange} 
                                                    value={this.state.materialsNeeded}
                                                        />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Update Course</button>
                                <button className="button button-secondary">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        } else {
            renderedData = <img src={loading} className="centered" alt="Loading" />
        }
        
        return (
            <div>
                {renderedData}
            </div>
        )
    }
}

export default UpdateCourse;