import React from 'react';

import './BackdropHeader.css'

const backDrop = props => (
    <div className="backdrop" onClick={props.click}/>
);

export default backDrop;