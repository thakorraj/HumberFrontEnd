import React from 'react';
import {Link} from 'react-router-dom';
import './HeaderDrawer.css'

const sideDrawer = props => {
    let drawerClasses = 'header-drawer';
    if (props.show) {
        drawerClasses = 'header-drawer open';
    }
    return (
        <nav className={drawerClasses}>
            <ul>
                <li>
                    <a href="/">Our Story</a>
                </li>
                <li>
                    <a href="/">Programs</a>
                </li>
                <li>
                    <a href="/">Events</a>
                </li>
                <li>
                    <a href="/">Membership</a>
                </li>
                <li>
                    <a href="/">Room Booking</a>
                </li>
                <li>
                    <a href="/">Mentorship & Support</a>
                </li>
                <li>
                    <a href="/">Resources</a>
                </li>
                <Link to="/AdminHome">
                    <li>
                        Admin Home
                    </li>
                </Link>
            </ul>
        </nav>
    )
}

export default sideDrawer