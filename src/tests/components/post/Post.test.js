import React from 'react';
import { shallow } from 'enzyme';
import { Post } from '../../../components/post/Post';
import PostItem from '../../../components/post/PostItem';
import CommentPage from '../../../components/comment/CommentPage';
import posts from '../../fixtures/posts';

test( 'should render correctly Post with spinner', () => {
    const post = {
        post: {},
        isPostLoading: true
    };
    
    const wrapper = shallow(
        <Post
            startGetPostById={ () => {} }
            post={ post }
            match={ { params: { id: 1 } } }
        />
    );

    expect( wrapper ).toMatchSnapshot();
});

test( 'should render post item and comment page', () => {
    const post = {
        post: posts[1],
        isPostLoading: false
    };

    const wrapper = shallow(
        <Post
            startGetPostById={ () => {} }
            post={ post }
            match={ { params: { id: 1 } } }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( PostItem ).exists() ).toBeTruthy();
    expect( wrapper.find( CommentPage ).exists() ).toBeTruthy();
});