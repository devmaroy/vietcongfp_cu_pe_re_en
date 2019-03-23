import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { startRegister } from '../../actions/auth';
import TextFieldGroup from '../common/TextFieldGroup';
import Spinner from '../common/Spinner';

export class Register extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
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

        // Name
        if ( ! this.state.name ) {
            formIsValid = false;
            errors[ 'name' ] = 'Name cannot be empty.';
        }

        // Email
        if ( ! this.state.email ) {
            formIsValid = false;
            errors[ 'email' ] = 'Email cannot be empty.';
        } else if ( ! validator.isEmail( this.state.email ) ) {
            formIsValid = false;
            errors[ 'email' ] = 'The email address is badly formatted.';
        }

        // Password
        if ( ! this.state.password ) {
            formIsValid = false;
            errors[ 'password' ] = 'Password cannot be empty.';
        } else if ( this.state.password.length < 6 ) {
            formIsValid = false;
            errors[ 'password' ] = 'The password must be 6 characters long or more.';
        }

        // Password confirm
        if ( ! this.state.passwordConfirm ) {
            formIsValid = false;
            errors[ 'passwordConfirm' ] = 'Password confirm cannot be empty.';
        } else if ( this.state.passwordConfirm !== this.state.password ) {
            formIsValid = false;
            errors[ 'passwordConfirm' ] = 'Password confirm do not match with your password.';
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
            const { name, email, password, passwordConfirm } = this.state;
            const registerData = { name, email, password, passwordConfirm };

            this.props.startRegister( registerData );
        }
    };

    render() {
        const { errors } = this.state;
        const { isLoading } = this.props.auth;

        let registerContent;

        if ( isLoading ) {
            registerContent = <Spinner />;
        } else {
            registerContent = (
                <div>
                    <h2>Sign Up</h2>
                    <form onSubmit={ this.onSubmit } className="form">
                        { errors.authError && <p>{ errors.authError }</p> }
                        <div className="input-group">
                            <div className="input-group__item">
                                <TextFieldGroup 
                                    name="name"
                                    placeholder="Your name"
                                    value={ this.state.name }
                                    onChange={ this.handleChange }
                                    error={ errors.name }
                                    className="text-input"
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <div className="input-group__item">                                
                                <TextFieldGroup 
                                    type="email"
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
                                    error={ errors.email }
                                    className="text-input"
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <div className="input-group__item">
                                <TextFieldGroup 
                                    type="password"
                                    name="passwordConfirm"
                                    placeholder="Confirm your password"
                                    value={ this.state.passwordConfirm }
                                    onChange={ this.handleChange }
                                    error={ errors.email }
                                    className="text-input"
                                />
                            </div>
                        </div>
                        <div className="form-meta">
                            <p>Already have an account? <Link to="/login">Log In</Link></p>
                            <button className="button">Sign Up</button>
                        </div>
                    </form>
                </div>
            );
        }

        return (
            <div className="content-container">
                <div className="page">
                    { registerContent }
                </div>
            </div>
        );
    };
};

Register.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object,
    startRegister: PropTypes.func.isRequired
};

const mapStateToProps = ( state ) => ({
    auth: state.auth,
    errors: state.errors
});

const mapDispatchToProps = ( dispatch ) => ({
    startRegister: ( registerData ) => dispatch( startRegister( registerData ) ) 
});

export default connect( mapStateToProps, mapDispatchToProps )( Register );