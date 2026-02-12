import React, { useState, useEffect } from 'react';
import './Me.css';
import { personalInfo } from '../portfolioData';
import AIBot from './AIBot';

const Me = ({ onButtonClick }) => {
  const [nameText, setNameText] = useState('');
  const [taglineText, setTaglineText] = useState('');
  const [typingStep, setTypingStep] = useState('name'); 
  
  const fullSaleName = personalInfo.name;
  const fullTagline = personalInfo.tagline;

  useEffect(() => {
    // Type Name
    const typeName = () => {
      setNameText((prev) => {
        const i = prev.length;
        if (i < fullSaleName.length) {
          setTimeout(typeName, 50);
          return fullSaleName.substring(0, i + 1);
        } else {
          setTypingStep('tagline');
          return prev;
        }
      });
    };

    // Type Tagline
    const typeTagline = () => {
        setTaglineText((prev) => {
            const j = prev.length;
            if (j < fullTagline.length) {
                setTimeout(typeTagline, 45);
                return fullTagline.substring(0, j + 1);
            } else {
                setTypingStep('done');
                return prev;
            }
        });
    };

    // Trigger typing based on step
    if (typingStep === 'name' && nameText === '') {
        setTimeout(typeName, 500); 
    } else if (typingStep === 'tagline' && taglineText === '') {
        typeTagline();
    }

  }, [typingStep, fullSaleName, fullTagline, nameText, taglineText]);

  return (
    <div className="me-container" id="me">
      <div className="content-wrapper">
        
        {/* LEFT SIDE: Text & Typing Effect */}
        <div className="intro-text">
            <h2>
              <span className="text-highlight">{nameText}</span>
              {typingStep === 'name' && <span className="typing-cursor"></span>}
            </h2>
            
            <p className="tagline-text">
              <span className="text-highlight">
                {taglineText.split('|').map((part, index, array) => (
                  <React.Fragment key={index}>
                    {part}
                    {index < array.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </span>
              {(typingStep === 'tagline' || typingStep === 'done') && <span className="typing-cursor"></span>}
            </p>

            {typingStep === 'done' && (
            <div className="actions fade-in">
                <a href="#one" className="button primary-btn" onClick={onButtonClick}>About Me</a>
            </div>
            )}
        </div>

        {/* RIGHT SIDE: The AI Terminal */}
        <div className="terminal-wrapper">
            <AIBot />
        </div>

      </div>
    </div>
  );
};

export default Me;
