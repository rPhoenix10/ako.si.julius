import React, { useRef, useEffect } from 'react';

const Collapse = ({ isOpen, children, className, width = 'auto', axis = 'horizontal' }) => {
  const contentRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    let timer;

    if (wrapper && content) {
      if (isOpen) {
        if (axis === 'horizontal') {
            wrapper.style.maxWidth = `${content.scrollWidth}px`;
        } else {
            wrapper.style.maxHeight = `${content.scrollHeight}px`;
        }

        timer = setTimeout(() => {
            if (axis === 'horizontal') {
                wrapper.style.maxWidth = width; 
            } else {
                wrapper.style.maxHeight = 'none';
            }
        }, 500);

      } else {
        // 3. Animate closed
        if (axis === 'horizontal') {
            wrapper.style.maxWidth = `${wrapper.scrollWidth}px`;
            void wrapper.offsetHeight;
            wrapper.style.maxWidth = '0px';
        } else {
            wrapper.style.maxHeight = `${wrapper.scrollHeight}px`;
            void wrapper.offsetHeight;
            wrapper.style.maxHeight = '0px';
        }
      }
    }

    return () => clearTimeout(timer); 
  }, [isOpen, axis, width]); 

  return (
    <div ref={wrapperRef} className={`collapsible-wrapper ${className}`}>
      <div ref={contentRef} className="collapsible-content" style={{ width, maxWidth: '100%' }}>
        {children}
      </div>
    </div>
  );
};

export default Collapse;
