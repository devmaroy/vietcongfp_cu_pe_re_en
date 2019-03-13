import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentForm from './CommentForm';
import { startAddComment } from '../../actions/post';

class AddCommentPage extends React.Component {
    onSubmit = ( commentData ) => {
        this.props.startAddComment( commentData );
    };

    render() {
        return (
            <div>
                <CommentForm 
                    onSubmit={ this.onSubmit }
                />
            </div>
        );
    };
};

AddCommentPage.propTypes = {
    startAddComment: PropTypes.func.isRequired
};

const mapDispatchToProps = ( dispatch ) => ({
    startAddComment: ( commentData ) => dispatch( startAddComment( commentData ) )
});

export default connect( undefined, mapDispatchToProps )( AddCommentPage );