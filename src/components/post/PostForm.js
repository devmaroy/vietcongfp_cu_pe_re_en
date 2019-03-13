import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import Spinner from '../common/Spinner';

class PostForm extends React.Component {
    state = {
        title: this.props.post ? this.props.post.title : '',
        body: this.props.post ? this.props.post.body : '',
        createdAt: this.props.post ? this.props.post.createdAt : Date.now(),
        errors: {}
    };

    handleValidation = () => {
        const errors = {};
        let formIsValid = true;

        // Title
        if ( ! this.state.title ) {
            formIsValid = false;
            errors[ 'title' ] = 'Title cannot be empty';
        }

        // Body
        if ( ! this.state.body ) {
            formIsValid = false;
            errors[ 'body' ] = 'Text cannot be empty';
        } else if ( this.state.body.length < 15 ) {
            formIsValid = false;
            errors[ 'body' ] = 'Text must be at least 15 characters.'
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
            const postData = {
                title: this.state.title,
                body: this.state.body,
                createdAt: this.state.createdAt,
                name: this.props.user.name
            };
            
            this.props.onSubmit( postData );
        }
    }

    render() {
        const { errors } = this.state;

        return (
            <form onSubmit={ this.onSubmit }>
                <TextFieldGroup 
                    name="title"
                    placeholder="Title"
                    value={ this.state.title }
                    onChange={ this.handleChange }
                    error={ errors.title }
                />
                <TextAreaFieldGroup
                    name="body"
                    placeholder="Text"
                    value={ this.state.body }
                    onChange={ this.handleChange }
                    error={ errors.body }
                />
                <button>Save Post</button>
            </form>
        );
    };
};

PostForm.propTypes = {
    user: PropTypes.object.isRequired,
    post: PropTypes.object,
};

const mapStateToProps = ( state ) => ({
    user: state.auth.user
});

export default connect( mapStateToProps )( PostForm );