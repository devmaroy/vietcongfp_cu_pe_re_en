import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../../actions/auth';

export class Header extends React.Component {
    state = {
        isOpen: false
    }

    showMenu = ( e ) => {
        this.setState( ( prevState ) => ( { isOpen: !prevState.isOpen } ) );
    }

    render() {
        const { startLogout, isAuthenticated, user } = this.props;

        return (
            <div className="content-container">
                <header className="header">
                    <div className="header-content">
                        <button onClick={ this.showMenu } className="hamburger-menu">
                            <span className={ classnames( 'hamburger-menu__icon', { 'is-open': this.state.isOpen } ) }></span>
                        </button> 
            
                        <nav className="header-nav">
                            <ul className={ classnames( 'header-nav__list list-unstyled', { 'is-open': this.state.isOpen } ) }>
                                <li className="header-nav__list-item">
                                    <NavLink
                                        to="/"
                                        className="header-nav__item"
                                        activeClassName="header-nav__item--active"
                                        exact={ true }
                                    >
                                        Homepage
                                    </NavLink>
                                </li>
                                <li className="header-nav__list-item">
                                    <NavLink
                                        to="/about"
                                        className="header-nav__item"
                                        activeClassName="header-nav__item--active"
                                    >
                                        About vietcong
                                    </NavLink>
                                </li>
                                <li className="header-nav__list-item">
                                    <NavLink
                                        to="/clans"
                                        className="header-nav__item"
                                        activeClassName="header-nav__item--active"
                                    >
                                        Clans
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>                   
                    {
                        isAuthenticated && (
                            <div className="header-meta">
                                <div className="header-controls">
                                    <h3 className="header-controls__title">{ user.name }</h3>
                                    <Link
                                        to="/posts/create"
                                        className="button add-post"
                                    >
                                        Add post
                                    </Link>
                                    <Link
                                        to="/clans/create"
                                        className="button add-clan"
                                    >
                                        Add clan
                                    </Link>
                                    <button 
                                        className="button button--link logout-link"
                                        onClick={ startLogout }
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )
                    } 
                </header>
            </div>
        );
    }
}

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