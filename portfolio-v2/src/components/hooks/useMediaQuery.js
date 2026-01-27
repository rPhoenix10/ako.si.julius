import { useState, useEffect } from 'react';

/**
 * Hook for tracking media query
 * @param {string} query - watch max-width: 768px or other mobile screen sizes
 * @returns {boolean} - True if the query is currently matched, false otherwise.
 */
export function useMediaQuery(query) {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
        const media = window.matchMedia(query);
        
        const listener = () => {
            setMatches(media.matches);
        };
        
        media.addEventListener('change', listener);
        
        return () => media.removeEventListener('change', listener);
    }, [query]);

    return matches;
}
