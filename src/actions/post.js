// Post Actions

import database from '../firebase/firebase';
import history from '../routers/history';
import { 
    GET_POSTS,
    GET_POST,
    ADD_POST,
    EDIT_POST,
    REMOVE_POST,
    SET_POST_LOADING,
    CLEAR_POST_LOADING,
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
export const startGetPostById = ( id ) => {
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


// Post Loading
export const setPostLoading = () => ({
    type: SET_POST_LOADING
});


// Clear Post Loading
export const clearPostLoading = () => ({
    type: CLEAR_POST_LOADING
});