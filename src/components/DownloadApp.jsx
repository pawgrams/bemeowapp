import SilentErrorBoundary from '../SilentErrorBoundary'; 
import React, { useState, useEffect } from 'react';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function DownloadApp() {
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  useEffect(() => {
    try{
        const handler = (e) => {
          e.preventDefault();
          setDeferredPrompt(e);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => {
          window.removeEventListener('beforeinstallprompt', handler);
        };
    } catch(e){}
  }, []);
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  const handleAddToHomeScreen = () => {
    try{
        if (deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then((choiceResult) => {
            setDeferredPrompt(null);
          });
        }
    } catch(e){}
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  try{
      return (
        <SilentErrorBoundary>
          <button
            className='appdownload-button'
            onClick={handleAddToHomeScreen}
            disabled={!deferredPrompt}
            style={{
              cursor: deferredPrompt ? 'pointer' : 'not-allowed',
            }}
          >
            <div className="download-icon-container"></div>
            Download App
          </button>
        </SilentErrorBoundary>
      );
  } catch(e){}
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
export default DownloadApp;
