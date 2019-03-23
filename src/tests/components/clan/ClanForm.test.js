import React from 'react';
import { shallow } from 'enzyme';
import ClanForm from '../../../components/clan/ClanForm';
import TextFieldGroup from '../../../components/common/TextFieldGroup';
import SelectFieldGroup from '../../../components/common/SelectFieldGroup';
import clans from '../../fixtures/clans';

test( 'should correctly render form inside ClanForm', () => {
    const wrapper = shallow( 
        <ClanForm 
            onSubmit={ () => {} }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( 'form' ).exists() ).toBeTruthy();
});

test( 'should correctly render error object if no data provided', () => {
    const wrapper = shallow(
        <ClanForm
            onSubmit={ () => {} }
        />
    );

    wrapper.find( 'form' ).simulate( 'submit', {
        preventDefault: () => {}
    });

    expect( wrapper.state( 'errors' ).tag.length ).toBeGreaterThan( 0 );
    expect( wrapper.state( 'errors' ).name.length ).toBeGreaterThan( 0 );
    expect( wrapper.state( 'errors' ).country.length ).toBeGreaterThan( 0 );
    expect( wrapper.state( 'errors' ).leader.length ).toBeGreaterThan( 0 );
    expect( wrapper.state( 'errors' ).url.length ).toBeGreaterThan( 0 );
});

test( 'should set tag on change', () => {
    const value = 'AVP';

    const wrapper = shallow( 
        <ClanForm
            onSubmit={ () => {} }
        />
    );

    const event = { target: { name: 'tag', value } };

    wrapper.find( TextFieldGroup ).at( 0 ).simulate( 'change', event );

    expect( wrapper.state( 'tag' ) ).toBe( value );
});

test( 'should set name on change', () => {
    const value = 'Awesome Vietcong Players';

    const wrapper = shallow( 
        <ClanForm
            onSubmit={ () => {} }
        />
    );

    const event = { target: { name: 'name', value } };

    wrapper.find( TextFieldGroup ).at( 1 ).simulate( 'change', event );

    expect( wrapper.state( 'name' ) ).toBe( value );
});

test( 'should set tag on change', () => {
    const value = 'CZ';

    const wrapper = shallow( 
        <ClanForm
            onSubmit={ () => {} }
        />
    );

    const event = { target: { name: 'country', value } };

    wrapper.find( SelectFieldGroup ).simulate( 'change', event );

    expect( wrapper.state( 'country' ) ).toBe( value );
});

test( 'should set leader on change', () => {
    const value = 'Filip9';

    const wrapper = shallow( 
        <ClanForm
            onSubmit={ () => {} }
        />
    );

    const event = { target: { name: 'leader', value } };

    wrapper.find( TextFieldGroup ).at( 2 ).simulate( 'change', event );

    expect( wrapper.state( 'leader' ) ).toBe( value );
});

test( 'should set url on change', () => {
    const value = 'https://avp.wz.cz/';

    const wrapper = shallow( 
        <ClanForm
            onSubmit={ () => {} }
        />
    );

    const event = { target: { name: 'url', value } };

    wrapper.find( TextFieldGroup ).at( 3 ).simulate( 'change', event );

    expect( wrapper.state( 'url' ) ).toBe( value );
});

test( 'should set eslName on change', () => {
    const value = 'AVP-CZ-SK';

    const wrapper = shallow( 
        <ClanForm
            onSubmit={ () => {} }
        />
    );

    const event = { target: { name: 'eslName', value } };

    wrapper.find( TextFieldGroup ).at( 4 ).simulate( 'change', event );

    expect( wrapper.state( 'eslName' ) ).toBe( value );
});

test( 'should set eslUrl on change', () => {
    const value = 'https://esl.com/team/96';

    const wrapper = shallow( 
        <ClanForm
            onSubmit={ () => {} }
        />
    );

    const event = { target: { name: 'eslUrl', value } };

    wrapper.find( TextFieldGroup ).at( 5 ).simulate( 'change', event );

    expect( wrapper.state( 'eslUrl' ) ).toBe( value );
});

test( 'should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();

    const wrapper = shallow(
        <ClanForm 
            clan={ clans[0] }
            onSubmit={ onSubmitSpy }
        />
    );

    wrapper.find( 'form' ).simulate( 'submit', {
        preventDefault: () => {}
    });

    expect( wrapper.state( 'errors' ) ).toEqual( {} );

    expect( onSubmitSpy ).toHaveBeenLastCalledWith({
        tag: clans[0].tag,
        name: clans[0].name,
        country: clans[0].country,
        leader: clans[0].leader,
        url: clans[0].url,
        eslName: clans[0].eslName,
        eslUrl: clans[0].eslUrl,
        createdAt: clans[0].createdAt
    });
});