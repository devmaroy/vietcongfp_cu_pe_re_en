import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startAddPost } from '../../actions/post';
import Spinner from '../common/Spinner';
import PostForm from './PostForm';

class AddPostPage extends React.Component {
    onSubmit = ( postData ) => {
        this.props.startAddPost( postData );
    };

    render() {
        return (
            <div>
                <h3>Create Post</h3>
                <PostForm 
                    onSubmit={ this.onSubmit }
                />
            </div>
        )
    };
};

AddPostPage.propTypes = {
    startAddPost: PropTypes.func.isRequired
};

const mapStateToProps = ( state ) => ({
    errors: state.errors
});

const mapDispatchToProps = ( dispatch ) => ({
    startAddPost: ( postData ) => dispatch( startAddPost( postData ) )
});

export default connect( mapStateToProps, mapDispatchToProps )( AddPostPage );