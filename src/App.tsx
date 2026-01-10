import ErrorBoundary from './ErrorBoundary'; 
import NetworkStatusHandler from './NetworkStatusHandler';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import './styles.css';
import React, { useState, useEffect, useRef } from 'react';
import BatchSaleMask from './BatchSaleMask';
import './App.css';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import MobileDetect from 'mobile-detect';
import { useWalletAdapters, useConnection } from './hooks';
import DownloadApp from './components/DownloadApp';
import DownloadAppListItem from './components/DownloadAppListItem';
import Slideshow from './components/Slideshow';
import ShopGrid from './components/ShopGrid';
import IcoDetails from './components/IcoDetails';
import FAQWindow from './components/FAQWindow';
import HelpWindow from './components/HelpWindow';
import TermsWindow from './components/TermsWindow';
import LoadingScreen from './components/LoadingScreen';
import RefStats from './components/RefStats';
import {discon} from './utils/remcon';
import DeBridgeWidget from './components/DeBridgeWidget'
import JupiterTerminal from './components/JupiterTerminal'
import CatExplosionDesktop from './components/CatExplosionDesktop'
import CatExplosionMobile from './components/CatExplosionMobile'
import {disableJupButton, enableJupButton} from './utils/handleJupButton';
import MusicPlayer from './components/MusicPlayer'
import SilentErrorBoundary from './SilentErrorBoundary'; 
import { useWindowSize } from "./hooks";
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
const App = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const md = new MobileDetect(window.navigator.userAgent);
    const [isMobileAndLandscape, setIsMobileAndLandscape] = useState(false);
    const { endpoint, connection } = useConnection();
    const wallets = useWalletAdapters();
    const [showStats, setShowStats] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showFAQ, setShowFAQ] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [collapseBatchContainer, setCollapseBatchContainer] = useState(false);
    const statsRef = useRef<HTMLDivElement>(null);
    const detailsRef = useRef<HTMLDivElement>(null);
    const faqRef = useRef<HTMLDivElement>(null);
    const termsRef = useRef<HTMLDivElement>(null);
    const helpRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const [showDeBridge, setShowDeBridge] = useState(false);
    const [showJupiter, setShowJupiter] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const { width } = useWindowSize();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    useEffect(() => {
        try{
            discon();
            const clearConsole = () => {
                setInterval(() => {console.clear();}, 500);
            };
            clearConsole();
        } catch(e){}
    }, []);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
      }, []);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const altValuesToFind = ['phantom', 'okx', 'solflare', 'backpack', 'ledger', 'trust', 'magic eden', 'coinbase', 'safepal', 'trezor', 'brave', 'bitget', 'math', 'fractal', 'torus', 'tokenary', 'xdefi', 'coin98', 'coinhub', 'glow']
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    useEffect(() => {
        try {
            const dropDownListElem = document.querySelector('.wallet-adapter-dropdown-list');
            if(dropDownListElem){
                const changeWalletElem = document.evaluate(`.//*[text()[contains(., 'Change')]]`, dropDownListElem, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLLIElement | null;
                if(changeWalletElem){
                    changeWalletElem.id = "change-wallet-button";
                }
            }
        } catch(e){}
    }, []);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const clickChangeWalletEvent = async (event: Event) => {
        try {
            const connectButton = document.querySelector('.wallet-adapter-button') as HTMLButtonElement | null;
            connectButton?.removeEventListener('click', handleModalScroll);
            const changeWalletElem = document.getElementById('change-wallet-button');
            changeWalletElem?.removeEventListener('click', handleModalScroll);
            const connectButtonImage = connectButton?.querySelector('img');
            const connectButtonAlttext = connectButtonImage?.alt.toLowerCase();
            if(md.mobile() && !altValuesToFind.some(word => connectButtonAlttext?.includes(word))){
                event.stopPropagation();
                changeWalletElem?.click();
            }
            document.querySelector('.wallet-adapter-button')?.addEventListener('click', handleModalScroll);
            document.getElementById('change-wallet-button')?.addEventListener('click', handleModalScroll);
        } catch(e){}
        return;
    }
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    useEffect(() => {
        try {
            const delay: any = 2500;
            setTimeout(delay);
            const connectButton = document.querySelector('.wallet-adapter-button') as HTMLButtonElement | null;
            connectButton?.addEventListener('click', handleModalScroll);
            const connectButtonImage = connectButton?.querySelector('img');
            const connectButtonAlttext = connectButtonImage?.alt.toLowerCase();
            document.getElementById('change-wallet-button')?.addEventListener('click', handleModalScroll);;
            if(connectButton && connectButtonAlttext && md.mobile() && !altValuesToFind.some(word => connectButtonAlttext?.includes(word))){
                connectButton.addEventListener('click', clickChangeWalletEvent);
            }
        } catch (e){}
    }, []);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const scrollTop = async () => {
        try {
            const screen = document.querySelector(".screen");
            if(screen){
                screen.scrollTo(0, 0);
            }
        } catch(e){}
        return;
    }
    const handleModalScroll = async (event: Event) => {
        try{
            document.querySelector('.wallet-adapter-button')?.removeEventListener('click', handleModalScroll);
            document.getElementById('change-wallet-button')?.removeEventListener('click', handleModalScroll);
            event.stopPropagation();
            await scrollTop()
            event.target?.dispatchEvent(new Event('click', { bubbles: true }));
            document.querySelector('.wallet-adapter-button')?.addEventListener('click', handleModalScroll);
            document.getElementById('change-wallet-button')?.addEventListener('click', handleModalScroll);
        } catch(e){}
    }
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    try {window.onload = function () {
            document.body.style.zoom = "100%";
        };
        document.addEventListener('wheel', function (event) {
            if (event.ctrlKey) {
                event.preventDefault();
            }
        }, { passive: false });
        document.addEventListener('keydown', function (event) {
            if (event.ctrlKey && (event.key === '+' || event.key === '-' || event.key === '0')) {
                event.preventDefault();
            }
        });
    } catch(e){}
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

    useEffect(() => {try{
        const updateOrientation = () => {
            const currentOrientation = ScreenOrientation.type;
            if (md.mobile() && currentOrientation.includes('landscape')) {
                setIsMobileAndLandscape(true);
            } else {
                setIsMobileAndLandscape(false);
            }
        };
        updateOrientation();
        window.addEventListener('resize', updateOrientation);
        window.addEventListener('orientationchange', updateOrientation);
        return () => {
            window.removeEventListener('resize', updateOrientation);
            window.removeEventListener('orientationchange', updateOrientation);
        };} catch(e){}
    }, []);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const RefreshButton = () => { 
        try {window.location.reload(); } catch(e){}
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const closeAllWindows = () => {try{
            setShowJupiter(false);
            setShowDeBridge(false);
            handleCloseDeBridge();
            setShowStats(false);
            setShowDetails(false);
            setShowFAQ(false);
            setShowTerms(false);  
            setShowHelp(false);
            setCollapseBatchContainer(false);
            setShowMobileMenu(false);
        }catch(e){}
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const handleJupiterClick = async () => {try {
        setShowMobileMenu(false);
        setShowTerms(false);
        setShowStats(false);
        setShowHelp(false);
        setShowFAQ(false);
        setShowDeBridge(false);
        setShowDetails(false);
            const connectButtonIconElem = document.querySelector(".wallet-adapter-button-start-icon") as any;
            if(connectButtonIconElem){
                const connectedIcon: any = connectButtonIconElem.querySelector('img');
                if(connectedIcon){
                    const altValue = connectedIcon.alt.toLowerCase();
                    if(altValue){
                        if(altValue.includes("solflare")){
                            setShowJupiter(false);
                            disableJupButton();
                        } else {setShowJupiter(true);enableJupButton();}
                    } else {setShowJupiter(true);enableJupButton();}
                } else {setShowJupiter(true);enableJupButton();}
            } else {setShowJupiter(true);enableJupButton();}
        } catch(e){}
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const handleDeBridgeClick = () => {try{
        setShowTerms(false);
        setShowStats(false);
        setShowHelp(false);
        setShowFAQ(false);
        setShowJupiter(false);
        setShowDetails(false);
        setShowDeBridge(true);
        const debridgeWidgetElement = document.getElementById('debridge-widget');
        const debridgeWrapperElement= document.getElementById('debridge-wrapper');
        if(debridgeWidgetElement && debridgeWrapperElement){
            debridgeWidgetElement.style.visibility = 'visible';
            debridgeWrapperElement.style.visibility = 'visible'; 
        }  
        setShowMobileMenu(false);
        }catch(e){}
      };
      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
      const handleLinktreeClick = () => {try{
        setShowMobileMenu(false)
        closeAllWindows();
        setShowStats(false);
    }catch(e){}
}; 
      const handleTelegramClick = () => {try{
        setShowMobileMenu(false)
        closeAllWindows();
        setShowStats(false);
    }catch(e){}
}; 
      const handleMobileMenuClick = () => {try{
        closeAllWindows();
        setShowMobileMenu(true);
        setCollapseBatchContainer(true);
        setShowStats(false);
    }catch(e){}
}; 
    const handleStatsClick = () => {try{
        setShowMobileMenu(false);
            closeAllWindows();
            setShowStats(true);
            setCollapseBatchContainer(true);
        }catch(e){}
    };
    const handleDetailsClick = (event: any) => {try{
        setShowMobileMenu(false);
        event.preventDefault();
        closeAllWindows();
        setShowDetails(true);
        setShowStats(false);
        setCollapseBatchContainer(true);
    }catch(e){}
    };
    const handleFAQClick = (event: any) => {try{
        setShowMobileMenu(false);
        event.preventDefault();
        closeAllWindows();
        setShowFAQ(true);
        setShowStats(false);
        setCollapseBatchContainer(true);
    }catch(e){}
    };
    const handleTermsClick = (event: any) => {try{
        setShowMobileMenu(false)
        closeAllWindows();
        setShowStats(false);
        window.open('https://www.bemeow.club/terms', '_blank', 'noopener,noreferrer');
    }catch(e){}
    };
    const handleHelpClick = (event: any) => {try{
        setShowMobileMenu(false);
        event.preventDefault();
        closeAllWindows();
        setShowHelp(true);
        setShowStats(false);
        setCollapseBatchContainer(true);
    }catch(e){}
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const handleCloseJupiter = () => {try{
        setShowMobileMenu(false);
        setShowJupiter(false);
        setCollapseBatchContainer(false);
    }catch(e){}       
      };
    const handleCloseDeBridge = () => {try{
        setShowDeBridge(false);
        const debridgeWidgetElement = document.getElementById('debridge-widget');
        const debridgeWrapperElement= document.getElementById('debridge-wrapper');
        if(debridgeWidgetElement && debridgeWrapperElement){
            debridgeWidgetElement.style.visibility = 'hidden';
            debridgeWrapperElement.style.visibility = 'hidden'; 
        }}catch(e){} 
        setCollapseBatchContainer(false);
        setShowMobileMenu(false);
    };
    const handleCloseMobileMenu = () => {try{
        setShowMobileMenu(false);
        setCollapseBatchContainer(false);
    }catch(e){} 
    };
    const handleCloseStatsClick = () => {try{
        setShowMobileMenu(false);
        setShowStats(false);
        setCollapseBatchContainer(false);
    }catch(e){} 
    };
    const handleCloseDetailsClick = () => {try{
        setShowMobileMenu(false);
        setShowDetails(false);
        setCollapseBatchContainer(false);
    }catch(e){} 
    };
    const handleCloseFAQClick = () => {try{
        setShowMobileMenu(false);
        setShowFAQ(false);
        setCollapseBatchContainer(false);
    }catch(e){} 
    };
    const handleCloseTermsClick = () => {try{
        setShowMobileMenu(false);
        setShowTerms(false);
        setCollapseBatchContainer(false);
    }catch(e){} 
    };
    const handleCloseHelpClick = () => {try{
        setShowMobileMenu(false);
        setShowHelp(false);
        setCollapseBatchContainer(false);
    }catch(e){} 
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    useEffect(() => {
        try{
            discon();
            const handleJupRpcAlert = () => {
                setInterval(() => {
                    const jupRpcDiv = document.getElementsByClassName('ml-1');
                    if (jupRpcDiv.length > 0) {
                        const jupRpcSpan = jupRpcDiv[0].querySelector('span');
                        if (jupRpcSpan) {
                            const jupRpxText = jupRpcSpan.textContent;
                            if(
                                ( jupRpxText && jupRpxText.includes("RPC") && jupRpxText.includes(" not ") && jupRpxText.includes(" respond") )
                                || ( jupRpxText && jupRpxText.includes("Solana") && jupRpxText.includes(" network ") && jupRpxText.includes(" performance") )
                            ){
                                jupRpcSpan.textContent = 'At capacity right now. Please swap via https://jup.ag or try again later.';
                            }
                          }
                      }
                }, 500);
            };
            handleJupRpcAlert();
        } catch(e){}
    }, []);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    useEffect(() => {try{
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
            const connectButton = document.querySelector('.wallet-adapter-button-trigger');
            const walletModatWindow = document.querySelector('.wallet-adapter-modal-container');
            const downloadButton = document.querySelector('.appdownload-button');
            const refreshButton = document.querySelector('.refresh-button');
            const toolButton = document.querySelector('.wallet-adapter-dropdown');
            const shopGrid = document.querySelector('.image-grid-header');
            const sidebar = document.querySelector('.sidebar');
            const musicControls = document.querySelector('.music-controls');
            const mobileMenuWrapper = document.querySelector('.menu-mobile-wrapper');
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
            let isOuterEvent = false;
            if (   ( connectButton && connectButton.contains(target) )
                || ( walletModatWindow && walletModatWindow.contains(target) )
                || ( downloadButton && downloadButton.contains(target) )
                || ( refreshButton && refreshButton.contains(target) )
                || ( toolButton && toolButton.contains(target) )
                || ( shopGrid && shopGrid.contains(target) )
                || ( sidebar && sidebar.contains(target) )
                || ( musicControls && musicControls.contains(target) )
                || ( mobileMenuWrapper && mobileMenuWrapper.contains(target) )
            ) {
                isOuterEvent = true;
            }
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
            const jupiterElement = document.getElementById('jupiter-terminal');
            const jupiterSlippageElement = document.getElementById('slippage');
            const jupiterWrapperElement = document.getElementById('jupiter-terminal-wrapper');
            if (showJupiter && jupiterElement && !jupiterElement.contains(target) 
                && jupiterSlippageElement &&  !jupiterSlippageElement.contains(target)
                && jupiterWrapperElement &&  !jupiterWrapperElement.contains(target)
                && !isOuterEvent
            ) {
                setShowJupiter(false);
                handleCloseJupiter();
            }
            const debridgeWidgetElement = document.getElementById('debridge-widget');
            const debridgeWrapperElement= document.getElementById('debridge-wrapper');
            if (showDeBridge && debridgeWidgetElement && !debridgeWidgetElement.contains(target) 
                && debridgeWrapperElement &&  !debridgeWrapperElement.contains(target)
                && !isOuterEvent
            ) {
                setShowDeBridge(false);
                handleCloseDeBridge();
            }
            if (showStats && statsRef.current && !statsRef.current.contains(target) && !isOuterEvent) {
                if (!target.closest('.details-link') && !target.closest('.faq-link') && !target.closest('.terms-link') && !target.closest('.menu-mobile-list')) {
                    closeAllWindows();
                }
            } else if (showFAQ && faqRef.current && !faqRef.current.contains(target) && !isOuterEvent) {
                if (!target.closest('.details-link') && !target.closest('.terms-link') && !target.closest('.menu-mobile-list') && !target.closest('.stats-link') && !target.closest('.help-wrapper')) {
                    closeAllWindows();
                }
            } else if (showDetails && detailsRef.current && !detailsRef.current.contains(target) && !isOuterEvent) {
                if (!target.closest('.faq-link') && !target.closest('.terms-link') && !target.closest('.menu-mobile-list') && !target.closest('.stats-link') && !target.closest('.help-link')) {
                    closeAllWindows();
                }
            } else if (showTerms && termsRef.current && !termsRef.current.contains(target) && !isOuterEvent) {
                if (!target.closest('.details-link') && !target.closest('.faq-link') && !target.closest('.menu-mobile-list') && !target.closest('.stats-link') && !target.closest('.help-link')) {
                    closeAllWindows();
                }
            } else if (showMobileMenu && mobileMenuRef.current && !mobileMenuRef.current.contains(target) && !isOuterEvent) {
                if (!target.closest('.details-link') && !target.closest('.faq-link') && !target.closest('.terms-link') && !target.closest('.stats-link') && !target.closest('.help-link')) {
                    closeAllWindows();
                }
            } else if (showHelp && helpRef.current && !helpRef.current.contains(target) && !isOuterEvent) {
                if (!target.closest('.details-link') && !target.closest('.terms-link') && !target.closest('.menu-mobile-list') && !target.closest('.stats-link') && !target.closest('.faq-link')) {
                    closeAllWindows();
                }
            }
        };
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        if (showDetails || showFAQ || showTerms || showHelp || showStats || showJupiter || showDeBridge || showMobileMenu) {
            document.addEventListener('mouseup', handleClickOutside);}
        return () => {document.removeEventListener('mousedown', handleClickOutside);};
    }catch(e){}}, [showDetails, showFAQ, showTerms, showHelp, showStats, showJupiter, showDeBridge, showMobileMenu]);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
try{
    return (
    <ErrorBoundary>
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect = {false}>
                <WalletModalProvider>
                    {isMobileAndLandscape ? (
                        <div style={{backgroundColor: 'background-color: #1c1c1c'}}>
                            <LoadingScreen></LoadingScreen>
                        </div>
                        ) : (
                        <div><Slideshow />
                            <div className="screen"      
                             style={{
                                filter: isLoaded ? 'blur(0px) hue-rotate(0deg)' : 'blur(1000px) hue-rotate(360deg)',
                                transform: isLoaded ? 'scale(1)' : 'scale(0.5)',
                                opacity: isLoaded ? 1 : 0,
                                transition: 'filter 1s ease-in-out, transform 1s ease-in-out, opacity 1s ease-in-out', 
                                }}>
                                {/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */}
                                <div className="scale-wrapper">
                                    <div>


                                    {/*DESKTOP SIDEBAR - - - - - - - - - - - - - - - - - - - - - - - - - - */}
                                    { width <= 768? <div></div> :
                                        <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
                                            {isCollapsed ? (
                                            <div className="burger-menu-button" onClick={() => setIsCollapsed(false)}>

                                                <div className="burger-line"></div>
                                                <div className="burger-line"></div>
                                                <div className="burger-line"></div>
                                            </div>
                                            ) : (
                                            <div className="collapse-arrow" onClick={() => setIsCollapsed(true)}>
                                                ←
                                            </div>
                                            )}
                                            {!isCollapsed && (
                                            <ul className="side-menu">
                                                <li className="side-menu-item" onClick={closeAllWindows}>🚀 Presale</li>
                                                <li className="side-menu-item" onClick={handleDetailsClick}>🔍 Details</li>
                                                <li className="side-menu-item" onClick={handleStatsClick}>📈 Referral</li>
                                                <li className="side-menu-item" onClick={handleJupiterClick}>🔁 Swap</li>
                                                <li className="side-menu-item" onClick={handleDeBridgeClick}>🌉 Bridge</li>
                                                <li className="side-menu-item" onClick={handleTelegramClick}>
                                                    <a 
                                                        href="https://t.me/beatsofmeow" 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                                                    >
                                                        ❤️ Community
                                                    </a>
                                                </li>
                                                <li className="side-menu-item" onClick={handleLinktreeClick}>
                                                    <a 
                                                        href="https://linktr.ee/beatsofmeow" 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                                                    >
                                                        🔗 Links
                                                    </a>
                                                </li>
                                                <li className="side-menu-item" onClick={handleFAQClick}>❔ FAQ</li>
                                                <li className="side-menu-item" onClick={handleHelpClick}>⁉️ Help</li>  
                                                <li className="side-menu-item" onClick={handleTermsClick}>📃 Terms</li>
                                                <li className="side-menu-item" style={{ color: '#444', cursor: 'default'}}>Launchpad (soon)</li>
                                                <li className="side-menu-item" style={{ color: '#444', cursor: 'default'}}>NFTs (soon)</li>
                                                <li className="last-side-menu-item" onClick={(e) => {e.stopPropagation();}}><DownloadAppListItem></DownloadAppListItem></li>
                                            </ul>
                                            )}
                                        </div>
                                        }


                                    {/*MOBILE MENU - - - - - - - - - - - - - - - - - - - - - - - - - */}
                                    { width > 768? <div></div> :
                                        <div>
                                            {!showMobileMenu ? (
                                            <div className="burger-menu-button" onClick={handleMobileMenuClick}>
                                                <div className="burger-line"></div>
                                                <div className="burger-line"></div>
                                                <div className="burger-line"></div>
                                            </div>
                                            ) : (
                                                <div>
                                                <div className="menu-mobile-wrapper">
                                                <div className="menu-mobile-close-button" onClick={handleCloseMobileMenu}>
                                                    <span className="menu-mobile-close-button-span">X</span>
                                                </div>
                                                <div className="menu-mobile-header">
                                                <h2 className="menu-mobile-title">Menu</h2>
                                                <hr></hr>
                                                <div className="menu-mobile-content">
                                            <ul className="menu-mobile-list">
                                                <li className="menu-mobile-list-item" onClick={closeAllWindows}>Presale</li>
                                                <li className="menu-mobile-list-item" onClick={handleDetailsClick}>Details</li>
                                                <li className="menu-mobile-list-item" onClick={handleStatsClick}>Referral</li>
                                                <li className="menu-mobile-list-item" onClick={handleJupiterClick}>Swap</li>
                                                <li className="menu-mobile-list-item" onClick={handleDeBridgeClick}>Bridge</li>
                                                <li className="menu-mobile-list-item" onClick={handleTelegramClick}>
                                                    <a 
                                                        href="https://t.me/beatsofmeow" 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                                                    >
                                                        Community
                                                    </a>
                                                </li>
                                                <li className="menu-mobile-list-item" onClick={handleFAQClick}>FAQ</li>
                                                <li className="menu-mobile-list-item" onClick={handleHelpClick}>Help</li>  
                                                <li className="menu-mobile-list-item" onClick={handleLinktreeClick}>
                                                    <a 
                                                        href="https://linktr.ee/beatsofmeow" 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                                                    >
                                                        Links
                                                    </a>
                                                </li>
                                                <li className="menu-mobile-list-item" onClick={handleTermsClick}>Terms</li>
                                                <li className="menu-mobile-list-item" style={{ color: '#444', cursor: 'default'}}>Launchpad (soon)</li>
                                                <li className="menu-mobile-list-item" style={{ color: '#444', cursor: 'default'}}>NFTs (soon)</li>
                                                <li className="last-menu-mobile-list-item" onClick={(e) => {e.stopPropagation();}}><DownloadAppListItem></DownloadAppListItem></li>
                                            </ul>
                                            </div>
                                            </div>
                                            </div>
                                            </div>
                                            )}
                                        </div>
                                        }
                                    {/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */}


                                    </div>
                                    <img src="/yellowwave.png" alt="waveform" className="waveform" />
                                    <div className="logo-container">
                                        <img src="/bemeow3000.png" alt="BeMeow Logo" className="mask-logo" style={{ zIndex: '9999' }} />
                                    </div>
                                <div id="wallet-adapter-modal-container" style={{display: "none"}}>
                                </div>
                                <div>
                                    {md.mobile() ? <CatExplosionMobile/>  : <CatExplosionDesktop/>}
                                    </div>
                                    <table className="table">
                                        <tbody>
                                        <tr className="topRow">
                                            <th className="midCol"></th>
                                            <th className="rightCol">
                                                <div className="outer-button-div">
                                                    <div className="inner-button-div">
                                                        <span className="wallet-button-text">
                                                            <div className="wallet-button-text-substitute">
                                                                <WalletMultiButton/>
                                                                <div className="copy-wallet-address-button-fallback"/>
                                                                <div className="change-wallet-button-fallback"/>
                                                                <div className="disconnect-button-fallback"/>
                                                                <div className="appdownload-button-fallback"/>
                                                                <DownloadApp />
                                                                <div className="refresh-button-fallback"/>
                                                                <button className="refresh-button" onClick={RefreshButton}></button>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </div>
                                            </th>
                                        </tr>
                                        <tr className="midRow">
                                            <th className="leftCol"></th>
                                            <th className="midCol">
                                                <div className="gui-container"></div>
                                                {showJupiter && <JupiterTerminal onClose={handleCloseJupiter}/>} 
                                                {showDeBridge && <button className="debridge-close-button" onClick={handleCloseDeBridge}>
                                                        <span className="jupiter-terminal-close-button-span">X</span>
                                                </button>}
                                                <DeBridgeWidget/>
                                                {
                                                showDeBridge && 
                                                <div>
                                                    <div className="debridge-header-line-div"><hr className="debridge-header-line"></hr></div>
                                                    <div className="debridge-scroll-indicator"> </div>
                                                </div>
                                                }
                                                <div className="BatchContainer" style={{ visibility: collapseBatchContainer ? 'collapse' : 'visible' }}>
                                                <div>{showStats && (<div ref={statsRef}><RefStats onClose={handleCloseStatsClick} /></div>)}</div>
                                                <BatchSaleMask handleTermsClick={handleTermsClick} />
                                                </div>
                                                <div className="links-container">
                                                    <a href="/details" className="details-link" onClick={handleDetailsClick} style={{visibility:"hidden"}}>Details</a>
                                                    {showDetails && <div ref={detailsRef}>
                                                        <IcoDetails onClose={handleCloseDetailsClick} />
                                                    </div>}
                                                    <a href="/faq" className="faq-link" onClick={handleFAQClick} style={{visibility:"hidden"}}>FAQ</a>
                                                    {showFAQ && <div ref={faqRef}>
                                                        <FAQWindow onClose={handleCloseFAQClick} />
                                                    </div>}

                                                    <a href="https://linktr.ee/beatsofmeow" className="linktree" target="_blank" rel="noopener noreferrer" style={{visibility:"hidden"}}>Links</a>

                                                    {showHelp && <div ref={helpRef}>
                                                        <HelpWindow onClose={handleCloseHelpClick} />
                                                    </div>}

                                                    {showTerms && <div ref={termsRef}>
                                                        <TermsWindow onClose={handleCloseTermsClick} />
                                                    </div>}
                                                
                                                </div>
                                            </th>
                                            <th className="rightCol">
                                                <div className="right-col-space"></div>
                                            </th>
                                        </tr>
                                        <tr className="bottomRow">
                                            <th className="leftCol">
                                            </th>
                                            <th className="midCol">
                                                <NetworkStatusHandler/>
                                            </th>
                                            <th className="rightCol"></th>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div className="font-header">
                                        <img src="/fontlogo1.png" alt="BeMeow Font" className="mask-font" />
                                    </div>
                                    <div>
                                        <div className="shopgrid-div"><ShopGrid></ShopGrid></div>
                                        <SilentErrorBoundary>
                                                <th className="leftCol">
                                                    <MusicPlayer></MusicPlayer>
                                                </th>
                                        </SilentErrorBoundary>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    </ErrorBoundary>
    );
}catch(e){
    const retry: any = 2500;
    setTimeout(retry);
    App()
}};
export default App;




