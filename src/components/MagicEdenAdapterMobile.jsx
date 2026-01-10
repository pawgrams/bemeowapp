import SilentErrorBoundary from '../SilentErrorBoundary'; 
import React from 'react';

const MagicEdenAdapterMobile = () => {
    
    const getFallbackLink = (isIOS, isAndroid) => {
        if(isAndroid){      return "https://play.google.com/store/apps/details?id=com.magiceden.wallet";
        } else if (isIOS){  return "https://apps.apple.com/us/app/magic-eden-wallet/id6478631482";
        } else {            return "https://wallet.magiceden.io/";
        }
    }
    const ua = navigator.userAgent;
    const isIOS = /iphone|ipad|ipod|ios/i.test(ua);
    const isAndroid = /android|XiaoMi|MiuiBrowser/i.test(ua);

    const handleConnect = () => {
        try {
            const dappUrl = "https://app.bemeow.club"; ;
            const deepLink = `magiceden://wallet/url=${dappUrl}`;
            if(window && window.magicEden && window.magicEden?.solana){
                window.magicEden?.solana.connect();
            }    
            window.location.href = deepLink; 
        } catch (e) {
            window.open(getFallbackLink(isIOS, isAndroid), '_blank');
        }
    };
    try{
        return (
            <SilentErrorBoundary>
                <button onClick={handleConnect} id="magiceden-wallet-button-mobile" className="wallet-adapter-button">
                    <i className="wallet-adapter-button-start-icon">
                        <img src="/misc/magiceden.png" alt="Magic Eden" width="45" height="45" />
                    </i>
                    Magic Eden
                </button>
            </SilentErrorBoundary>
        );
    }catch(e){}
};
export default MagicEdenAdapterMobile;



