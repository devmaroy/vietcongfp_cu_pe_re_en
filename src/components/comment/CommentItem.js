import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { startRemoveComment } from '../../actions/post';

class CommentItem extends React.Component {
    onRemove = () => {
        this.props.startRemoveComment( this.props.id );
    };

    render() {
        const { comment, isAuthenticated } = this.props;

        return (
            <li>
                <h4>Author: { comment.name }</h4>
                <p>{ comment.body }</p>
                <h5>Date: { moment( comment.createdAt ).format('MMMM Do YYYY, h:mm:ss a') }</h5>
    
                { isAuthenticated && (
                    <button onClick={ this.onRemove }>remove</button>
                )}
            </li>
        );
    }
}

CommentItem.propTypes = {
    comment: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    startRemoveComment: PropTypes.func.isRequired
};

const mapStateToProps = ( state ) => ({
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = ( dispatch ) => ({
    startRemoveComment: ( id ) => dispatch( startRemoveComment( id ) )
}); 

export default connect( mapStateToProps, mapDispatchToProps )( CommentItem );