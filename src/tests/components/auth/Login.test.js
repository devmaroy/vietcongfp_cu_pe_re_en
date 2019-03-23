import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../../components/auth/Login';

test( 'should render correctly Login with spinner', () => {
    const wrapper = shallow( 
         <Login 
            startLogin={ () => {} }
            auth={ { isLoading: true } }
         />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( 'Spinner' ).exists() ).toBeTruthy();
});

test( 'should render correctly Login without spinner', () => {
    const wrapper = shallow( 
        <Login 
            startLogin={ () => {} }
            auth={ { isLoading: false } }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( 'Spinner' ).exists() ).toBeFalsy();
});


test( 'should correctly render form inside Login', () => {
    const wrapper = shallow(
        <Login
            startLogin={ () => {} }
            auth={ { isLoading: false } }
        />  
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( 'form' ).exists() ).toBeTruthy();
});

test( 'should correctly render error object if no data provided', () => {
    const wrapper = shallow(
        <Login 
            startLogin={ () => {} }
            auth={ { isLoading: false } }
        />
    );

    wrapper.find( 'form' ).simulate( 'submit', {
        preventDefault: () => {}
    });

    expect( wrapper.state( 'errors' ).email.length ).toBeGreaterThan( 0 );
    expect( wrapper.state( 'errors' ).password.length ).toBeGreaterThan( 0 );
});

test( 'should set email on input change', () => {
    const value = 'emailoo@gmailoo.com';

    const wrapper = shallow( 
        <Login 
            startLogin={ () => {} }
            auth={ { isLoading: false } }
        />
    );

    const event = { target: { name: 'email', value } };

    wrapper.find( 'TextFieldGroup' ).at( 0 ).simulate( 'change', event );

    expect( wrapper.state( 'email' ) ).toBe( value );
});

test( 'should set password on input change', () => {
    const value = 'passpass';

    const wrapper = shallow( 
        <Login 
            startLogin={ () => {} }
            auth={ { isLoading: false } }
        />
    );

    const event = { target: { name: 'password', value } };

    wrapper.find( 'TextFieldGroup' ).at( 1 ).simulate( 'change', event );

    expect( wrapper.state( 'password' ) ).toBe( value );
});

test( 'should call startLogin prop for valid form submission', () => {
    const loginData = { email: 'correct@email.com', password: 'password123456' };
    const startLogin = jest.fn();

    const wrapper = shallow(
        <Login 
            startLogin={ startLogin }
            auth={ { isLoading: false } }
        />
    );

    wrapper.setState( { email: loginData.email, password: loginData.password } );

    wrapper.find( 'form' ).simulate( 'submit', {
        preventDefault: () => {}
    });    

    expect( wrapper.state( 'errors' ) ).toEqual( {} );

    expect( startLogin ).toHaveBeenLastCalledWith( loginData );
});