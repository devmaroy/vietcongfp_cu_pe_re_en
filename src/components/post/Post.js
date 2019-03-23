import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startGetPostById } from '../../actions/post';
import Spinner from '../common/Spinner';
import PostItem from './PostItem';
import CommentPage from '../comment/CommentPage';

export class Post extends React.Component {
    componentDidMount() {
        this.props.startGetPostById( this.props.match.params.id );
    };

    render() {
        const { post, isPostLoading } = this.props.post;
        let postContent;

        if ( post === null || isPostLoading || Object.keys( post ).length === 0 ) {
            postContent = <Spinner />;       
        } else {
            postContent = (
                <div>
                    <PostItem key={ post.id } post={ post } showActions={ false } isSingle={ true } />
                    <CommentPage postId={ post.id } />
                </div>
            )
        }

        return (
            <div className="content-container">
                <div className="page">
                    { postContent }
                </div>
            </div>
        );
    }
}

Post.propTypes = {
    startGetPostById: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
    post: state.post
});

const mapDispatchToProps = ( dispatch ) => ({
    startGetPostById: ( id ) => dispatch( startGetPostById( id ) )
});

export default connect( mapStateToProps, mapDispatchToProps )( Post );     