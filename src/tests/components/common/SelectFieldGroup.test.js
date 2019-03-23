import React from 'react';
import { shallow } from 'enzyme';
import SelectFieldGroup from '../../../components/common/SelectFieldGroup';

const options = [ 
    { text: 'Afghanistan', key: 'AF' }, 
    { text: 'Åland Islands', key: 'AX' }, 
    { text: 'Albania', key: 'AL' }, 
    { text: 'Algeria', key: 'DZ' } 
];

test( 'should correctly render SelectFieldGroup only with required props', () => {
    const wrapper = shallow(
            <SelectFieldGroup 
                name="countries"
                options={ options }
                value={ options[0].key }
                onChange={ () => {} }
            />
        );
    
    expect( wrapper ).toMatchSnapshot();
});

test( 'should correctly render TextFieldGroup with all props', () => {
    const wrapper = shallow( 
            <SelectFieldGroup 
                name="countries"
                options={ options }
                value={ options[0].key }
                onChange={ () => {} }
                info="Choose your country"
                className="select"
            /> 
        );

    expect( wrapper ).toMatchSnapshot();
});