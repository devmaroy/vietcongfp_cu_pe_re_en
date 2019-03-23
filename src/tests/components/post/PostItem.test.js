import React from 'react';
import { shallow } from 'enzyme';
import { PostItem } from '../../../components/post/PostItem';
import posts from '../../fixtures/posts';

test( 'should render PostItem correctly', () => {
    const wrapper = shallow(
        <PostItem
            post={ posts[0] }
        />
    );

    expect( wrapper ).toMatchSnapshot();
});

test( 'should show edit link if authenticated', () => {
    const wrapper = shallow(
        <PostItem
            post={ posts[0] }
            isAuthenticated={ true }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( '.edit-link' ).exists() ).toBeTruthy();
});

test( 'should not show edit link if not authenticated', () => {
    const wrapper = shallow(
        <PostItem
            post={ posts[0] }
            isAuthenticated={ false }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( '.edit-link' ).exists() ).toBeFalsy();
});

test( 'should show read more link if showActions is true', () => {
    const wrapper = shallow(
        <PostItem
            post={ posts[0] }
            isAuthenticated={ false }
            showActions={ true }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( '.read-more-link' ).exists() ).toBeTruthy();
});

test( 'should not show read more link if showActions is false', () => {
    const wrapper = shallow(
        <PostItem
            post={ posts[0] }
            isAuthenticated={ false }
            showActions={ false }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( '.read-more-link' ).exists() ).toBeFalsy();
});