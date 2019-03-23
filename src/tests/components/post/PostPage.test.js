import React from 'react';
import { shallow } from 'enzyme';
import { PostPage } from '../../../components/post/PostPage';
import Spinner from '../../../components/common/Spinner';
import PostList from '../../../components/post/PostList';

test( 'should render correctly PostPage with spinner', () => {
    const post = {
        posts: [],
        isPostLoading: true
    };

    const wrapper = shallow(
        <PostPage
            post={ post }
            startGetPosts={ () => {} }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( Spinner ).exists() ).toBeTruthy();
});

test( 'should not render PostPage with spinner', () => {
    const post = {
        posts: [],
        isPostLoading: false
    };

    const wrapper = shallow(
        <PostPage
            post={ post }
            startGetPosts={ () => {} }
        />
    );

    expect( wrapper.find( Spinner ).exists() ).toBeFalsy();
})

test( 'should render correctly PostList', () => {
    const post = {
        posts: [],
        isPostLoading: false
    };

    const wrapper = shallow(
        <PostPage
            post={ post }
            startGetPosts={ () => {} }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( PostList ).exists() ).toBeTruthy();
});