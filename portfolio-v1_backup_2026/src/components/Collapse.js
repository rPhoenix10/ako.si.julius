import React, { useRef, useEffect } from 'react';

const Collapse = ({ isOpen, children, className, width = 'auto', axis = 'horizontal' }) => {
  const contentRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (wrapper) {
      if (isOpen) {
        if (axis === 'horizontal') {
            wrapper.style.maxWidth = `${contentRef.current.scrollWidth}px`;
        } else {
            wrapper.style.maxHeight = `${contentRef.current.scrollHeight}px`;
        }
      } else {
        if (axis === 'horizontal') {
            wrapper.style.maxWidth = '0px';
        } else {
            wrapper.style.maxHeight = '0px';
        }
      }
    }
  }, [isOpen, axis]);

  return (
    <div ref={wrapperRef} className={`collapsible-wrapper ${className}`}>
      <div ref={contentRef} className="collapsible-content" style={{ width }}>
        {children}
      </div>
    </div>
  );
};

export default Collapse;

