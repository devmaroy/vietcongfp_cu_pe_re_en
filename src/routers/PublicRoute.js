import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/layout/Hero';

export const PublicRoute = ( { isAuthenticated, component: Component, ...rest } ) => {
    return (
        <Route { ...rest } component={ ( props ) => (
            isAuthenticated && rest.path === '/login' ? (
                <Redirect to="/" />
            ) : (
                <div>
                    <Header />
                    <Hero />
                    <Component { ...props } />
                    <Footer />
                </div>
            )
        )} />
    );
}

const mapStateToProps = ( state ) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect( mapStateToProps )( PublicRoute );