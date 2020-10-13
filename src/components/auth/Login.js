import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { startLogin } from '../../actions/auth';
import TextFieldGroup from '../common/TextFieldGroup';
import Spinner from '../common/Spinner';

export class Login extends React.Component {
    state = {
        email: '',
        password: '',
        errors: {}
    };

    componentWillReceiveProps( nextProps ) {
        if ( nextProps.errors ) {
            const errors = {};
            errors[ 'authError' ] = nextProps.errors.message;

            this.setState( { errors } );
        }
    };

    handleValidation = () => {
        const errors = {};
        let formIsValid = true;

        // Email
        if ( ! this.state.email ) {
            formIsValid = false;
            errors[ 'email' ] = 'Email cannot be empty.';
        } else if ( ! validator.isEmail( this.state.email ) ) {
            formIsValid = false;
            errors[ 'email' ] = 'Email is invalid.';
        }

        // Password
        if ( ! this.state.password ) {
            formIsValid = false;
            errors[ 'password' ] = 'Password cannot be empty.';
        }

        this.setState( () => ( { errors } ) );

        return formIsValid;
    };

    handleChange = ( e ) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
    
        this.setState( () => ( { [ name ]: value } ) );
    };

    onSubmit = ( e ) => {
        e.preventDefault();

        if ( this.handleValidation() ) {
            const { email, password } = this.state;
            const loginData = { email, password };

            this.props.startLogin( loginData );
        }
    };

    render() {
        const { errors } = this.state;
        const { isLoading } = this.props.auth;

        let loginContent;

        if ( isLoading ) {
            loginContent = <Spinner />;
        } else {
            loginContent = (
                <div>
                    <h2>Sign In</h2>
                    <form onSubmit={ this.onSubmit } className="form">
                        { errors.authError && <p>{ errors.authError }</p> }
                        <div className="input-group">
                            <div className="input-group__item">
                                <TextFieldGroup 
                                    name="email"
                                    placeholder="Your email"
                                    value={ this.state.email }
                                    onChange={ this.handleChange }
                                    error={ errors.email }
                                    className="text-input"
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <div className="input-group__item">
                                <TextFieldGroup 
                                    type="password"
                                    name="password"
                                    placeholder="Your password"
                                    value={ this.state.password }
                                    onChange={ this.handleChange }
                                    error={ errors.password }
                                    className="text-input"
                                />
                            </div>
                        </div>
                        <div className="form-meta">
                            <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                            <button className="button">Sign In</button>
                        </div>
                    </form>
                </div>
            );
        }

        return (
            <div className="content-container">
                <div className="page">
                    { loginContent }
                </div>
            </div>
        );
    };
};

Login.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object,
    startLogin: PropTypes.func.isRequired
};

const mapStateToProps = ( state ) => ({
    auth: state.auth,
    errors: state.errors
});

const mapDispatchToProps = ( dispatch ) => ({
    startLogin: ( loginData ) => dispatch( startLogin( loginData ) ) 
});

export default connect( mapStateToProps, mapDispatchToProps )( Login );