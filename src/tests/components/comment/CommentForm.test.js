import React from 'react';
import { shallow } from 'enzyme';
import { CommentForm } from '../../../components/comment/CommentForm';
import TextFieldGroup from '../../../components/common/TextFieldGroup';
import TextAreaFieldGroup from '../../../components/common/TextAreaFieldGroup';
import comments from '../../fixtures/comments';
import moment from 'moment';

test( 'should correctly render form inside PostForm', () => {
    const wrapper = shallow(
        <CommentForm
            onSubmit={ () => {} }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( 'form' ).exists() ).toBeTruthy();
});

test( 'should correctly render error object if no data provided', () => {
    const wrapper = shallow(
        <CommentForm
            onSubmit={ () => {} }
        />
    );

    wrapper.find( 'form' ).simulate( 'submit', {
        preventDefault: () => {}
    });

    expect( wrapper.state( 'errors' ).name.length ).toBeGreaterThan( 0 );
    expect( wrapper.state( 'errors' ).body.length ).toBeGreaterThan( 0 );
}); 

test( 'should set name on change', () => {
    const wrapper = shallow(
        <CommentForm
            onSubmit={ () => {} }
        />
    );

    const value = 'Phili480';
    const event = { target: { name: 'name', value } };

    wrapper.find( TextFieldGroup ).simulate( 'change', event );

    expect( wrapper.state( 'name' ) ).toBe( value );
});

test( 'should set body on change', () => {
    const wrapper = shallow(
        <CommentForm
            onSubmit={ () => {} }
        />
    );

    const value = 'some nice comment here lol';
    const event = { target: { name: 'body', value } };

    wrapper.find( TextAreaFieldGroup ).simulate( 'change', event );

    expect( wrapper.state( 'body' ) ).toBe( value );
});

test( 'should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn(); 

    const wrapper = shallow(
        <CommentForm
            onSubmit={ onSubmitSpy }
            match={ { params: { id: "1" } } }
        />
    );

    wrapper.setState( { name: comments[0].name, body: comments[0].body } );

    wrapper.find( 'form' ).simulate( 'submit', {
        preventDefault: () => {}
    });

    expect( wrapper.state( 'errors' ) ).toEqual( {} )

    expect( onSubmitSpy ).toHaveBeenLastCalledWith({
        name: comments[0].name,
        body: comments[0].body,
        createdAt: moment().valueOf(),
        postId: '1'
    });
});