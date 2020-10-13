import React from 'react';
import { shallow } from 'enzyme';
import { AddClanPage } from '../../../components/clan/AddClanPage';
import ClanForm from '../../../components/clan/ClanForm';
import clans from '../../fixtures/clans';

test( 'should render AddPostPage correctly', () => {
    const wrapper = shallow(
        <AddClanPage
            startAddClan={ () => {} }
        />
    );

    expect( wrapper ).toMatchSnapshot();
});

test( 'should render ClanForm correctly', () => {
    const wrapper = shallow(
        <AddClanPage
            startAddClan={ () => {} }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( ClanForm ).exists() ).toBeTruthy();
});

test( 'should handle onSubmit', () => {
    const startAddClan = jest.fn();

    const wrapper = shallow(
        <AddClanPage
            startAddClan={ startAddClan }
        />
    );

    wrapper.find( ClanForm ).prop( 'onSubmit' )( clans[1] );

    expect( startAddClan ).toHaveBeenLastCalledWith( clans[1] );
});