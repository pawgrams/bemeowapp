import SilentErrorBoundary from '../SilentErrorBoundary'; 
import React, { useState, useEffect } from 'react';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const ShopGrid = () => {
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const [showSpotify, setShowSpotify] = useState(true);
  const [showApple, setShowApple] = useState(true);
  const [showShazam, setShowShazam] = useState(true);
  const [showTidal, setShowTidal] = useState(true);
  const [showBeatport, setShowBeatport] = useState(true);
  const [showYoutube, setShowYoutube] = useState(true);
  const [showAmazon, setShowAmazon] = useState(true);
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const [isFadingSpotify, setIsFadingSpotify] = useState(false);
  const [isFadingApple, setIsFadingApple] = useState(false);
  const [isFadingShazam, setIsFadingShazam] = useState(false);
  const [isFadingTidal, setIsFadingTidal] = useState(false);
  const [isFadingBeatport, setIsFadingBeatport] = useState(false);
  const [isFadingYoutube, setIsFadingYoutube] = useState(false);
  const [isFadingAmazon, setIsFadingAmazon] = useState(false);
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  useEffect(() => {
    try{
      const interval = setInterval(() => {
        setIsFadingSpotify(true); 
        setTimeout(() => {
          setShowSpotify((prev) => !prev); 
        }, 2000);
        setTimeout(() => {
          setIsFadingSpotify(false); 
        }, 2100);
      }, 8000);
      return () => clearInterval(interval);
    }catch(e){}
  }, []);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  useEffect(() => {
    try{
      const interval = setInterval(() => {
        setIsFadingApple(true); 
        setTimeout(() => {
          setShowApple((prev) => !prev); 
        }, 2000);
        setTimeout(() => {
          setIsFadingApple(false); 
        }, 2100);
      }, 8000);
      return () => clearInterval(interval);
    }catch(e){}
  }, []);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  useEffect(() => {
    try{
      const interval = setInterval(() => {
        setIsFadingShazam(true); 
        setTimeout(() => {
          setShowShazam((prev) => !prev); 
        }, 2000);
        setTimeout(() => {
          setIsFadingShazam(false); 
        }, 2100);
      }, 8000);
      return () => clearInterval(interval);
    }catch(e){}
  }, []);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  useEffect(() => {
    try{
      const interval = setInterval(() => {
        setIsFadingTidal(true); 
        setTimeout(() => {
          setShowTidal((prev) => !prev); 
        }, 2000);
        setTimeout(() => {
          setIsFadingTidal(false); 
        }, 2100);
      }, 8000);
      return () => clearInterval(interval);
    }catch(e){}
  }, []);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  useEffect(() => {
    try{
      const interval = setInterval(() => {
        setIsFadingBeatport(true); 
        setTimeout(() => {
          setShowBeatport((prev) => !prev); 
        }, 2000);
        setTimeout(() => {
          setIsFadingBeatport(false); 
        }, 2100);
      }, 8000);
      return () => clearInterval(interval);
    }catch(e){}
  }, []);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  useEffect(() => {
    try{
      const interval = setInterval(() => {
        setIsFadingYoutube(true); 
        setTimeout(() => {
          setShowYoutube((prev) => !prev); 
        }, 2000);
        setTimeout(() => {
          setIsFadingYoutube(false); 
        }, 2100);
      }, 8000);
      return () => clearInterval(interval);
    }catch(e){}
  }, []);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  useEffect(() => {
    try{
      const interval = setInterval(() => {
        setIsFadingAmazon(true); 
        setTimeout(() => {
          setShowAmazon((prev) => !prev);
        }, 2000);
        setTimeout(() => {
          setIsFadingAmazon(false); 
        }, 2100);
      }, 8000);
      return () => clearInterval(interval);
    }catch(e){}
  }, []);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const fadeStyle = (isFading) => ({
    transition: 'opacity 2s ease-in-out', 
    opacity: isFading ? 0 : 1, 
  });
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
try{
  return (
    <SilentErrorBoundary>
      <div className="grid-wrapper" style={{ color: 'white', right: '-200px', scale: '0.9' }}>
        <div className="image-grid-header">
          <div className="space2"></div>
          <div className="image-grid">
            <span 
              alt="soon-on" 
              className="grid-image"
              style={{ color: 'white', transform: 'translate(14px, 20px)', scale: '0.9', fontSize: '18px', fontWeight: '650', opacity: '30%' }}
            >
              soon on ...
            </span>


            <div style={fadeStyle(isFadingSpotify)}>
              {showSpotify ? (
                <a href="https://open.spotify.com" target="_blank">
                  <img 
                    src="./shops/spotify.png" 
                    alt="spotify" 
                    className="grid-image" 
                    style={{ transform: 'translateX(-9px)' }}
                  />
                </a>
              ) : (
                <a href="https://raydium.io/" target="_blank">
                  <img 
                    src="./dexes/raydium.png" 
                    alt="raydium" 
                    className="grid-image"  
                    style={{ transform: 'translate(10px, 0px)', scale: '1.1', filter: 'invert(100%)' }}
                  />
                </a>
              )}
            </div>


            <div style={fadeStyle(isFadingApple)}>
              {showApple ? (
                <a href="https://music.apple.com" target="_blank">
                  <img 
                    src="./shops/apple.png" 
                    alt="apple music" 
                    className="grid-image" 
                    style={{ transform: 'translateX(2px)', scale: '0.96' }}
                  />
                </a>
              ) : (
                <a href="https://jup.ag/" target="_blank">
                  <img 
                    src="./dexes/jupiter.png" 
                    alt="jupiter" 
                    className="grid-image"  
                    style={{ transform: 'translate(2px, 0px)', scale: '1.07', filter: 'invert(100%)' }}
                  />
                </a>
              )}
            </div>


            <div style={fadeStyle(isFadingShazam)}>
              {showShazam ? (
                <a href="https://www.shazam.com/" target="_blank">
                  <img 
                    src="./shops/shazaam.png" 
                    alt="shazaam" 
                    className="grid-image" 
                    style={{ transform: 'translateX(2px)' }}
                  />
                </a>
              ) : (
                <a href="https://coinmarketcap.com/" target="_blank">
                  <img 
                    src="./dexes/coinmarketcap.png" 
                    alt="coinmarketcap" 
                    className="grid-image" 
                    style={{ transform: 'translate(10px, 0px)', scale: '1.08', filter: 'invert(100%)' }}
                  />
                </a>
              )}
            </div>


            <div style={fadeStyle(isFadingTidal)}>
              {showTidal ? (
                <a href="https://tidal.com/" target="_blank">
                  <img 
                    src="./shops/tidal.png" 
                    alt="tidal" 
                    className="grid-image"  
                    style={{ transform: 'translateX(-9px)', scale: '0.90' }}
                  />
                </a>
              ) : (
                <a href="https://www.coingecko.com" target="_blank">
                  <img 
                    src="./dexes/coingecko.png" 
                    alt="coingecko" 
                    className="grid-image" 
                    style={{ transform: 'translate(-10px, 0px)', scale: '0.95', filter: 'invert(100%)' }}
                  />
                </a>
              )}
            </div>

  
            <div style={fadeStyle(isFadingBeatport)}>
              {showBeatport ? (
                <a href="https://www.beatport.com/" target="_blank">
                  <img 
                    src="./shops/beatport.png" 
                    alt="beatport" 
                    className="grid-image" 
                    style={{ transform: 'translateX(5px)' }}
                  />
                </a>
              ) : (
                <a href="https://dexscreener.com/" target="_blank">
                  <img 
                    src="./dexes/dexscreener.png" 
                    alt="dexscreener" 
                    className="grid-image"  
                    style={{ transform: 'translate(-3px, 0px)', scale: '1.05', filter: 'invert(100%)' }}
                  />
                </a>
              )}
            </div>


            <div style={fadeStyle(isFadingYoutube)}>
              {showYoutube ? (
                <a href="https://music.youtube.com/" target="_blank">
                  <img 
                    src="./shops/youtube.png" 
                    alt="youtube" 
                    className="grid-image" 
                    style={{ transform: 'translateX(-5px)', scale: '0.97' }}
                  />
                </a>
              ) : (
                <a href="https://birdeye.so/" target="_blank">
                  <img 
                    src="./dexes/birdeye.png" 
                    alt="birdeye" 
                    className="grid-image" 
                    style={{ transform: 'translate(1px, 0px)', scale: '1.13', filter: 'invert(100%)' }}
                  />
                </a>
              )}
            </div>


            <div style={fadeStyle(isFadingAmazon)}>
              {showAmazon ? (
                <a href="https://music.amazon.de" target="_blank">
                  <img 
                    src="./shops/amazon.png" 
                    alt="amazon" 
                    className="grid-image" 
                    style={{ transform: 'translateX(10px)', scale: '0.95' }}
                  />
                </a>
              ) : (
                <a href="https://moontok.io/" target="_blank">
                  <img 
                    src="./dexes/moontok.png" 
                    alt="moontok" 
                    className="grid-image" 
                    style={{ transform: 'translate(0px, 0px)', scale: '01.07', filter: 'invert(100%)' }}
                  />
                </a>
              )}
            </div>


            <span className="grid-image" style={{ color: 'white', transform: 'translateX(2px)', scale: '0.9', fontSize: '18px', fontWeight: '650', opacity: '30%'   }}>
              ... and many more
            </span>

          </div>
        </div>
      </div>
    </SilentErrorBoundary>
  );
}catch(e){}
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default ShopGrid;
