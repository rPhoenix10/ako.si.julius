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
    let timeout;

    if (typingStep === 'name') {
      if (nameText.length < fullSaleName.length) {
        // Type Name
        timeout = setTimeout(() => {
          setNameText(fullSaleName.substring(0, nameText.length + 1));
        }, 5); 
      } else {
        // Pause before starting the tagline
        timeout = setTimeout(() => setTypingStep('tagline'), 500); 
      }
    } 
    else if (typingStep === 'tagline') {
      if (taglineText.length < fullTagline.length) {
        // Type Tagline
        timeout = setTimeout(() => {
          setTaglineText(fullTagline.substring(0, taglineText.length + 1));
        }, 30);
      } else {
        // Finished typing
        timeout = setTimeout(() => {
            setTypingStep('done');
        }, 0); 
      }
    }

    return () => clearTimeout(timeout);

  }, [typingStep, nameText, taglineText, fullSaleName, fullTagline]);

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
