import React from 'react';
import { shallow } from 'enzyme';
import { Register } from '../../../components/auth/Register';

test( 'should render correctly Register with spinner', () => {
    const wrapper = shallow( 
         <Register 
            startRegister={ () => {} }
            auth={ { isLoading: true } }
         />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( 'Spinner' ).exists() ).toBeTruthy();
});

test( 'should render correctly Login without spinner', () => {
    const wrapper = shallow( 
        <Register 
            startRegister={ () => {} }
            auth={ { isLoading: false } }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( 'Spinner' ).exists() ).toBeFalsy();
});


test( 'should correctly render form inside Login', () => {
    const wrapper = shallow(
        <Register
            startRegister={ () => {} }
            auth={ { isLoading: false } }
        />  
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( 'form' ).exists() ).toBeTruthy();
});

test( 'should correctly render error object if no data provided', () => {
    const wrapper = shallow(
        <Register 
            startRegister={ () => {} }
            auth={ { isLoading: false } }
        />
    );

    wrapper.find( 'form' ).simulate( 'submit', {
        preventDefault: () => {}
    });

    expect( wrapper.state( 'errors' ).name.length ).toBeGreaterThan( 0 );
    expect( wrapper.state( 'errors' ).email.length ).toBeGreaterThan( 0 );
    expect( wrapper.state( 'errors' ).password.length ).toBeGreaterThan( 0 );
    expect( wrapper.state( 'errors' ).passwordConfirm.length ).toBeGreaterThan( 0 );
});

test( 'should set name on input change', () => {
    const value = 'John';

    const wrapper = shallow( 
        <Register 
            startRegister={ () => {} }
            auth={ { isLoading: false } }
        />
    );

    const event = { target: { name: 'name', value } };

    wrapper.find( 'TextFieldGroup' ).at( 0 ).simulate( 'change', event );

    expect( wrapper.state( 'name' ) ).toBe( value );
});

test( 'should set email on input change', () => {
    const value = 'emailo@gmailo.com';

    const wrapper = shallow( 
        <Register 
            startRegister={ () => {} }
            auth={ { isLoading: false } }
        />
    );

    const event = { target: { name: 'email', value } };

    wrapper.find( 'TextFieldGroup' ).at( 1 ).simulate( 'change', event );

    expect( wrapper.state( 'email' ) ).toBe( value );
});

test( 'should set password on input change', () => {
    const value = 'password15';

    const wrapper = shallow( 
        <Register 
            startRegister={ () => {} }
            auth={ { isLoading: false } }
        />
    );

    const event = { target: { name: 'password', value } };

    wrapper.find( 'TextFieldGroup' ).at( 2 ).simulate( 'change', event );

    expect( wrapper.state( 'password' ) ).toBe( value );
});

test( 'should set password confirm on input change', () => {
    const value = 'password15';

    const wrapper = shallow( 
        <Register 
            startRegister={ () => {} }
            auth={ { isLoading: false } }
        />
    );

    const event = { target: { name: 'passwordConfirm', value } };

    wrapper.find( 'TextFieldGroup' ).at( 3 ).simulate( 'change', event );

    expect( wrapper.state( 'passwordConfirm' ) ).toBe( value );
});

test( 'should call startRegister', () => {
    const registerData = { 
        name: 'John', 
        email: 'correct@email.com', 
        password: 'password123456', 
        passwordConfirm: 'password123456' 
    };

    const startRegister = jest.fn();

    const wrapper = shallow(
        <Register 
            startRegister={ startRegister }
            auth={ { isLoading: false } }
        />
    );

    wrapper.setState( {
        name: registerData.name,
        email: registerData.email, 
        password: registerData.password,
        passwordConfirm: registerData.passwordConfirm
    });

    wrapper.find( 'form' ).simulate( 'submit', {
        preventDefault: () => {}
    });    

    expect( startRegister ).toHaveBeenLastCalledWith( registerData );
});