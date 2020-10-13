import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startAddPost } from '../../actions/post';
import PostForm from './PostForm';

export class AddPostPage extends React.Component {
    onSubmit = ( postData ) => {
        this.props.startAddPost( postData );
    };

    render() {
        return (
            <div className="content-container">
                <div className="page">
                    <h2>Create Post</h2>
                    <PostForm 
                        onSubmit={ this.onSubmit }
                    />
                </div>
            </div>
        )
    };
};

AddPostPage.propTypes = {
    startAddPost: PropTypes.func.isRequired
};

const mapDispatchToProps = ( dispatch ) => ({
    startAddPost: ( postData ) => dispatch( startAddPost( postData ) )
});

export default connect( undefined, mapDispatchToProps )( AddPostPage );