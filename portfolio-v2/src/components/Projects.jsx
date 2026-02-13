import React, { useState } from 'react';
import { useCarousel } from './hooks/useCarousel';
import { projects } from '../portfolioData';
import './Projects.css';

const Projects = () => {
    const { currentIndex: projectIndex, goToNext: goToNextProject, goToPrevious: goToPreviousProject } = useCarousel(projects.length);
    const currentProject = projects[projectIndex];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const currentImageUrl = currentProject.imageUrls[currentImageIndex];

    const handleNext = () => {
        goToNextProject();
        setCurrentImageIndex(0);
    };

    const handlePrevious = () => {
        goToPreviousProject();
        setCurrentImageIndex(0);
    };

    return (
        <section id="two">
            <header className="major">
                <h2>Featured Projects</h2>
            </header>

            <div className="card-container">
                <div className="card-content" key={projectIndex}>
                    <img src={currentImageUrl} className="card-header" alt={`Screenshots of ${currentProject.title}`}/>

                    <div className="card-body">
                        <div className="image-nav">
                            {currentProject.imageUrls.map((imageUrl, index) => (
                                <button
                                    key={index}
                                    className={`nav-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentImageIndex(index)}
                                    aria-label={`View image ${index + 1} of ${currentProject.title}`}
                                >
                                    <img 
                                        src={imageUrl} 
                                        alt={`Thumbnail ${index + 1}`} 
                                        loading="lazy" 
                                    />
                                </button>
                            ))}
                        </div>
                        <h2>{currentProject.title}</h2>
                        <p>{currentProject.description}</p>
                        <div className="project-links">
                            {currentProject.repoUrl && (
                                <a 
                                    href={currentProject.repoUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    aria-label="GitHub Repository" 
                                    className="github-link"
                                >
                                    <i className="fab fa-github"></i>
                                </a>
                            )}
                            
                            {currentProject.liveUrl && currentProject.liveUrl !== "#" && (
                                <a 
                                    href={currentProject.liveUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    aria-label="Live Website" 
                                    className="live-link"
                                >
                                    <i className="fas fa-external-link-alt"></i>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="card-buttons">
                    <button onClick={handlePrevious} aria-label="Previous Project" title="Previous Project">&#10094;</button>
                    <button onClick={handleNext} aria-label="Next Project" title="Next Project">&#10095;</button>
                </div>
            </div>

            <ul className="actions">
                <li><a href="#three" className="button">Get In Touch</a></li>
            </ul>
        </section>
    );
};

export default Projects;