import SilentErrorBoundary from '../SilentErrorBoundary'; 
import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { usePreventRefresh } from '../hooks';

const OKXWalletAdapter = () => {
    
    const [isLoaded, setIsLoaded] = useState(false);
    const { disconnect } = useWallet();
    const [preventRefresh, setPreventRefresh] = useState(false);

    const getFallbackLink = (isIOS, isAndroid) => {
        if(isAndroid){      return "https://play.google.com/store/apps/details?id=com.okinc.okex.gp&hl=en";
        } else if (isIOS){  return "https://apps.apple.com/us/app/okx-buy-bitcoin-btc-crypto/id1327268470";
        } else {            return "https://www.okx.com/web3";
        }
    }

    usePreventRefresh(preventRefresh);

    const ua = navigator.userAgent;
    const isIOS = /iphone|ipad|ipod|ios/i.test(ua);
    const isAndroid = /android|XiaoMi|MiuiBrowser/i.test(ua);
    const isMobile = isIOS || isAndroid;
    const isOKApp = /OKApp/i.test(ua);

    const handleConnect = () => {
        try {
            if (isMobile && !isOKApp) {
                const dappUrl = "https://app.bemeow.club";
                const encodedDappUrl = encodeURIComponent(dappUrl);
                const deepLink = `okx://wallet/dapp/url?dappUrl=${encodedDappUrl}`;
                const encodedUrl = `https://www.okx.com/download?deeplink=${encodeURIComponent(deepLink)}`;
                const finalUrl = encodedUrl;

                const toolLiElems = document.querySelectorAll('.wallet-adapter-dropdown-list-item');
                if (toolLiElems) {
                    const disconnectButton = Array.from(toolLiElems).find(el => el.textContent.trim() === 'Disconnect');
                    if (disconnectButton) {
                        disconnectButton.click();
                    }
                }
                setPreventRefresh(true);
                disconnect();
                if (window.okxwallet?.solana) {
                    window.okxwallet.solana.disconnect();
                }
                window.location.href = finalUrl;
                setPreventRefresh(false);
            } else {
                window.open(getFallbackLink(isIOS, isAndroid), '_blank');
            }
        } catch (e) {
            window.open(getFallbackLink(isIOS, isAndroid), '_blank');
        }
    
    };
    try{
        return (
            <SilentErrorBoundary>
                <button onClick={handleConnect} id="okx-wallet-button-mobile" className="wallet-adapter-button">
                    <i className="wallet-adapter-button-start-icon">
                        <img src="/misc/okx.jpeg" alt="OKX Wallet" width="45" height="45" />
                    </i>
                    OKX Wallet
                </button>
            </SilentErrorBoundary>
        );
    }catch(e){}
};

export default OKXWalletAdapter;
