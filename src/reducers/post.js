// Post Reducer

import {
    GET_POSTS,
    GET_POST,
    ADD_POST,
    EDIT_POST,
    REMOVE_POST,
    GET_COMMENTS,
    ADD_COMMENT,
    REMOVE_COMMENT,
    SET_POST_LOADING,
    CLEAR_POST_LOADING,
    SET_COMMENT_LOADING,
    CLEAR_COMMENT_LOADING
} from '../actions/types';

const postReducerDefaultState = {
    posts: [],
    post: {},
    comments: [],
    isPostLoading: false,
    isCommentLoading: false
};

export default ( state = postReducerDefaultState, action ) => {
    switch ( action.type ) {
        
        case GET_POSTS:
            return {
                ...state,
                posts: action.posts.reverse()
            };

        case GET_POST:
            return {
                ...state,
                post: action.post
            };

        case ADD_POST:
            return {
                ...state,
                posts: [ action.post, ...state.posts ]
            };

        case EDIT_POST:
            return {
                ...state,
                posts: state.posts.map( ( post ) => {
                    if ( post.id === action.id ) {
                        return {
                            ...post,
                            ...action.updates
                        }
                    } else {
                        return post;
                    }
                })
            };

        case REMOVE_POST:
            return {
                ...state,
                posts: state.posts.filter( ( post ) => post.id !== action.id )
            };
        
        case GET_COMMENTS: 
            return {
                ...state,
                comments: action.comments.reverse()
            }
            
        case ADD_COMMENT:
            return {
                ...state,
                comments: [ action.comment, ...state.comments ]
            };

        case REMOVE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter( ( comment ) => comment.id !== action.id )
            };

        case SET_POST_LOADING:
            return {
                ...state,
                isPostLoading: true
            };

        case SET_COMMENT_LOADING:
            return {
                ...state,
                isCommentLoading: true
            };

        case CLEAR_COMMENT_LOADING:
            return {
                ...state,
                isCommentLoading: false
            };

        case CLEAR_POST_LOADING:
            return {
                ...state,
                isPostLoading: false
            };
    
        default:
            return state;
    };
};