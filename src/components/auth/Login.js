import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { startLogin } from '../../actions/auth';
import Spinner from '../common/Spinner';

class Login extends React.Component {
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
            errors[ 'emailError' ] = 'Email cannot be empty.';
        } else if ( ! validator.isEmail( this.state.email ) ) {
            formIsValid = false;
            errors[ 'emailError' ] = 'Email is invalid.';
        }

        // Password
        if ( ! this.state.password ) {
            formIsValid = false;
            errors[ 'passwordError' ] = 'Password cannot be empty.';
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
        const { emailError, passwordError, authError } = this.state.errors;
        const { isLoading } = this.props.auth;

        let loginContent;

        if ( isLoading ) {
            loginContent = <Spinner />;
        } else {
            loginContent = (
                <div>
                    <h2>Sign In</h2>
                    <form onSubmit={ this.onSubmit }>
                        { authError && <p>{ authError }</p> }
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
                        <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                        <button>Sign In</button>
                    </form>
                </div>
            );
        }

        return (
            <div>
                { loginContent }
            </div>
        );
    };
};

Login.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
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