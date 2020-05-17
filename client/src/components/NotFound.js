import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div className="bounds">
            <h1>Not Found</h1>
            <p>
                Sorry! We couldn't find the page you're looking for. <br/>
                <Link to="/">Click Here</Link> to return to the home page.
            </p>
        </div>
    )
}