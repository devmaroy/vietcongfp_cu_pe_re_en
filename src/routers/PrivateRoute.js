import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/layout/Hero';

export const PrivateRoute = ( { isAuthenticated, component: Component, ...rest } ) => {
    return (
        <Route { ...rest } component={ ( props ) => (
            isAuthenticated ? (
                <div>
                    <Header />
                    <Hero />
                    <Component { ...props } />
                    <Footer />
                </div>
            ) : (
                <Redirect to="/" />
            )
        )} />
    );
}

const mapStateToProps = ( state ) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect( mapStateToProps )( PrivateRoute );