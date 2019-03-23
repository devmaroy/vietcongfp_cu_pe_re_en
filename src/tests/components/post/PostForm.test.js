import React from 'react';
import { shallow } from 'enzyme';
import { PostForm } from '../../../components/post/PostForm';
import TextFieldGroup from '../../../components/common/TextFieldGroup';
import TextAreaFieldGroup from '../../../components/common/TextAreaFieldGroup';
import posts from '../../fixtures/posts';

test( 'should correctly render form inside PostForm', () => {
    const wrapper = shallow( 
        <PostForm 
            user={ { name: 'Josh' } }
            onSubmit={ () => {} }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( 'form' ).exists() ).toBeTruthy();
});

test( 'should correctly render error object if no data provided', () => {
    const wrapper = shallow(
        <PostForm
            user={ { name: 'Josh' } }
            onSubmit={ () => {} }
        />
    );

    wrapper.find( 'form' ).simulate( 'submit', {
        preventDefault: () => {}
    });

    expect( wrapper.state( 'errors' ).title.length ).toBeGreaterThan( 0 );
    expect( wrapper.state( 'errors' ).body.length ).toBeGreaterThan( 0 );
});

test( 'should set title on change', () => {
    const value = 'title';

    const wrapper = shallow( 
        <PostForm
            user={ { name: 'Josh' } }
            onSubmit={ () => {} }
        />
    );

    const event = { target: { name: 'title', value } };

    wrapper.find( TextFieldGroup ).simulate( 'change', event );

    expect( wrapper.state( 'title' ) ).toBe( value );
});

test( 'should set body on change', () => {
    const value = 'some message here hiii';

    const wrapper = shallow( 
        <PostForm
            user={ { name: 'Josh' } }
            onSubmit={ () => {} }
        />
    );

    const event = { target: { name: 'body', value } };

    wrapper.find( TextAreaFieldGroup ).simulate( 'change', event );

    expect( wrapper.state( 'body' ) ).toBe( value );
});

test( 'should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();

    const wrapper = shallow(
        <PostForm 
            user={ { name: 'JoshTh' } }
            post={ posts[0] }
            onSubmit={ onSubmitSpy }
        />
    );

    wrapper.find( 'form' ).simulate( 'submit', {
        preventDefault: () => {}
    });

    expect( wrapper.state( 'errors' ) ).toEqual( {} );

    expect( onSubmitSpy ).toHaveBeenLastCalledWith({
        title: posts[0].title,
        body: posts[0].body,
        name: posts[0].name,
        createdAt: posts[0].createdAt
    });
});