import React from 'react';

import './HeaderToggleButton.css'

const HeaderToggleButton = props => (
    <button className="toggle-but" onClick={props.click}>
        <div className="toggle-but__line"/>
        <div className="toggle-but__line"/>
        <div className="toggle-but__line"/>
    </button>
);

export default HeaderToggleButton