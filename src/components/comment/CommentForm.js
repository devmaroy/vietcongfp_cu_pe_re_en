import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import Spinner from '../common/Spinner';
import history from '../../routers/history';

class CommentForm extends React.Component {
    state = {
        name: this.props.user ? this.props.user.name : '',
        body: '',
        errors: {}
    };
    
    handleValidation = () => {
        const errors = {};
        let formIsValid = true;

        // Name
        if ( ! this.state.name ) {
            formIsValid = false;
            errors[ 'name' ] = 'Name cannot be empty';
        }

        // Body
        if ( ! this.state.body ) {
            formIsValid = false;
            errors[ 'body' ] = 'Text cannot be empty';
        } else if ( this.state.body.length < 5 ) {
            formIsValid = false;
            errors[ 'body' ] = 'Text must be at least 5 characters.'
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
            const commentData = {
                name: this.state.name,
                body: this.state.body,
                createdAt: Date.now(),
                postId: this.props.match.params.id
            };
            
            this.props.onSubmit( commentData );
            
            this.setState( () => ( { body: '' } ) );
        }
    };

    render() {
        const { errors } = this.state;
  
        return (
            <form onSubmit={ this.onSubmit }>
                <TextFieldGroup 
                    name="name"
                    placeholder="Name"
                    value={ this.state.name }
                    onChange={ this.handleChange }
                    error={ errors.name }
                    disabled={ this.props.isAuthenticated }
                />
                <TextAreaFieldGroup 
                    name="body"
                    placeholder="Body"
                    value={ this.state.body }
                    onChange={ this.handleChange }
                    error={ errors.body }
                />
                <button>Save Comment</button>
            </form>
        );
    };
};

CommentForm.propTypes = {
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = ( state ) => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect( mapStateToProps )( withRouter( CommentForm ) );