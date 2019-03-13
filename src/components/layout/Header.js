import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../../actions/auth';

export const Header = ( { startLogout, isAuthenticated, user } ) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__title" to="/">
                    <h1>Vietcong</h1>
                </Link>
                { isAuthenticated && (
                    <div className="controls">
                        <h3 style={ { color: 'white' } }>{ user.name }</h3>
                        <Link className="button" to="/posts/create">Add post</Link>
                        <button className="button button--link" onClick={ startLogout }>Logout</button>
                    </div>
                )};
            </div>
        </div>
    </header>
);

Header.propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
    startLogout: PropTypes.func.isRequired
};

const mapStateToProps = ( state ) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

const mapDispatchToProps = ( dispatch ) => ({
    startLogout: () => dispatch( startLogout() )
});

export default connect( mapStateToProps, mapDispatchToProps )( Header );