import React from 'react';
import './Navbar.css';

const Navbar = ({ onShowResume, isVisible }) => {

  return (
    <header id="header" className={!isVisible? 'hidden' : ''}>
      <h1><a href="#banner"><span className='logo-j'>J</span><span className='logo-s'>S</span></a></h1>
      <nav id="nav">
        <a href="#one">About</a>
        <a href="#two">Projects</a>
        <a href="#three" className="nav-button">Contact</a>
        <button onClick={onShowResume} className="primary button">Resume</button>

      </nav>
    </header>
  );
};

export default Navbar;
