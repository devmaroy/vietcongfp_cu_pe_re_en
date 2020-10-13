import React from 'react';
import { shallow } from 'enzyme';
import TextAreaFieldGroup from '../../../components/common/TextAreaFieldGroup';

test( 'should correctly render TextAreaFieldGroup only with required props', () => {
    const wrapper = shallow(
        <TextAreaFieldGroup 
            name="body"
            value="Some text here"
            onChange={ () => {} }
        />
    );

    expect( wrapper ).toMatchSnapshot();
});

test( 'should correctly render TextAreaFieldGroup with all props', () => {
    const wrapper = shallow(
        <TextAreaFieldGroup 
            name="body"
            value="Some"
            placeholder="Enter your message"
            onChange={ () => {} }
            info="This message will be under posts"
            error="Please enter at least 10 characters"
            disabled={ false }
        />
    );

    expect( wrapper ).toMatchSnapshot();
});