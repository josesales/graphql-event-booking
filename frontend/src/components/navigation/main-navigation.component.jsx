import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './main-navigation.styles.css';
import AuthContext from '../../context/auth-context';

const MainNavigation = () => {

    const { authContext, logout } = useContext(AuthContext);

    return (
        <header header className="main-navigation" >
            <div className="main-navigation__logo">
                <h1>Header</h1>
            </div>

            <nav className="main-navigation__items">
                <ul>
                    {!authContext.token ?

                        (
                            <li>
                                <NavLink to="/auth">Login</NavLink>
                            </li>
                        )
                        : ''
                    }


                    <li>
                        <NavLink to="/events">Events</NavLink>
                    </li>

                    {authContext.token &&
                        (
                            <React.Fragment>
                                <li>
                                    <NavLink to="/booking">Booking</NavLink>
                                </li>

                                <li>
                                    <button onClick={logout}>Logout</button>
                                </li>
                            </React.Fragment>
                        )
                    }

                </ul>
            </nav>
        </header >
    )
}

export default MainNavigation;