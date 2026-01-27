import { links } from '../portfolioData';
import { useMediaQuery } from './hooks/useMediaQuery';
import './Resume.css';

const Resume = ({ onClose }) => {
    const isMobile = useMediaQuery('(max-width: 1024px)');

    return (
        <div className="resume-overlay" onClick={onClose}>
            <article className="resume-article" onClick={(e) => e.stopPropagation()}>
                <div className="resume-header">
                    {isMobile ? (
                        <a 
                            href={links.resumePdf} 
                            download="Julius-Sale-Resume.pdf"
                            className="resume-title-link"
                        >
                            RESUME
                            <img 
                                alt="Download resume" 
                                className="icon-image" 
                                loading="lazy" 
                                src="https://files.svgcdn.io/carbon/generate-pdf.svg"
                            />
                        </a>
                    ) : (
                        <h2 className="resume-title">RESUME</h2>
                    )}
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>

                {isMobile ? (
                    <div className="resume-images-mobile">
                        {links.resumePng.map((src, index) => (
                            <img 
                                key={index} 
                                src={src} 
                                alt={`My Resume Page ${index + 1}`} 
                                className="resume-image" 
                            />
                        ))}
                    </div>
                ) : (
                    <iframe
                      src={links.resumePdf}
                      className="resume-embed"
                      allow="fullscreen"
                      title="Julius Sale's Resume"
                  ></iframe>
                )}
            </article>
        </div>
    );
};

export default Resume;
