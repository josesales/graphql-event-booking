import React from 'react';
import { NavLink } from 'react-router-dom';
import './main-navigation.styles.css';

const MainNavigation = props => (
    <header className="main-navigation">
        <div className="main-navigation__logo">
            <h1>Header</h1>
        </div>

        <nav className="main-navigation__items">
            <ul>
                <li>
                    <NavLink to="/auth">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/events">Events</NavLink>
                </li>
                <li>
                    <NavLink to="/booking">Booking</NavLink>
                </li>
            </ul>
        </nav>
    </header>
)

export default MainNavigation;