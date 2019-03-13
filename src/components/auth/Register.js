import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { startRegister } from '../../actions/auth';
import Spinner from '../common/Spinner';

class Register extends React.Component {
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
            errors[ 'nameError' ] = 'Name cannot be empty.';
        }

        // Email
        if ( ! this.state.email ) {
            formIsValid = false;
            errors[ 'emailError' ] = 'Email cannot be empty.';
        } else if ( ! validator.isEmail( this.state.email ) ) {
            formIsValid = false;
            errors[ 'emailError' ] = 'The email address is badly formatted.';
        }

        // Password
        if ( ! this.state.password ) {
            formIsValid = false;
            errors[ 'passwordError' ] = 'Password cannot be empty.';
        } else if ( this.state.password.length < 6 ) {
            formIsValid = false;
            errors[ 'passwordError' ] = 'The password must be 6 characters long or more.';
        }

        // Password confirm
        if ( ! this.state.passwordConfirm ) {
            formIsValid = false;
            errors[ 'passwordConfirmError' ] = 'Password confirm cannot be empty.';
        } else if ( this.state.passwordConfirm !== this.state.password ) {
            formIsValid = false;
            errors[ 'passwordConfirmError' ] = 'Password confirm do not match with your password.';
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
        const { nameError, emailError, passwordError, passwordConfirmError, authError } = this.state.errors;
        const { isLoading } = this.props.auth;

        let registerContent;

        if ( isLoading ) {
            registerContent = <Spinner />;
        } else {
            registerContent = (
                <div>
                    <h2>Sign Up</h2>
                    <form onSubmit={ this.onSubmit }>
                        { authError && <p>{ authError }</p> }
                        <input 
                            type="text"
                            name="name"
                            placeholder="Your name"
                            onChange={ this.handleChange }
                            value={ this.state.name }
                        />
                        <br/>
                        { nameError && <p>{ nameError }</p> }
                        <input 
                            type="text"
                            name="email"
                            placeholder="Your email"
                            onChange={ this.handleChange }
                            value={ this.state.email }
                        />
                        <br/>
                        { emailError && <p>{ emailError }</p> }
                        <input 
                            type="password"
                            name="password"
                            placeholder="Your password"
                            onChange={ this.handleChange }
                            value={ this.state.password }
                        />
                        <br/>
                        { passwordError && <p>{ passwordError }</p> }
                        <input 
                            type="password"
                            name="passwordConfirm"
                            placeholder="Confirm your password"
                            onChange={ this.handleChange }
                            value={ this.state.passwordConfirm } 
                        />
                        <br/>
                        { passwordConfirmError && <p>{ passwordConfirmError }</p> }
                        <p>Already have an account? <Link to="/login">Log In</Link></p>
                        <button>Sign Up</button>
                    </form>
                </div>
            );
        }

        return (
            <div>
                { registerContent }
            </div>
        );
    };
};

Register.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
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