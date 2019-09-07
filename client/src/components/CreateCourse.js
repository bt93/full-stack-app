import React, { Component } from 'react';

class CreateCourse extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
            errors: []
        }
        this.handleInputChage = this.handleInputChage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChage(event) {
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

        // TODO set up POST req
        console.log(body);
    }
    

    render() {
        return (
        <div className="bounds course--detail">
            <h1>Create Course</h1>
            <div>
                <div>
                    {/* Put validation errors here */}
                </div>
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
                                placeholder="Course title..."
                                onChange={this.handleInputChage}
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
                                placeholder="Course description..."
                                onChange={this.handleInputChage}
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
                                    placeholder="Hours"
                                    onChange={this.handleInputChage}
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
                                    placeholder="List materials..." 
                                    onChange={this.handleInputChage}
                                    value={this.state.materialsNeeded}
                                        />
                            </div>
                        </li>
                        </ul>
                    </div>
                    </div>
                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit">Create Course</button>
                        <button className="button button-secondary">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
        )
    }
}

export default CreateCourse;