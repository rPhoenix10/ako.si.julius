import React, { useState, useCallback } from 'react';
import './About.css';
import { aboutMe, aboutMeGallery } from '../portfolioData';
import { useCarousel } from './hooks/useCarousel';
import { useMediaQuery } from './hooks/useMediaQuery';
import Collapse from './Collapse';

const About = () => {
    const { currentIndex, setCurrentIndex, isPaused, setIsPaused } = useCarousel(aboutMeGallery.length, true, 3000);
    const [showControls, setShowControls] = useState(false);
    const [isContentVisible, setIsContentVisible] = useState(true);

    const isMobile = useMediaQuery('(max-width: 768px)');

    const handleToggleContent = useCallback(() => {
        setIsContentVisible(prev => !prev);
    }, []);

    const handleSetCurrentIndex = useCallback((index) => {
        setCurrentIndex(index);
    }, [setCurrentIndex]);

    const handleTogglePause = useCallback(() => {
        setIsPaused(prev => !prev);
    }, [setIsPaused]);

    return (
        <section id="one">
            <div className={`spotlight container ${!isContentVisible ? 'gallery-expanded' : ''}`}>
                <div 
                    className="image-gallery"
                    onMouseEnter={() => setShowControls(true)}
                    onMouseLeave={() => setShowControls(false)}
                >
                    <div 
                        className="main-image"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <img src={aboutMeGallery[currentIndex].src} alt={aboutMeGallery[currentIndex].label} />
                        {!isPaused && <div className="slideshow-progress"></div>}
                        <div className={`thumbnails ${showControls ? 'controls-visible' : ''}`}>
                            {aboutMeGallery.map((img, index) => (
                                <button
                                    key={index} 
                                    className={`thumbnail ${currentIndex === index ? 'active' : ''}`}
                                    onClick={() => handleSetCurrentIndex(index)}
                                    aria-label={`View image ${index + 1}: ${img.label}`}
                                >
                                    <img src={img.src} alt="" />
                                </button>
                            ))}
                        </div>
                    </div>
                     <br/>
                    <ul className="actions">
                        <li><a href="#two" className="button">See My Work</a></li>
                    </ul>
                    <button 
                        className={`autoplay-toggle ${showControls ? 'controls-visible' : ''} ${isPaused ? '' : 'active'}`}
                        onClick={handleTogglePause}
                        aria-label={isPaused ? 'Resume Autoplay' : 'Pause Autoplay'}
                    >
                        <i className={isPaused ? "fas fa-play" : "fas fa-pause"}></i>
                    </button>
                    <button 
                        className="collapse-toggle-icon" 
                        onClick={handleToggleContent}
                        aria-label={isContentVisible ? 'Expand Gallery' : 'Show Details'}
                        aria-controls="about-content"
                        aria-expanded={isContentVisible}
                    >
                        <i className={`fas ${isContentVisible ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
                    </button>               
                </div>

                <Collapse 
                    isOpen={isContentVisible} 
                    className="content-wrapper" 
                    width={isMobile ? '100%' : '500px'}
                    axis={isMobile ? 'vertical' : 'horizontal'} 
                >
                    <div id="about-content" className="content">
                        <header className="major">
                            <h2>About Me</h2>
                        </header>
                        {aboutMe.paragraphs.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </Collapse>          
            </div>
        </section>
    );
};

export default About;
