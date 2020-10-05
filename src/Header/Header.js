import React from 'react';
import {Link} from 'react-router-dom';

import './Header.css'
import HeaderToggleButton from './HeaderToggleButton'

const Header = props => {
    return (
        <header className="toolba">
            <nav className="toolba__navigation">
                <div className="toolba__toggle-button">
                    <HeaderToggleButton click={props.drawerClickHandler}/>
                </div>
                <div className="toolba__logo">
                    <a><img src="https://humber.ca/cfe/sites/default/files/cfe-logo-white.png"
                                     alt="Logo"></img></a>
                </div>
                <div className="spacer"/>
                <div className="toolba_navigation-items">
                    <ul>
                        <li>
                            <a href="/#">Our Story</a>
                        </li>
                        <li>
                            <a href="/#">Programs</a>
                        </li>
                        <li>
                            <a href="/#">Events</a>
                        </li>
                        <li>
                            <a href="/#">Membership</a>
                        </li>
                        <li>
                            <a href="/#">Room Booking</a>
                        </li>
                        <li>
                            <a href="/#">Mentorship & Support</a>
                        </li>
                        <li>
                            <a href="/#">Resources</a>
                        </li>
                        <Link to="/adminHome">
                            <li>
                                Admin Home
                            </li>
                        </Link>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;