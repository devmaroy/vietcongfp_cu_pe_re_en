import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { startRemoveComment } from '../../actions/comment';
import { createParagraphs } from '../../utils/text-helper-functions';

export const CommentItem = ( props ) => {
    const { comment, isAuthenticated, post } = props;
    const commentBody = createParagraphs( comment.body );
    const authorIcon = (
        <img 
            src="/images/icons/star.svg" 
            alt="Star icon"
            title="Author"
            className="icon star-icon"
        />
    )

    const onRemove = () => {
        props.startRemoveComment( comment.id );
    };

    return (
        <div className="comment">
            <h3
                className="comment__title"
            >
                { comment.name }
                { comment.name === post.name && authorIcon }
            </h3>

            <div className="comment__body">
                { commentBody }
            </div>

            <div className="comment_meta">
                <h5>{ moment( comment.createdAt ).format('MMMM Do YYYY, h:mm:ss a') }</h5>

                {
                    isAuthenticated && (
                        <button onClick={ onRemove } className="button">remove</button>
                    )
                }
            </div>
        </div>
    );
}

CommentItem.propTypes = {
    comment: PropTypes.object.isRequired,
    post: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    startRemoveComment: PropTypes.func.isRequired
};

const mapStateToProps = ( state ) => ({
    isAuthenticated: state.auth.isAuthenticated,
    post: state.post.post
});

const mapDispatchToProps = ( dispatch ) => ({
    startRemoveComment: ( id ) => dispatch( startRemoveComment( id ) )
});

export default connect( mapStateToProps, mapDispatchToProps )( CommentItem );