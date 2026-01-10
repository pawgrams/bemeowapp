import SilentErrorBoundary from '../SilentErrorBoundary'; 
import React, { useState, useEffect } from 'react';
import './CatExplosion.css';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
const emojis = ["🐱", "😸", "😻", "🐈", "😽", "😼"];
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
const CatExplosionMobile = () => {
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
                        startX: 750,
                        startY: 1050,
                        moveX: (Math.random() - 0.5) * 500 + (i -(0.994*i)),
                        moveY: (Math.random() - 0.5) * 908 + (i -(0.9967*i)),
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
                MOBILE 😸
              </button>
              {cats.map(cat => (
                <span 
                  key={cat.id}
                  className="emoji"
                  style={{
                    transform: `{scale(${0.25})}`,
                    left: `${cat.startX + 200}px`,
                    top: `${cat.startY}px`,
                    transform: `rotate(${cat.rotation   }deg)`,
                    animation: `fly ${cat.duration}s ease-out forwards`,
                    '--moveX': `${cat.moveX * 0.7 * Math.LOG2E }px`,
                    '--moveY': `${cat.moveY * 1.7 * Math.LOG2E}px`,
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
export default CatExplosionMobile;
