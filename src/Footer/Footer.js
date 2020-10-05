import React from 'react';
import {SocialIcon} from 'react-social-icons';

import './Footer.css'

const Footer = props => {
    return (
        <footer className="footbar">
            <nav className="footba__navigation">
                <div className="social_icon">
                    <SocialIcon url="http://twitter.com/"/>
                    <SocialIcon url="http://facebook.com/"/>
                    <SocialIcon url="http://instagram.com/"/>
                </div>
                <div className="space"/>
                <div className="footba_navigation-items">
                    <ul>
                        <li>
                            <a href="/">Privacy policy</a>
                        </li>
                        <li>
                            <a href="/">Terms of Use</a>
                        </li>
                        <li>
                            <a href="/">Code of Syudent Conduct</a>
                        </li>
                        <li>
                            <a href="/">Request For Alternate Format</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;