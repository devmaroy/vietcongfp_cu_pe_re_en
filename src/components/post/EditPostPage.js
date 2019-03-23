import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startGetPostById, startEditPost, startRemovePost } from '../../actions/post';
import Spinner from '../common/Spinner';
import PostForm from './PostForm';

export class EditPostPage extends React.Component {
    componentDidMount() {
        this.props.startGetPostById( this.props.match.params.id );
    };

    onRemove = () => {
        this.props.startRemovePost( this.props.match.params.id );
    };

    onSubmit = ( updates ) => {
        this.props.startEditPost( this.props.match.params.id, updates );
    };

    render() {
        const { post, isPostLoading } = this.props.post;
        let postEditContent;

        if ( post === null || isPostLoading || Object.keys( post ).length === 0 ) {
            postEditContent = <Spinner />;
        } else {
           postEditContent = (
               <div>
                    <h2>Edit Post</h2>
                    <PostForm
                        onSubmit={ this.onSubmit }
                        post={ post }
                    />
                    <button onClick={ this.onRemove } className="button button--secondary">Remove</button>
               </div>
           );
        }

        return (
            <div className="content-container">
                <div className="page">
                    { postEditContent }
                </div>
            </div>
        )
    }
}

EditPostPage.propTypes = {
    startGetPostById: PropTypes.func.isRequired,
    startRemovePost: PropTypes.func.isRequired,
    startEditPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
    post: state.post
});

const mapDispatchToProps = ( dispatch ) => ({
    startGetPostById: ( id ) => dispatch( startGetPostById( id ) ),
    startEditPost: ( id, updates ) => dispatch( startEditPost( id, updates ) ),
    startRemovePost: ( id ) => dispatch( startRemovePost( id ) )
});

export default connect( mapStateToProps, mapDispatchToProps )( EditPostPage );