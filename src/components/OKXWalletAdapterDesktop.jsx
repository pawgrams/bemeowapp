import SilentErrorBoundary from '../SilentErrorBoundary'; 
import React, { useEffect, useState } from 'react';
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const OKXWalletAdapterDesktop = () => {
  //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const [isConnected, setIsConnected] = useState(false);
  const [publicKey, setPublicKey] = useState(null);
  //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  useEffect(() => {
    try{
        if (window.okxwallet?.solana) {
          window.okxwallet.solana.on('connect', () => {
            setIsConnected(true);
            setPublicKey(window.okxwallet.solana.publicKey);
          });

          window.okxwallet.solana.on('disconnect', () => {
            setIsConnected(false);
            setPublicKey(null);
          });

          window.okxwallet.solana.on('accountChanged', (newPublicKey) => {
            if (newPublicKey) {
              setPublicKey(newPublicKey);
            } else {
              window.okxwallet.solana.connect().catch((error) => {
              });
            }
          });
        }
    } catch(e){}
  }, []);
  //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const handleConnect = () => {
    try{
        if (window.okxwallet?.solana) {
          window.okxwallet.solana.connect().catch((error) => {
          });
        } else {
            window.open('https://www.okx.com/web3', '_blank');
        }
    } catch(e){}
  };
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
try{
    return (
        <SilentErrorBoundary>
          <button onClick={handleConnect} id="okx-wallet-button-desktop" className="wallet-adapter-button">
            <i className="wallet-adapter-button-start-icon">
              <img src="/misc/okx.jpeg" alt="OKX Wallet" width="45" height="45" />
            </i>
            {isConnected ? `${publicKey?.toBase58()}` : 'OKX Wallet'}
          </button>
        </SilentErrorBoundary>
      );
} catch(e){}
};
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default OKXWalletAdapterDesktop;
