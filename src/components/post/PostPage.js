import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startGetPosts } from '../../actions/post';
import Spinner from '../common/Spinner';
import PostList from './PostList';

export class PostPage extends React.Component {
    componentDidMount() {
        this.props.startGetPosts();
    };

    render() {
        const { posts, isPostLoading } = this.props.post;
        let postsContent;

        if ( posts === null || isPostLoading ) {
            postsContent = <Spinner />;
        } else {
           postsContent = <PostList posts={ posts } />;
        }

        return (
            <div className="content-container">
                <div className="page">
                    { postsContent }
                </div>
            </div>
        );
    }
}

PostPage.propTypes = {
    startGetPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
    post: state.post
});

const mapDispatchToProps = ( dispatch ) => ({
    startGetPosts: () => dispatch( startGetPosts() )
});

export default connect( mapStateToProps, mapDispatchToProps )( PostPage );