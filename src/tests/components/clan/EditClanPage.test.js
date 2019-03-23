import React from 'react';
import { shallow } from 'enzyme';
import { EditClanPage } from '../../../components/clan/EditClanPage';
import ClanForm from '../../../components/clan/ClanForm';
import Spinner from '../../../components/common/Spinner';
import clans from '../../fixtures/clans';

test( 'should render correctly EditClanPage with spinner', () => {
    const clan = {
        clan: {},
        isClanLoading: true
    }

    const wrapper = shallow(
        <EditClanPage
            startGetClanById={ () => {} }
            startEditClan={ () => {} }
            clan={ clan }
            match={ { params: { id: '1' } } }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( Spinner ).exists() ).toBeTruthy();
});

test( 'should render correctly EditClanPage without spinner', () => {
    const clan = {
        clan: clans[0],
        isClanLoading: false
    }

    const wrapper = shallow(
        <EditClanPage
            startGetClanById={ () => {} }
            startEditClan={ () => {} }
            clan={ clan }
            match={ { params: { id: '1' } } }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( Spinner ).exists() ).toBeFalsy();
});

test( 'should render ClanForm correctly', () => {
    const clan = {
        clan: clans[0],
        isClanLoading: false
    }

    const wrapper = shallow(
        <EditClanPage
            startGetClanById={ () => {} }
            startEditClan={ () => {} }
            clan={ clan }
            match={ { params: { id: '1' } } }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( ClanForm ).exists() ).toBeTruthy();
});

test( 'should call startGetClan', () => {
    const clan = {
        clan: clans[0],
        isClanLoading: false
    }

    const startGetClanById = jest.fn();

    const wrapper = shallow(
        <EditClanPage
            startGetClanById={ startGetClanById }
            startEditClan={ () => {} }
            clan={ clan }
            match={ { params: { id: '1' } } }
        />
    );

    expect( startGetClanById ).toHaveBeenCalled();
});

test( 'should handle startEditClan', () => {
    const startEditClan = jest.fn();

    const clan = {
        clan: clans[1],
        isClanLoading: false
    };

    const wrapper = shallow(
        <EditClanPage
            startGetClanById={ () => {} }
            startEditClan={ startEditClan }
            clan={ clan }
            match={ { params: { id: clans[1].id } } }
        />
    );

    wrapper.find( ClanForm ).prop( 'onSubmit' )( clans[1] );

    expect( startEditClan ).toHaveBeenLastCalledWith( clans[1].id, clans[1] );
});