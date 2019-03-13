import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
//{ id, title, body, name, createdAt, showActions, isAuthenticated }
const PostItem = ( props ) => {
    const { post, isAuthenticated, showActions } = props;
  
    return (
        <li>
            <Link to={ `/posts/${ post.id }` }>
                <h3>{ post.title }</h3>
            </Link>
            <p>{ post.body }</p>
            <h4>Author: { post.name }</h4>
            <h5>Date: { moment( post.createdAt ).format('MMMM Do YYYY, h:mm:ss a') }</h5>

            { isAuthenticated && (
                <Link to={ `/posts/${ post.id }/edit` }>edit</Link>
            )}

            { showActions && (
                <Link to={ `/posts/${ post.id }` }>Read more</Link>
            )}
        </li>
    );
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired
}

PostItem.defaultProps = {
    showActions: true
};

const mapStateToProps = ( state ) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect( mapStateToProps )( PostItem );