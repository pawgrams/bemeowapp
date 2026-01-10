import ErrorBoundary from '../ErrorBoundary'; 
import React, { useState } from 'react';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
interface FAQWindowProps {
  onClose: () => void;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
const FAQWindow: React.FC<FAQWindowProps> = ({ onClose }) => {
  
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = [
    { question: "What is BeMeow?", 
        answer: "BeMeow Records (Beats of Meow) is the very first memeable Web3 Music Label in the World." },

    { question: "What problem does BeMeow solve?", 
        answer: "For over 20 years (since MP3 files were invented), Artist have been paid only worse. With BeMeow, Artists can finally make a living from their music again." },
    
    { question: "How does BeMeow solve this problem?", 
        answer: "BeMeow launches a Memecoin for every song release. From the trading BeMeow pays Artists 1% of the trading trading volume." },

    { question: "How do you link music with a token?", 
        answer: "We upload the full song and metadata on the Solana and Arweave blockchain, plus the metadata as ordinal inscription on the Bitcoin blockchain. Links and pointers to these data will be stored inside the mint account of the tradeable token on Solana." },
    
    { question: "What is an ICO?", 
        answer: "An Initial Coin Offering (ICO) is a type of fund raising using cryptocurrencies. Investors can buy at lower prices before the coin is even tradeable on the open market." },
    
    { question: "How can I buy $BEME?", 
        answer: "You need a cryptocurrency wallet supporting the Solana blockchain (as listed under 'Select Wallet'). We found Solflare Wallet works seamlessly in almost all environments. You also need one of the crypto assets in the list, such as Solana or USDC." },
    
    { question: "How can I get a crypto asset to buy $BEME?", 
        answer: "On a centralized exchange (such as Binance or Coinbase), you can buy them using fiat currency, e.g. USD, EUR or other legal tenders. Alternatively you can use so called Fiat OnRamps, if supported in your jurisdiction." },
    
    { question: "With which cryptocurrencies can I buy $BEME in the ICO?", 
        answer: "We support SOL, USDC, USDT, BINK, WIF, JUP and RAY. Important: Only on the Solana Blockchain. If you want to use assets running on another Blockchain, you can use the Bridge Function in our App to switch an asset from any of the most common other smart contract compatible blockchains over to Solana the blockchain" },

    { question: "How can I buy using a crypto asset from the list?", 
        answer: "You can send the crypto asset from the centralized exchange to your wallet. Then you can connect your wallet here and buy $BEME with your desired amount. Alternatively you can use the Swap or Bridge function in our App to use one the supported assets before buying $BEME with it." },
    
    { question: "Why can't I get all my coins right now when I buy?", 
        answer: "Everyone who has the coin can open a liquidity pool. The ratio of $BEME and the other asset in the pool decide the starting price. We make sure, this price is higher than what you pay in this ICO." },
    
    { question: "Why is a vesting required?", 
        answer: "A vesting reduces sell pressure to promote that the price of $BEME rises after the ICO and that the chart stays healthy." },
    
    { question: "How does vesting work?", 
        answer: "Releasing chunks of your coin allocation in intervals. Once a month you receive 5% of your $BEME." },
    
    { question: "What is Web3?", 
        answer: "Web3 is the Internet-of-Value. Assets and digital currencies can be transferred and programmed via Blockchain." },
    
    { question: "What is Blockchain?", 
        answer: "Blockchain is a decentralized ledger technology that securely records transactions across many computers." },
    
    { question: "Are there risks in an ICO?", 
        answer: "Investing is always a risk and doing your own research (DYOR) is an important responsibility. However, we are dedicated and work hard to make BeMeow a game changing success." },
    
    { question: "What else does BeMeow plan?", 
        answer: "We want to build an ecosystem, involving music memecoins, liquidity farming, community rewards, buybacks, club events, multi-chain compatibility, festivals, a music play-to-earn game, song and artist NFTs, copyright tokens, music portfolio tokens, and more. Please Note: This is a long-term roadmap! - Rome was not built in a day." },
    
    { question: "Which music genres does BeMeow support?", 
        answer: "We are open minded to all types of quality music. However, we especially seek music with motivating lyrics and energetic beats or funny music with meme-factor." },  
    
    { question: "More questions?", 
        answer: "Join our Telegram: https://t.me/beatsofmeow" },  
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
          <div className="faq-wrapper">
            <div className="faq-close-button" onClick={onClose}>
              <span className="faq-close-button-span">X</span>
            </div>
            <div className="faq-header">
              <h2 className="faq-title">FAQ</h2>
                  <hr></hr>
              <div className="faq-content">
                {faqData.map((item, index) => (
                  <div key={index}>
                    <div className="faq-toggle-and-question-div" onClick={() => toggleAnswer(index)}>
                      <span className="faq-question-toggle">{openIndex === index ? '-' : '+'} </span>
                      <span className="faq-question">{item.question}</span>
                    </div>
                    {openIndex === index && (
                      <div>
                        <span className="faq-answer">{item.answer}</span>
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
export default FAQWindow;
