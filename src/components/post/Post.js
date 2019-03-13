import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startGetPost } from '../../actions/post';
import Spinner from '../common/Spinner';
import PostItem from './PostItem';
import CommentPage from '../comment/CommentPage';

class Post extends React.Component {
    componentDidMount() {
        this.props.startGetPost( this.props.match.params.id );
    };

    render() {
        const { post, isPostLoading } = this.props.post;
        let postContent;

        if ( post === null || isPostLoading || Object.keys( post ).length === 0 ) {
            postContent = <Spinner />;       
        } else {
            postContent = (
                <div>
                     <PostItem key={ post.id } post={ post } showActions={ false } />
                     <CommentPage postId={ post.id } />
                </div>
            )
        }

        return postContent;
    }
}

Post.propTypes = {
    startGetPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
    post: state.post
});

const mapDispatchToProps = ( dispatch ) => ({
    startGetPost: ( id ) => dispatch( startGetPost( id ) )
});

export default connect( mapStateToProps, mapDispatchToProps )( Post );     