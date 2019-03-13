import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => (
    <div>
        <h1>Aaaah! Something went wrong.</h1>
        <p>Maybe the page, item you were looking for doesn't exist or something else is broken.</p>
        <p>Sorry :(</p>
        <Link to="/">Go home</Link>
    </div>
);

export default ErrorPage;