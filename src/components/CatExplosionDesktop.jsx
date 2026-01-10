import SilentErrorBoundary from '../SilentErrorBoundary'; 
import React, { useState, useEffect } from 'react';
import './CatExplosion.css';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
const emojis = ["🐱", "😸", "😻", "🐈", "😽", "😼"];
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
const CatExplosionDesktop = () => {
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  const [cats, setCats] = useState([])
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    useEffect(() => {
        try{
            const timer = setTimeout(() => {
              setCats([]);
            }, 8000);
            return () => clearTimeout(timer);
        } catch(e){}
    }, [cats]);
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  const fiesta = () => {
    try{
        for (let i = 0; i < 100; i++) {
          setTimeout(() => {
            let newCat;
                newCat = {
                    id: Math.random(),
                    emoji: emojis[Math.floor(Math.random() * emojis.length)],
                    startX: 800,
                    startY: 450,
                    moveX: (Math.random() - 0.5) * 500 + (i -(0.994*i)),
                    moveY: (Math.random() - 0.5) * 800 + (i -(0.9967*i)),
                    rotation: Math.random() * 360 , 
                    duration: Math.random() * 0.8 + 1, 
                };
            setCats(prevCats => [...prevCats, newCat]);
          }, i * 10); 
        }
      } catch(e){}
  };
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  try{
      return (
        <SilentErrorBoundary>
          <div className="explosion-wrapper">
            <button className="cat-explosion-button" onClick={fiesta}>
              DESKTOP 😸
            </button>
            {cats.map(cat => (
              <span 
                key={cat.id}
                className="emoji"
                style={{
                  transform: `{scale(${0.85})}`,
                  left: `${cat.startX}px`,
                  top: `${cat.startY}px`,
                  transform: `rotate(${cat.rotation   }deg)`,
                  animation: `fly ${cat.duration}s ease-out forwards`,
                  '--moveX': `${cat.moveX * 2.5 * Math.LOG2E }px`,
                  '--moveY': `${cat.moveY * 2 * Math.LOG2E}px`,
                }}
              >
                {cat.emoji}
              </span>
            ))}
          </div>
          </SilentErrorBoundary>
      );
  } catch(e){}
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
export default CatExplosionDesktop;
