import React from 'react';
import './Footer.css';

import { links } from '../portfolioData';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="footer">
            <ul className="icons">
                <li><a href={links.github} className="icon brands alt fa-github"><span className="label"></span></a></li>
                <li><a href={links.linkedin} className="icon brands alt fa-linkedin-in"><span className="label"></span></a></li>
            </ul>
            <ul className="copyright">
                <li>&copy; {currentYear} Julius Sale</li>
            </ul>
        </footer>
    );
};

export default Footer;
