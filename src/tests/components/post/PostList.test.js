import React from 'react';
import { shallow } from 'enzyme';
import PostList from '../../../components/post/PostList';
import posts from '../../fixtures/posts';

test( 'should render PostList with empty message', () => {
    const wrapper = shallow(
        <PostList
            posts={ [] }
        />
    );

    expect( wrapper ).toMatchSnapshot();
});

test( 'should render PostList correctly with data', () => {
    const wrapper = shallow(
        <PostList 
            posts={ posts }
        />
    );

    expect( wrapper ).toMatchSnapshot();
});

test( 'should show Pagination if length of posts is more than postsPerPage in state', () => {
    const wrapper = shallow(
        <PostList
            posts={ posts }
        />
    );

    wrapper.setState({
        postsPerPage: 1
    });

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( '.site-pagination' ).exists() ).toBeTruthy();
});

test( 'should not show Pagination if length of posts is less than postsPerPage in state', () => {
    const wrapper = shallow(
        <PostList
            posts={ posts }
        />
    );

    wrapper.setState({
        postsPerPage: 20
    });

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( '.site-pagination' ).exists() ).toBeFalsy();
});