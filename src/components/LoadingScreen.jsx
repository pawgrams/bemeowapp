import ErrorBoundary from '../ErrorBoundary'; 
import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  try{
    return (
      <ErrorBoundary>
        <div className={`loading-screen`}>
            <div className="landscape-warning">
              <table>
                  <tbody>
                  <tr><th><span>Mobile App currently only available in portrait format.</span></th></tr>
                  <tr><th><span style={{color: '#FFE419'}}>⬆️ Please use your device vertically ⬆️</span></th></tr>
                </tbody>
              </table>
            </div>
            <div className="loading-wrapper">
              <div className="loader2">  </div>
              <div className="loader1">  </div>  
              <div className="spinner"></div>
                <div>
                  <div className="loading-logo"></div>
                  <div className="bemeow-font"></div>
                  <div className="records-font"></div>
                </div>
            </div>
          </div>
      </ErrorBoundary>
    );
  } catch(e){}
};
export default LoadingScreen;
