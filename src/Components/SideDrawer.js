import React from 'react';
import {Link} from 'react-router-dom';
import './SideDrawer.css'

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if (props.show) {
        drawerClasses = 'side-drawer open';
    }
    return (
        <nav className={drawerClasses}>
            <ul>
                <Link to="/AdminHome" onClick={props.click}>
                    <li>
                        Dashboard
                    </li>
                </Link>
                <Link to="/AdminHome" onClick={props.click}>
                    <li>
                        Room Requests
                    </li>
                </Link>
                <Link to="/userHome" onClick={props.click}>
                    Users
                </Link>
                <Link to="/roomHome" onClick={props.click}>
                    <li>
                        <a href="/">Rooms</a>
                    </li>
                </Link>
                <li>
                    <a href="/">Sign Out</a>
                </li>
            </ul>
        </nav>
    )
};

export default sideDrawer