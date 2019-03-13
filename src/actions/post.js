// Post Actions

import database from '../firebase/firebase';
import history from '../routers/history';
import { 
    GET_POSTS,
    GET_POST,
    ADD_POST,
    EDIT_POST,
    REMOVE_POST,
    GET_COMMENTS,
    ADD_COMMENT,
    REMOVE_COMMENT,
    POST_LOADING,
    CLEAR_POST_LOADING,
    COMMENT_LOADING,
    CLEAR_COMMENT_LOADING,
    GET_ERRORS
} from './types';


// Get Posts
export const startGetPosts = () => {
    return ( dispatch ) => {
        dispatch( setPostLoading() );

        return database
            .ref( 'posts' )
            .orderByChild( 'createdAt' )
            .once( 'value' )
            .then( ( snapshot ) => {
                const posts = [];

                snapshot.forEach( ( childSnapshot ) => {
                    posts.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });

                dispatch({
                    type: GET_POSTS,
                    posts
                });
    
                dispatch( clearPostLoading() );
            })
            .catch( ( err ) => {
                // Simple redirect to non existent route
                history.push( '/oops' );
            });
    };
};


// Get Post
export const startGetPost = ( id ) => {
    return ( dispatch ) => {
        dispatch( setPostLoading() );

        return database
            .ref( `posts/${ id }` )
            .once( 'value' )
            .then( ( snapshot ) => {
                if ( snapshot.exists() ) {
                    const post = {
                        id: snapshot.key,
                        ...snapshot.val()
                    };
        
                    dispatch({
                        type: GET_POST,
                        post
                    });
    
                    dispatch( clearPostLoading() );
                } else {
                    // Simple redirect to non existent route
                    history.push( '/not-found' );
                }
            })
            .catch( ( err ) => {
                // Simple redirect to non existent route
                history.push( '/oops' );
            });
    };
};


// Add Post
export const startAddPost = ( postData ) => {
    return ( dispatch ) => {
        return database
            .ref( 'posts' )
            .push( postData )
            .then( ( ref ) => {
                dispatch({
                    type: ADD_POST,
                    post: {
                        id: ref.key,
                        ...postData 
                    }
                });
    
                history.push( '/' );
            })
            .catch( ( err ) => {
                // Simple redirect to non existent route
                history.push( '/oops' );
            });
    };
} ;


// Edit Post 
export const startEditPost = ( id, updates ) => {
    return ( dispatch ) => {
        return database
            .ref( `posts/${ id }` )
            .update( updates )
            .then( ( ref ) => {
                dispatch({
                    type: EDIT_POST,
                    id,
                    updates
                });
    
                history.push( `/posts/${ id }` );
            })
            .catch( ( err ) => {
                // Simple redirect to non existent route
                history.push( '/oops' );
            });
    };
};


// Remove Post
export const startRemovePost = ( id ) => {
    return ( dispatch ) => {
        return database 
            .ref( `posts/${ id }` )
            .remove()
            .then( () => {
                dispatch({
                    type: REMOVE_POST,
                    id
                });
    
                history.push( '/' );
            })
            .catch( ( err ) => {
                // Simple redirect to non existent route
                history.push( '/oops' );
            });
    };
};


// Get Comments By Post Id
export const startGetCommentsByPostId = ( postId ) => {
    return ( dispatch ) => {
        dispatch( setCommentLoading() );

        return database
            .ref( 'comments' )
            .orderByChild( 'createdAt' )
            .once( 'value' )
            .then( ( snapshot ) => {
                const comments = [];
            
                snapshot.forEach( ( childSnapshot ) => {
                    if ( childSnapshot.val().postId === postId ) {
                        comments.push({
                            id: childSnapshot.key,
                            ...childSnapshot.val()
                        });
                    }
                });
    
                dispatch({
                    type: GET_COMMENTS,
                    comments
                });
    
                dispatch( clearCommentLoading() );
            })
            .catch( ( err ) => {
                // Simple redirect to non existent route
                history.push( '/oops' );
            });
    };
};


// Add Comment
export const startAddComment = ( commentData ) => {
    return ( dispatch ) => {
        return database
            .ref( 'comments' ) 
            .push( commentData )
            .then( ( ref ) => {
                dispatch({
                    type: ADD_COMMENT,
                    comment: {
                        id: ref.key,
                        ...commentData
                    }
                });
            })
            .catch( ( err ) => {
                // Simple redirect to non existent route
                history.push( '/oops' );
            });
    };
};


// Remove Comment
export const startRemoveComment = ( id ) => {
    return ( dispatch ) => {
        return database 
            .ref( `comments/${ id }` )
            .remove()
            .then(() => {
                dispatch({
                    type: REMOVE_COMMENT,
                    id
                });
            })
            .catch( ( err ) => {
                // Simple redirect to non existent route
                history.push( '/oops' );
            });
    };
};


// Post Loading
export const setPostLoading = () => ({
    type: POST_LOADING
});


// Clear Post Loading
export const clearPostLoading = () => ({
    type: CLEAR_POST_LOADING
});


// Comment Loading
export const setCommentLoading = () => ({
    type: COMMENT_LOADING
});


// Clear Comment Loading
export const clearCommentLoading = () => ({
    type: CLEAR_COMMENT_LOADING
});