import React from 'react';
import { shallow } from 'enzyme';
import TextFieldGroup from '../../../components/common/TextFieldGroup';

test( 'should correctly render TextFieldGroup only with required props', () => {
    const wrapper = shallow(
            <TextFieldGroup 
                name="email"
                type="email"
                value="email@email.com"
                onChange={ () => {} }
                disabled={ false }
            />
        );
    
    expect( wrapper ).toMatchSnapshot();
});

test( 'should correctly render TextFieldGroup with all props', () => {
    const wrapper = shallow( 
            <TextFieldGroup 
                name="email"
                type="email"
                placeholder="Enter your email"
                value="emailemail.com"
                error="Email is not valid"
                info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                onChange={ () => {} }
                disabled={ false }
            /> 
        );

    expect( wrapper ).toMatchSnapshot();
});