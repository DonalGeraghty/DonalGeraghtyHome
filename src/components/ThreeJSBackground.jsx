import React, { useRef, useEffect, useState } from 'react';

const ThreeJSBackground = () => {
  const [isThreeJSLoaded, setIsThreeJSLoaded] = useState(false);
  const mountRef = useRef(null);

  useEffect(() => {
    // Check if Three.js is available
    const checkThreeJS = async () => {
      try {
        const THREE = await import('three');
        setIsThreeJSLoaded(true);
        // Don't initialize Three.js - just use CSS fallback
        setIsThreeJSLoaded(false);
      } catch (error) {
        console.log('Three.js not available, using CSS fallback');
        setIsThreeJSLoaded(false);
      }
    };

    checkThreeJS();
  }, []);

  // CSS fallback animation (this includes the Donal square object styling)
  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)
        `,
        animation: 'gradientShift 20s ease-in-out infinite'
      }}
    />
  );
};

export default ThreeJSBackground;
