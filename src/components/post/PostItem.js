import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { createParagraphs, limitText } from '../../utils/text-helper-functions';

export const PostItem = ( props ) => {
    const { post, isAuthenticated, showActions, isSingle } = props;
    const postBody = isSingle ? createParagraphs( post.body ) : createParagraphs( limitText( post.body ) );

    return (
        <div className="post">
            <Link to={ `/posts/${ post.id }` }>
                <h1 className="page__title">{ post.title }</h1>
            </Link>
            
            <div className="page__body">
                { postBody }
            </div>
            
            <div className="page__meta">
                <h4>Author: { post.name }</h4>
                <h5>{ moment( post.createdAt ).format('MMMM Do YYYY, h:mm:ss a') }</h5>
            </div>

            { showActions && (
                <Link to={ `/posts/${ post.id }` } className="button read-more-link">Read more</Link>
            )}

            { isAuthenticated && (
                <Link className="button edit-link" to={ `/posts/${ post.id }/edit` }>edit</Link>
            )}
        </div>
    );
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired
}

PostItem.defaultProps = {
    showActions: true,
    isSingle: false
};

const mapStateToProps = ( state ) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect( mapStateToProps )( PostItem );