import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Reusable hook to manage carousel or slideshow logic
 * @param {number} totalItems - total number of items in the carousel
 * @param {boolean} autoplay - carousel autoplay
 * @param {number} delay - autoplay delay
 * @returns {object} - { currentIndex, setCurrentIndex, goToNext, goToPrevious, isPaused, setIsPaused }
 */

export function useCarousel(totalItems, autoplay = false, delay = 3000) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(!autoplay);
    const timeoutRef = useRef(null);

    const resetTimeout = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, []);

    useEffect(() => {
        if (autoplay) {
            resetTimeout();
            if (!isPaused) {
                timeoutRef.current = setTimeout(() => {
                    setCurrentIndex(prev => (prev === totalItems - 1 ? 0 : prev + 1));
                }, delay);
            }
            return resetTimeout;
        }
    }, [currentIndex, isPaused, totalItems, delay, resetTimeout, autoplay]);

    const goToNext = useCallback(() => {
        setCurrentIndex(prev => (prev === totalItems - 1 ? 0 : prev + 1));
    }, [totalItems]);

    const goToPrevious = useCallback(() => {
        setCurrentIndex(prev => (prev === 0 ? totalItems - 1 : prev - 1));
    }, [totalItems]);
    
    return { currentIndex, setCurrentIndex, goToNext, goToPrevious, isPaused, setIsPaused };
}
