import React from 'react';
import { shallow } from 'enzyme';
import Hero from '../../../components/layout/Hero';

test( 'should correctly render Hero', () => {
    const wrapper = shallow( <Hero /> );

    expect( wrapper ).toMatchSnapshot();
});