import SilentErrorBoundary from '../SilentErrorBoundary'; 
import React, { useState, useEffect } from 'react';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function DownloadAppListItem() {
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
        {
          deferredPrompt? 
            <button
            className='appdownload-list-item'
            onClick={handleAddToHomeScreen}
            disabled={!deferredPrompt}
          >
            Download App
          </button>
        : ""
        }
        </SilentErrorBoundary>
      );
  } catch(e){}
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
export default DownloadAppListItem;
