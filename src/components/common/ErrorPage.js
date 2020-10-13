import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    const pageBody = (
        <div className="page_body">
            <p>Maybe the page or item you were looking for doesn't exist or something else is broken.</p>
            <p>Sorry :(</p>
        </div>
    );

    return (
        <div className="content-container">
            <div className="page">
                <h1 className="page__title">Aaaah! Something went wrong.</h1>            
                { pageBody }
                <div className="page__meta">
                    <img 
                        src="/images/badbad.gif" 
                        alt="Ron Swanson Throwing Away His Computer"
                        title="Ron Swanson Throwing Away His Computer"
                        className="error-image"
                    />
                    <Link to="/" className="button">Go home</Link>
                </div>  
            </div>
        </div>
    );
};

export default ErrorPage;