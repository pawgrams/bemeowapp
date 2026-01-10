import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import MobileDetect from 'mobile-detect';
import OKXWalletAdapterDesktop from './OKXWalletAdapterDesktop';
import OKXWalletAdapterMobile from './OKXWalletAdapterMobile';
import MagicEdenWalletAdapter from './MagicEdenWalletAdapter';
import MagicEdenMobileAdapter from './MagicEdenAdapterMobile';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const WalletAdapterHandler = ({ setTrustActive }) => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const md = new MobileDetect(window.navigator.userAgent);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const handleTrustClick = (trustSetter) => {
        setTrustActive(trustSetter);
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    useEffect(() => {
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        const rebuildWalletModalList = () => {
            try{
                const modalList = document.querySelector('.wallet-adapter-modal-list');
                let okxExists = false;
                let magicEdenExists = false;
                let trustMobileButton;
                let countBrave = 0;
                let countBitget = 0;
                // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                if (modalList) {
                    const walletList = modalList.querySelectorAll('li');
                    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    if (walletList.length > 0) {
                        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        try{
                            walletList.forEach((walletItem) => {
                                const walletImg = walletItem.querySelector('img');
                                const walletButton = walletItem.querySelector('button');
                                const walletButtonText = walletButton?.querySelector('i')?.textContent?.toLowerCase() || '';
                                // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                if (walletImg) {
                                    const altValue = walletImg.alt.toLowerCase();
                                    const match = ['phantom', 'okx', 'solflare', 'backpack', 'ledger', 'trust', 'magic eden', 'coinbase',/* 'trezor', */ 'brave', 'bitget',  /* 'fractal', */'torus', 'tokenary', 'xdefi', 'coin98', 'coinhub', 'glow']
                                        .some(value => walletButtonText.includes(value.toLowerCase()));
                                    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                    if (match) {
                                        walletItem.style.display = 'block';
                                        walletItem.style.visibility = 'visible';
                                        walletItem.style.height = 'auto';
                                        walletItem.style.overflow = 'visible';
                                    } 
                                    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                    try{
                                        if (
                                            /*walletButtonText.includes("phantom") || altValue.includes("phantom")
                                            ||*/ walletButtonText.includes("mobile") || altValue.includes("mobile")
                                            || walletButtonText.includes("adapter") || altValue.includes("adapter")
                                            || walletButtonText.includes("safepal") || altValue.includes("safepal")
                                            || walletButtonText.includes("math") || altValue.includes("math")
                                            || (  (walletButtonText.includes("brave") || altValue.includes("brave"))  &&   ( md.mobile() || countBrave > 1 )  )
                                            || (  (walletButtonText.includes("bitget") || altValue.includes("bitget"))  && ( md.mobile() || countBitget > 1 )  )
                                        ){
                                            walletItem.style.display = 'none';
                                            walletButton.classList.add('disabled');
                                        }
                                    }catch(e){}
                                    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                    try{
                                        if (walletButtonText.includes("okx") || altValue.includes("okx")) {
                                            okxExists = true;
                                        }
                                    }catch(e){}
                                    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                    try{
                                        if ((walletButtonText.includes("magic") && walletButtonText.includes("eden")) 
                                            ||(altValue.includes("magic") && altValue.includes("eden"))
                                        ){
                                            magicEdenExists = true;
                                        }
                                    }catch(e){}
                                    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                    try{
                                        if (walletButtonText.includes("brave") || altValue.includes("brave")) {
                                            countBrave++;
                                        }      
                                    }catch(e){}       
                                    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                    try{
                                        if (walletButtonText.includes("bitget") || altValue.includes("bitget")) {
                                            countBitget++;
                                        }             
                                    }catch(e){}
                                    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                    try{
                                        if (md.mobile() && (walletButtonText.includes("trust") || altValue.includes("trust"))) {
                                            trustMobileButton = walletButton;
                                        }
                                    }catch(e){}
                                }
                            });
                        }catch(e){}
                        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        try{
                            if (trustMobileButton && !trustMobileButton.hasEventListener && md.mobile()) {
                                trustMobileButton.addEventListener('click', () => handleTrustClick(true));
                                trustMobileButton.hasEventListener = true;
                            }
                        }catch(e){}
                        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        try{
                            if (!okxExists && !document.getElementById('okx-wallet-button-container')) {
                                const okxWalletItem = document.createElement('li');
                                okxWalletItem.id = 'okx-wallet-button-container';
                                walletList[1].insertAdjacentElement('beforebegin', okxWalletItem);
                                const root = ReactDOM.createRoot(okxWalletItem);
                                if (!md.mobile()) {
                                    root.render(<OKXWalletAdapterDesktop />);
                                } else if (md.mobile()) {
                                    root.render(<OKXWalletAdapterMobile />);
                                }
                            }
                        }catch(e){}
                        try{
                            if (!magicEdenExists && !document.getElementById('magiceden-wallet-button-container')) {
                                const magicEdenWalletItem = document.createElement('li');
                                magicEdenWalletItem.id = 'magiceden-wallet-button-container';
                                walletList[3].insertAdjacentElement('beforebegin', magicEdenWalletItem);
                                const root = ReactDOM.createRoot(magicEdenWalletItem);
                                if (!md.mobile()) {
                                    root.render(<MagicEdenWalletAdapter />);
                                } else if (md.mobile()) {
                                root.render(<MagicEdenMobileAdapter />);
                                }
                            }
                        }catch(e){}
                    }
                }
            }catch(e){}
        };
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        try{
            const moreOptionsButton = document.querySelector('.wallet-adapter-modal-list-more');
            if (moreOptionsButton) {
                moreOptionsButton.click();
            }
        }catch(e){}
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        const observeWalletList = () => {
            try{
                const walletList = document.querySelector('.wallet-adapter-modal-list');
                if (walletList) {
                    rebuildWalletModalList(walletList);
                } else {
                    const observer = new MutationObserver((mutations) => {
                        mutations.forEach((mutation) => {
                            if (mutation.type === 'childList') {
                                const walletListUpdated = document.querySelector('.wallet-adapter-modal-list');
                                if (walletListUpdated) {
                                    rebuildWalletModalList(walletListUpdated);
                                    observer.disconnect();
                                }
                            }
                        });
                    });
                    observer.observe(document.body, { childList: true, subtree: true });
                }
            }catch(e){}
        };
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        const checkConnectButton = () => {
            try{
                const connectButton = document.querySelector('.wallet-adapter-button-trigger');
                const toolLiElems = document.querySelectorAll('.wallet-adapter-dropdown-list-item');
                if (connectButton) {
                    connectButton.addEventListener('click', observeWalletList, false);
                }
                const changeWalletButton = Array.from(toolLiElems).find(el => el.textContent.trim() === 'Change wallet');
                if (changeWalletButton) {
                    changeWalletButton.addEventListener('click', observeWalletList, false);
                }
                if (!changeWalletButton) {
                    setTimeout(checkConnectButton, 500);
                }
            }catch(e){}
        };
        checkConnectButton();
    }, []);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const monitorConnectButtonTextChange = () => {
        try{
            const connectButton = document.querySelector('.wallet-adapter-button-trigger');
            const trustMobileButton = document.getElementById('trustMobileButton');
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        handleTrustClick(false); 
                        if (trustMobileButton) {
                            trustMobileButton.removeEventListener('click', () => handleTrustClick());
                            trustMobileButton.removeAttribute('id');
                        }
                    }
                });
            });
            if (connectButton) {
                observer.observe(connectButton, { childList: true });
            }
            return () => {
                if (connectButton) {
                    observer.disconnect();
                }
            };
        }catch(e){return;}
    };
    useEffect(() => {
        try{
            const cleanupObserver = monitorConnectButtonTextChange();
            return () => {
                cleanupObserver();
            };
        }catch(e){}
    }, []); 
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return null;
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default WalletAdapterHandler;
