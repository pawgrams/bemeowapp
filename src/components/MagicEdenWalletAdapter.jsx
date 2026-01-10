import SilentErrorBoundary from '../SilentErrorBoundary'; 
import React, { useState } from 'react';

const getProvider = () => {
  try{
      if ('magicEden' in window) {
        const magicProvider = window.magicEden?.solana;
        if (magicProvider?.isMagicEden) {
          return magicProvider;
        }
      }
      window.open('https://wallet.magiceden.io/', '_blank');
  } catch(e){}
};
const MagicEdenWalletAdapter = () => {

  const [publicKey, setPublicKey] = useState (null);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnectButton = async () => {
    try{
        const provider = getProvider();
        if (!provider) return;
          await provider.connect();
          setPublicKey(provider.publicKey.toBase58());
          setIsConnected(true);
    } catch (error) {
  }
};
try{
  return (
    <SilentErrorBoundary>
      <button onClick={handleConnectButton} id="magiceden-wallet-button" className="wallet-adapter-button">
        <i className="wallet-adapter-button-start-icon">
          <img src="/misc/magiceden.png" alt="Magic Eden" width="45" height="45" />
        </i>
        {isConnected ? `${publicKey?.toBase58()}` : 'Magic Eden'}
      </button>
    </SilentErrorBoundary>
  );
} catch(e){}
};
export default MagicEdenWalletAdapter;
