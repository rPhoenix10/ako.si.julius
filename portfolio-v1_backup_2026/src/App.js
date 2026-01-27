import React, { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Me from './components/Me';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Resume from './components/Resume';
import GithubRepos from './components/GitHubRepos';

function App() {
  const [isResumeVisible, setIsResumeVisible] = useState(false);

  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsNavVisible(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (e) => {
        if (e.clientY < 60) {
            setIsNavVisible(true);
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastScrollY]);

  const showNavbar = () => {
    setIsNavVisible(true);
  };

  return (
    <div id="page-wrapper">
      <Navbar onShowResume={() => setIsResumeVisible(true)} isVisible={isNavVisible} />
      <Me onButtonClick={showNavbar} />
      <About onButtonClick={showNavbar} />
      <Projects onButtonClick={showNavbar} />
      <GithubRepos />
      <Contact />
      <Footer />
      {isResumeVisible && <Resume onClose={() => setIsResumeVisible(false)} />}
    </div>
  );
}

export default App;
