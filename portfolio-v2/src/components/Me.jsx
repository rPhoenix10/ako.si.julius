import React, { useState, useEffect } from 'react';
import './Me.css';
import { personalInfo, aboutMeGallery } from '../portfolioData';

const Me = ({ onButtonClick }) => {
  const [nameText, setNameText] = useState('');
  const [taglineText, setTaglineText] = useState('');
  const [typingStep, setTypingStep] = useState('name'); 
  
  const fullSaleName = personalInfo.name
  const fullTagline = personalInfo.tagline;

  useEffect(() => {
    let i = 0;
    const typeName = () => {
      if (i < fullSaleName.length) {
        setNameText(fullSaleName.substring(0, i + 1));
        i++;
        setTimeout(typeName, 50);
      } else {
        setTypingStep('tagline');
      }
    };

    let j = 0;
    const typeTagline = () => {
        if (j < fullTagline.length) {
            setTaglineText(fullTagline.substring(0, j + 1));
            j++;
            setTimeout(typeTagline, 50);
        } else {
            setTypingStep('done');
        }
    };

    if (typingStep === 'name') {
        typeName();
    } else if (typingStep === 'tagline') {
        typeTagline();
    }

  }, [typingStep, fullSaleName, fullTagline]);

  return (
    <section id="banner" style={{ backgroundImage: `url(${aboutMeGallery[0].src})` }}>
      <div className="inner">
        <h2>
          <span className="text-highlight">{nameText}</span>
          {typingStep === 'name' && <span className="typing-cursor"></span>}
        </h2>
        <p>
          <span className='text-highlight'>
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
        <ul className="actions special">
            <li><a href="#one" className="button" onClick={onButtonClick}>About Me</a></li>
        </ul>
      )}
      </div>
    </section>
  );
};

export default Me;
