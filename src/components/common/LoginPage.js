import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import AuthForm from './AuthForm';

export class LoginPage extends React.Component {
    handleAuth = ( { email, password } ) => {
        this.props.startLogin( email, password );
    };

    render () {
        return (
            <div className="box-layout">
                <div className="box-layout__box">
                    <h1 className="box-layout__title">Administration</h1>
                    <p>Login to manage your app.</p>
                    <AuthForm 
                        handleAuth={ this.handleAuth }
                    />
                </div>
            </div>
        );
    };
};

LoginPage.propTypes = {
    startLogin: PropTypes.func.isRequired
};

const mapDispatchToProps = ( dispatch ) => ({
    startLogin: ( email, password ) => dispatch( startLogin( email, password ) )
});

export default connect( undefined, mapDispatchToProps )( LoginPage );