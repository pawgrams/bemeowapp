import ErrorBoundary from '../ErrorBoundary'; 
import React from 'react';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
interface TermsWindowProps {
  onClose: () => void;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const TermsWindow: React.FC<TermsWindowProps> = ({ onClose }) => {
try{
    return (
      <ErrorBoundary>
          <div className="terms-wrapper">
              <div className="faq-close-button" onClick={onClose}>
                  <span className="faq-close-button-span">X</span>
              </div>
            <div className="terms-header">
              <h2 className="terms-title">Terms</h2>
              <hr></hr>
              </div>
          </div>
      </ErrorBoundary>
    );
  }catch(e){}
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default TermsWindow;
