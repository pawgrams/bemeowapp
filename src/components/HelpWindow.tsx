import ErrorBoundary from '../ErrorBoundary'; 
import React, { useState } from 'react';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
interface HelpWindowProps {
  onClose: () => void;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
const HelpWindow: React.FC<HelpWindowProps> = ({ onClose }) => {

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const helpData = [
    { question: "I can't connect my wallet to the app.", 
        answer: `Not all wallets run the same technical standards. Depending on your device, operating System, browser and software versions, there may be differences in compatibility. 
        
        We found that Solflare wallet works most seamlessly in almost all technical environments.` },

    { question: "My wallet is not supported.", 
      answer: `In case you don't want to use another wallet, you can also participate in the ICO by sending SOL to our official ICO wallet in the backend. 

      The official ICO wallet is:
      HoDLKSmpjt3BFwTSc2S4vkYcndrpB798bdSPoA3dn8WB

      We track everything on chain. Please note, that if you cannot connect to the app, you might not be able to seize or see any referral earnings and stats in our app.

      Please do not send directly from a centralized exchange! Centralized exchanges often route user transfers through auxilery wallets, which means that your tokens might be lost when automatically we send them to such an aux wallet. 
      
      Also in case such an exchange switches your address, you might not be able to access the vested tokens` },
  
    { question: "I have another problem and need support.", 
      answer: "You can also reach out to one of the admins in our Telegram Community: https://t.me/beatsofmeow." },

];

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  const toggleAnswer = (index: number) => {
    try{
      setOpenIndex(openIndex === index ? null : index);
  } catch(e){}
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  try{
      return (
        <ErrorBoundary>
          <div className="help-wrapper">
            <div className="faq-close-button" onClick={onClose}>
              <span className="faq-close-button-span">X</span>
            </div>
            <div className="faq-header">
              <h2 className="faq-title">Help</h2>
                  <hr></hr>
              <div className="faq-content">
                {helpData.map((item, index) => (
                  <div key={index}>
                    <div className="faq-toggle-and-question-div" onClick={() => toggleAnswer(index)}>
                      <span className="faq-question-toggle">{openIndex === index ? '-' : '+'} </span>
                      <span className="faq-question">{item.question}</span>
                    </div>
                    {openIndex === index && (
                      <div>
                        <span className="faq-answer"><div>
                    {item.answer.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </div></span>
                      </div>
                    )}
                    <hr></hr>
                    
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ErrorBoundary>
      );
  } catch(e){}
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
export default HelpWindow;
