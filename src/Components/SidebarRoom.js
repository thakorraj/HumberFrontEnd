import React from 'react';
import DrawerToggleButton from "./DrawerToggleButton";
import {Link} from 'react-router-dom';

import './Toolbar.css'

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar__navigation">
            <div className="toolbar__toggle-button">
                <DrawerToggleButton click={props.drawerClickHandler}/>
            </div>
            <div className="toolbar__logo">
                <a href="/"><img src="https://humber.ca/cfe/sites/default/files/cfe-logo-white.png"
                                 alt="Logo"></img></a>
            </div>
            <div className="spacer"/>
            <div className="toolbar_navigation-items">
                <ul>
                    <Link to="/AddRoom" onClick={props.click}>
                        <li>
                            Add Room
                        </li>
                    </Link>
                    <li>
                        <a href="/">Sign Out</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
);

export default toolbar