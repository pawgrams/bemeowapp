import SilentErrorBoundary from '../SilentErrorBoundary'; 
import React, { useState, useEffect } from 'react';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const Slideshow = () => {
  const images = [
    '/backgrounds/cats/universe/0004.png',
    '/backgrounds/cats/universe/0008.png',
    '/backgrounds/cats/universe/0005.png',
    '/backgrounds/cats/universe/0009.png',
    '/backgrounds/cats/universe/0007.png',
    '/backgrounds/cats/misc/0002.webp',
    '/backgrounds/cats/universe/0003.png',
  ];
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  useEffect(() => {
    try{
      const interval = setInterval(() => {
        setFade(false);
        const nextIndex = (currentIndex + 1) % images.length;
        const img = new Image();
        img.src = images[nextIndex];  
        img.onload = () => {
          setTimeout(() => {
            setCurrentIndex(nextIndex);
            setFade(true);
          }, 2000);
        };
      }, 8000);
    return () => clearInterval(interval);
  }catch(e){return;}
  }, [currentIndex, images.length]);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
try{
  return (
    <SilentErrorBoundary>
      <div className = "slide-show"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(${images[currentIndex]})`,
            filter: 'contrast(130%)',
            opacity: fade ? 1 : 0,
            transition: 'opacity 2s ease-in-out',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          }}
        ></div>
        <div style={{ color: 'white', textAlign: 'center', paddingTop: '20%', position: 'relative', zIndex: 1 }}>
        </div>
      </div>
    </SilentErrorBoundary>
  );
}catch(e){}
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default Slideshow;
