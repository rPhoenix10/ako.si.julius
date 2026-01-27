import React, { useState, useEffect } from 'react';
import { useCarousel } from './hooks/useCarousel';
import { projects } from '../portfolioData';
import './Projects.css';

const Projects = () => {
    const { currentIndex: projectIndex, goToNext: goToNextProject, goToPrevious: goToPreviousProject } = useCarousel(projects.length);
    const currentProject = projects[projectIndex];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        setCurrentImageIndex(0);
    }, [projectIndex]);

    const currentImageUrl = currentProject.imageUrls[currentImageIndex];

    const headerStyle = {
        backgroundImage: `url(${currentImageUrl})`
    };

    return (
        <section id="two">
            <header className="major">
                <h2>Featured Projects</h2>
            </header>

            <div className="card-container">
                <div className="card-content" key={projectIndex}>
                    <div className="card-header" style={headerStyle}></div>

                    <div className="card-body">
                        <div className="image-nav">
                            {currentProject.imageUrls.map((imageUrl, index) => (
                                <button
                                    key={index}
                                    className={`nav-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                                    style={{ backgroundImage: `url(${imageUrl})` }}
                                    onClick={() => setCurrentImageIndex(index)}
                                    aria-label={`View image ${index + 1} of ${currentProject.title}`}
                                />
                            ))}
                        </div>
                        <h2>{currentProject.title}</h2>
                        <p>{currentProject.description}</p>
                        <a 
                            href={currentProject.repoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label="GitHub Repository" 
                            className="github-link"
                        >
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                </div>

                <div className="card-buttons">
                    <button onClick={goToPreviousProject} aria-label="Previous Project" title="Previous Project">&#10094;</button>
                    <button onClick={goToNextProject} aria-label="Next Project" title="Next Project">&#10095;</button>
                </div>
            </div>

            <ul className="actions">
                <li><a href="#three" className="button">Get In Touch</a></li>
            </ul>
        </section>
    );
};

export default Projects;