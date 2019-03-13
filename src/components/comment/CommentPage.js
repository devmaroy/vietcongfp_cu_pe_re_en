import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startGetCommentsByPostId } from '../../actions/post';
import CommentList from './CommentList';
import AddCommentPage from '../comment/AddCommentPage';
import Spinner from '../common/Spinner';

class CommentPage extends React.Component {
    componentDidMount() {
        this.props.startGetCommentsByPostId( this.props.postId );
    }

    render() {
        const { comments, isCommentLoading } = this.props.post;
        let commentsContent;
        
        if ( comments === null || isCommentLoading ) {
            commentsContent = <Spinner />;

        } else {
            commentsContent = <CommentList comments={ comments } />;
        }

        return (
            <div>
                <AddCommentPage />
                { commentsContent }
            </div>
        );
    };
};

CommentPage.propTypes = {
    post: PropTypes.object.isRequired,
    startGetCommentsByPostId: PropTypes.func.isRequired
};

const mapStateToProps = ( state ) => ({
    post: state.post
});

const mapDispatchToProps = ( dispatch ) => ({
    startGetCommentsByPostId: ( postId ) => dispatch( startGetCommentsByPostId( postId ) )
});

export default connect( mapStateToProps, mapDispatchToProps )( CommentPage );