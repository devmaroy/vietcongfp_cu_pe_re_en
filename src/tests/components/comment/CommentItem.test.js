import React from 'react';
import { shallow } from 'enzyme';
import { CommentItem } from '../../../components/comment/CommentItem';
import comments from '../../fixtures/comments';

const post = {
    id: 'someid',
    name: 'Josh',
    title: 'Sometitle'
}

test( 'should render CommentItem correctly', () => {
    const wrapper = shallow(
        <CommentItem
            comment={ comments[0] }
            post={ post }
            startRemoveComment={ () => {} }
        />  
    );

    expect( wrapper ).toMatchSnapshot();
});

test( 'should show remove button if authenticated', () => {
    const wrapper = shallow(
        <CommentItem
            comment={ comments[0] }
            post={ post }
            startRemoveComment={ () => {} }
            isAuthenticated={ true }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( 'button' ).exists() ).toBeTruthy();
});

test( 'should not show remove button if not authenticated', () => {
    const wrapper = shallow(
        <CommentItem
            comment={ comments[0] }
            post={ post }
            startRemoveComment={ () => {} }
            isAuthenticated={ false }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( 'button' ).exists() ).toBeFalsy();
});

test( 'should call startRemoveComment', () => {
    const startRemoveComment = jest.fn();

    const wrapper = shallow(
        <CommentItem
            comment={ comments[0] }
            post={ post }
            startRemoveComment={ startRemoveComment }
            isAuthenticated={ true }
        />  
    );

    wrapper.find( 'button' ).simulate( 'click' );

    expect( startRemoveComment ).toHaveBeenLastCalledWith( comments[0].id );
});