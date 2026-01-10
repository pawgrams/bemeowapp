import ErrorBoundary from '../ErrorBoundary'; 
import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';
import { dbConfig } from '../hooks/dbConfig';
import { useBatchdata } from '../hooks';
import {tkn} from '../utils/tkn';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const RefStats: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const { currentBatchData } = useBatchdata();
    const { currPrice } = currentBatchData;
    const { publicKey } = useWallet();
    const [userAddress, setUserAddress] = useState<string>('');
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [purchasedTokens, setPurchasedTokens] = useState<number>(0);
    const [referralRewards, setReferralRewards] = useState<number>(0);
    const [affiliateRewards, setAffiliateRewards] = useState<number>(0);
    const [reAffiliateRewards, setReAffiliateRewards] = useState<number>(0);
    const [usdSpent, setUsdSpent] = useState<number>(0);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [totalTokens, setTotalTokens] = useState<number>(0);
    const [dcaVal, setDcaVal] = useState<number>(0);
    const [currentPrice, setCurrentPrice] = useState<number>(0);
    const [roiVal, setRoiVal] = useState<number>(0);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [referrerPercentage, setReferrerPercentage] = useState <number>(5);
    const [affiliatePercentage, setAffiliatePercentage] = useState <number>(5);
    const [reAffiliatePercentage, setReAffiliatePercentage] = useState <number>(5);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [refLink, setRefLink] = useState<string>('');
    const [formattedPublicKey, setFormattedPublicKey] = useState<string>('');
    const [copiedRefCode, setCopiedRefCode] = useState<boolean>(false);
    const [copiedRefLink, setCopiedRefLink] = useState<boolean>(false);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    useEffect(() => {
        try{
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            if (!publicKey) return;
            if(publicKey){
                const _userAddress = publicKey.toBase58();
                setUserAddress(_userAddress);  
            }
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            if(currPrice && typeof Number(currPrice) == "number"){
                const _currPrice = currPrice? currPrice : 0;
                setCurrentPrice(_currPrice);
            }
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            const fetchUserStats = async () => {  
                try{
                    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    const dbConfigs = await dbConfig();
                    let app;
                    if (!getApps().length) { 
                        app = initializeApp(dbConfigs);
                    } else {
                        app = getApps()[0];
                    }
                    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    const db = getFirestore(app);
                    const _presaleGlobals = doc(db, "bemeowPresale", "db_presaleGlobals");
                    const presaleGlobalsSnap = await getDoc(_presaleGlobals);
                    let _referrerPercentage = 5; let _affiliatePercentage = 5; let _reAffiliatePercentage = 5;
                    if (presaleGlobalsSnap.exists()) {
                        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        try{
                            const presaleGlobals = presaleGlobalsSnap.data();
                            if(presaleGlobals){
                                _referrerPercentage     = Number(presaleGlobals?.referral?.referrerPercentage)      || 5;
                                _affiliatePercentage    = Number(presaleGlobals?.referral?.affiliatePercentage)     || 5;
                                _reAffiliatePercentage  = Number(presaleGlobals?.referral?.reAffiliatePercentage)   || 5;
                                setReferrerPercentage(_referrerPercentage); 
                                setAffiliatePercentage(_affiliatePercentage); 
                                setReAffiliatePercentage(_reAffiliatePercentage);
                            }
                        } catch(e){}
                    }
                    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   
                    if(userAddress){
                        try{
                            const response = await fetch(`https://firebasestorage.googleapis.com/v0/b/bemeowdapp.appspot.com/o/presale%2Fdb_userStats.json?alt=media&token=${tkn[1]}`);
                            if (response.ok) {
                                // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                const allUserStats = await response.json();
                                if (userAddress in allUserStats) {
                                    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                    const userStats = allUserStats[userAddress];
                                    if (userStats && userStats.length === 5) {
                                        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                        try{
                                            const purchased = Math.trunc(Number(userStats[0]))      || 0; setPurchasedTokens(purchased);
                                            const referral = Math.trunc(Number(userStats[1]))       || 0; setReferralRewards(referral);
                                            const affiliate = Math.trunc(Number(userStats[2]))      || 0; setAffiliateRewards(affiliate);
                                            const reAffiliate = Math.trunc(Number(userStats[3]))    || 0; setReAffiliateRewards(reAffiliate);
                                            const spent = Math.trunc(Number(userStats[4]))          || 0; setUsdSpent(spent);
                                            let total = 0;
                                            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                            for(const num of userStats){
                                                if(typeof(num) === 'number'){
                                                    total += num;
                                                }
                                            }
                                            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                            setTotalTokens(total? total : 0);
                                            if (total && total > 0 && spent) {
                                                try{
                                                    const _dcaVal = (spent / total) || 0;
                                                    setDcaVal(_dcaVal);
                                                    if (_dcaVal && _dcaVal > 0 && currPrice && currPrice > 0) {
                                                        const _roiVal = ((currPrice / _dcaVal) - 1) || 0;
                                                        setRoiVal(_roiVal);
                                                    } 
                                                } catch(e){}
                                            } 
                                        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                        } catch(e){}
                                    }
                                }                 
                            }
                        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        } catch(e){}
                    }
                // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                } catch(e){}
            };
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    
        const interval = setInterval(fetchUserStats, 1000);
        fetchUserStats();
        return () => clearInterval(interval);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    } catch(e){}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
}, [userAddress, currPrice]);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
useEffect(() => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    try{
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        const baseUrl = window.location.origin;
        if (publicKey) {
            const publicKeyString = publicKey.toString();
            const first = publicKeyString.substring(0, 8);
            const last = publicKeyString.slice(-8);
            setFormattedPublicKey(`${first}...${last}`);
            setRefLink(`${baseUrl}/?ref=${publicKeyString}`);
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        } else {
            setFormattedPublicKey('');
            setRefLink('');
        }
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    } catch(e){}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
}, [publicKey]);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const handleCopyLink = () => {
    try{
        if (publicKey) {
            navigator.clipboard.writeText(refLink).then(() => {
                setCopiedRefLink(true);
                setTimeout(() => setCopiedRefLink(false), 2000);
            });
        }
    } catch(e){}
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const handleCopyRefCode = () => {
    try{
        if (publicKey) {
            navigator.clipboard.writeText(publicKey.toString()).then(() => {
                setCopiedRefCode(true);
                setTimeout(() => setCopiedRefCode(false), 2000);
            });
        }
    } catch(e){}
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const toReadbl = (value: any): string => {
    try{
        if (!value || typeof(value) !== 'number' || isNaN(value)) {return 'n/a';}
        value = Math.trunc(value);
        return value.toLocaleString('en-US');
    } catch(e){
        return "";
    }
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
try{
    return (
        <ErrorBoundary>
            <div className="stats-wrapper">
                <div className="moz-top-space" style={{ height: '0px', maxHeight:'0px', visibility: 'hidden' }}></div>
                <div className="stats-close-button" onClick={onClose}>
                    <span className="stats-close-button-span">X</span>
                </div>
                <div className="details-header">
                    <h2 className="stats-details-title" style={{ marginLeft: '7px' }}>Stats</h2>
                </div>
                
                <div className="stats-content">
                    <table className="stats-details-table" style={{ fontSize: '12px' }}>
                        <tbody>
                        <tr>
                            <th>
                            <hr></hr>
                            </th>
                        </tr>
                        <tr>
                            <th className="ico-details-col-1">
                                <span className="ref-code-caption" style={{ marginLeft: '1px' }}>Referral-Code</span>
                                <button
                                    onClick={handleCopyRefCode} 
                                    className={`copy-button ${!publicKey ? 'disabled' : ''}`} 
                                    disabled={!publicKey}
                                >
                                    Copy
                                </button>
                                {copiedRefCode && <span className="copied-message">Copied!</span>}
                            </th>
                        </tr>
                        <tr>
                            <th className="ico-details-col-1">
                                <span className="ref-code">
                                {publicKey ? (
                                    <span className="ref-code-active">{userAddress}</span>
                                ) : (
                                    <span className="ref-code-inactive">Connect your wallet first</span>
                                )}
                                </span>
                            </th>
                        </tr>
                        <tr>
                            <th className="ico-details-col-1">
                                <span className="ref-link-caption" style={{ marginLeft: '1px' }}>Referral-Link </span>
                                <button 
                                    onClick={handleCopyLink} 
                                    className={`copy-button ${!publicKey ? 'disabled' : ''}`} 
                                    disabled={!publicKey}
                                    style={{ marginLeft: '15px' }}
                                >
                                    Copy
                                </button>
                                {copiedRefLink && <span className="copied-message">Copied!</span>}
                            </th>
                        </tr>
                        <tr>
                            <th className="ico-details-col-1">
                            <div className="ref-link-wrapper">
                                {publicKey ? (
                                    <a 
                                        href={refLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="ref-link"
                                    >
                                        <span className="ref-link-active">{`${window.location.origin}/?ref=${formattedPublicKey}`}</span>
                                        
                                    </a>
                                ) : (
                                    <span className="ref-link-inactive">Connect your wallet first</span>
                                )}
                            </div>
                            </th>
                        </tr>

                        <tr>
                            <th>
                            <hr></hr>
                            </th>
                        </tr>


                        <tr>
                            <th className="stats-section-title"><span>Metrics</span></th>
                        </tr>


                        <tr className="stats-list-row">
                        <th className="stats-short-col-1">
                            <span style={{fontWeight: "300"}}>Referrals</span>
                        </th>
                            <th className="stats-short-col-2">
                            <span style={{fontWeight: "300"}}>active-direct</span>
                        </th>
                            <th className="stats-short-col-3">
                                
                                <span style={{fontWeight: "300"}}>+{(referrerPercentage? referrerPercentage : 5).toFixed(1)}%</span>
                            </th>
                        </tr>


                        <tr className="stats-list-row">
                        <th className="stats-short-col-1">
                            <span style={{fontWeight: "300"}}>Affiliates</span>
                        </th>
                            <th className="stats-short-col-2">
                                <span style={{fontWeight: "300"}}>passive-direct</span>
                            </th>
                            <th className="stats-short-col-3">
                                <span style={{fontWeight: "300"}}>+{(affiliatePercentage? affiliatePercentage : 5).toFixed(1)}%</span>
                            </th>
                        </tr>


                        <tr className="stats-list-row">
                        <th className="stats-short-col-1">
                        <span style={{fontWeight: "300"}}>Re-Affiliates</span>
                            </th>
                            <th className="stats-short-col-2">
                            <span style={{fontWeight: "300"}}>passive-indirect</span>
                            </th>
                            <th className="stats-short-col-3">
                                <span style={{fontWeight: "300"}}>+{(reAffiliatePercentage? reAffiliatePercentage : 5).toFixed(1)}%</span>
                            </th>
                        </tr>


                        <tr>
                            <th>
                                <hr></hr>
                            </th>
                        </tr>



                        <tr>
                            <th className="stats-section-title"><span>Allocation</span></th>
                        </tr>


                            <tr className="stats-list-row">
                                <th className="stats-short-col-1">
                                    <span style={{fontWeight: "300"}}>Total Tokens</span>
                                </th>
                            
                                <th className="stats-short-col-2">
                                
                                    <span style={{fontWeight: "300"}}>{toReadbl(totalTokens)}</span>

                                </th>
                                <th className="stats-short-col-3">
                                <span style={{fontWeight: "300"}}>{totalTokens && typeof(totalTokens) === 'number' ? (100).toFixed(1) + '%' : 'n/a'}</span>
                                </th>
                                
                            </tr>
                           

                            <tr className="stats-list-row">
                                <th className="stats-short-col-1">
                                <span style={{fontWeight: "300"}}>Bought</span>
                                </th>
                                <th className="stats-short-col-2">
                                <span style={{fontWeight: "300"}}>{toReadbl(purchasedTokens)}</span>
                                </th>
                                <th className="stats-short-col-3">
                                <span style={{fontWeight: "300"}}>{totalTokens && typeof(totalTokens) === 'number' && purchasedTokens && typeof(purchasedTokens) === 'number' ? ((Number(purchasedTokens) / Number(totalTokens)) * 100).toFixed(1) + '%' : 'n/a'}</span>
                                </th>
                            </tr>


                            <tr className="stats-list-row">
                                <th className="stats-short-col-1">
                                <span style={{fontWeight: "300"}}>Referral</span>
                                </th>
                                <th className="stats-short-col-2">
                                <span style={{fontWeight: "300"}}>{toReadbl(referralRewards)}</span>
                                </th>
                                <th className="stats-short-col-3">
                                <span style={{fontWeight: "300"}}>{totalTokens && typeof(totalTokens) === 'number' && referralRewards && typeof(referralRewards) === 'number' ? ((Number(referralRewards) / Number(totalTokens)) * 100).toFixed(1) + '%' : 'n/a'}</span>
                                </th>
                            </tr>

                            <tr className="stats-list-row">
                                <th className="stats-short-col-1">
                                <span style={{fontWeight: "300"}}>Affiliate</span>
                                </th>
                                <th className="stats-short-col-2">
                                <span style={{fontWeight: "300"}}>{toReadbl(affiliateRewards)}</span>
                                </th>
                                <th className="stats-short-col-3">
                                <span style={{fontWeight: "300"}}>{totalTokens && typeof(totalTokens) === 'number' && affiliateRewards && typeof(affiliateRewards) === 'number' ? ((Number(affiliateRewards) / Number(totalTokens)) * 100).toFixed(1) + '%' : 'n/a'}</span>
                                </th>
                            </tr>


                            <tr className="stats-list-row">
                                <th className="stats-short-col-1">
                                <span style={{fontWeight: "300"}}>Re-Affiliate</span>
                                </th>
                                <th className="stats-short-col-2">
                                <span style={{fontWeight: "300"}}>{toReadbl(reAffiliateRewards)}</span>
                                </th>
                                <th className="stats-short-col-3">
                                <span style={{fontWeight: "300"}}>{totalTokens && typeof(totalTokens) === 'number' && reAffiliateRewards && typeof(reAffiliateRewards) === 'number'  ? ((Number(reAffiliateRewards) / Number(totalTokens)) * 100).toFixed(1) + '%' : 'n/a'}</span>
                                </th>
                            </tr>


                            <tr>
                                <th>
                                    <hr></hr>
                                </th>
                            </tr>



                            <tr>
                                <th className="stats-section-title"><span>Key Figures</span></th>
                            </tr>

                            <tr className="stats-list-row">
                                <th className="stats-short-col-1">
                                    <span style={{fontWeight: "300"}}>Total Spent</span>
                                </th>
                                <th className="stats-short-col-2">
                                <span style={{fontWeight: "300"}}> </span>
                                </th>
                                <th className="stats-short-col-3">
                                    <span style={{fontWeight: "300", position: 'absolute', right: '0px', justifyContent: 'flex-end', marginTop: '-7px', textAlign: 'right'}}>{usdSpent && typeof(Number(usdSpent)) === 'number' ? '$' + Number(usdSpent).toFixed(2) : 'n/a'}</span>
                                </th>
                            </tr>


                            <tr className="stats-list-row">
                                <th className="stats-short-col-1">
                                    <span style={{fontWeight: "300"}}>Position Value</span>
                                </th>
                                <th className="stats-short-col-2">
                                <span style={{fontWeight: "300"}}> </span>
                                </th>
                                <th className="stats-short-col-3">
                                    <span style={{fontWeight: "300", position: 'absolute', right: '0px', justifyContent: 'flex-end', marginTop: '-7px', textAlign: 'right'}}>{totalTokens && typeof(totalTokens) === 'number' && currentPrice && !isNaN(Number(currentPrice))? '$' + (Number(totalTokens) * Number(currentPrice)).toFixed(0) : 'n/a'}</span>
                                </th>
                            </tr>


                            <tr className="stats-list-row">
                                <th className="stats-short-col-1">
                                    <span style={{fontWeight: "300"}}>DCA Price</span>
                                </th>
                                <th className="stats-short-col-2">
                                <span style={{fontWeight: "300"}}> </span>
                                </th>
                                <th className="stats-short-col-3">
                                <span style={{fontWeight: "300", position: 'absolute', right: '0px', justifyContent: 'flex-end', marginTop: '-7px', textAlign: 'right'}}>{dcaVal && !isNaN(Number(dcaVal)) ? '$' + (Number(dcaVal)).toFixed(5) : 'n/a'}</span>
                                </th>
                            </tr>

                            <tr className="stats-list-row">
                                <th className="stats-short-col-1">
                                    <span style={{fontWeight: "300"}}>Current Price</span>
                                </th>
                                <th className="stats-short-col-2">
                                <span style={{fontWeight: "300"}}> </span>
                                </th>
                                <th className="stats-short-col-3">
                                    <span style={{fontWeight: "300", position: 'absolute', right: '0px', justifyContent: 'flex-end', marginTop: '-7px', textAlign: 'right'}}>{currentPrice && !isNaN(Number(currentPrice)) ? '$' + (Number(currentPrice)).toFixed(5) : 'n/a'}</span>
                                </th>
                            </tr>

                            <tr className="stats-list-row">
                                <th className="stats-short-col-1">
                                    <span style={{fontWeight: "300"}}>ROI</span>
                                </th>
                                <th className="stats-short-col-2">
                                <span style={{fontWeight: "300"}}>{roiVal && roiVal && typeof(Number(roiVal)) === 'number'? (roiVal * 100).toFixed(1) + '%' : 'n/a'}</span>
                                </th>
                                <th className="stats-short-col-3">
                                <span style={{fontWeight: "300", position: 'absolute', right: '0px', justifyContent: 'flex-end', marginTop: '-7px', textAlign: 'right'}}>
                                {
                                    roiVal && roiVal && typeof(Number(roiVal)) === 'number' && usdSpent && typeof(Number(usdSpent)) === 'number'? 
                                            '$' + String((Number(roiVal)  * Number(usdSpent)).toFixed(0)) :
                                    totalTokens && typeof(totalTokens) === 'number' && currentPrice && !isNaN(Number(currentPrice)) && usdSpent && typeof(Number(usdSpent)) === 'number'?
                                            '$' + String((((Number(totalTokens) * Number(currentPrice)) - usdSpent )).toFixed(0)) 
                                    : 'n/a'
                                }
                                </span>
                                </th>
                            </tr>



                            <tr>
                                <th>
                                    <hr></hr>
                                </th>
                            </tr>

                        <tr>
                            <th className="stats-section-title"><span>Rules</span></th>
                        </tr>


                        <tr className="stats-list-row">
                            <th className="stats-short-rules-line">
                                <span style={{fontWeight: "300"}}>» Rewards are on-buy top ups (no deduction).</span>
                            </th>  
                            <th className="stats-short-rules-line">
                                <span style={{fontWeight: "300"}}>» Max. indirect referral depth = 1.</span>
                            </th>     
                            <th className="stats-short-rules-line">
                                <span style={{fontWeight: "300"}}>» Min. $10 buy prior to passive rewards.</span>
                            </th>
                            <th className="stats-short-rules-line">
                                <span style={{fontWeight: "300"}}>» Rewards vested like sold tokens.</span>
                            </th>
                            <th className="stats-short-rules-line">
                                <span style={{fontWeight: "300"}}>» No self- and cross-referrals.</span>
                            </th>
                            <th className="stats-short-rules-line">
                                <span style={{fontWeight: "300"}}>» No switch or circumvent your affiliate.</span>
                            </th>
                            <th className="stats-short-rules-line">
                                <span style={{fontWeight: "300"}}>» Different wallets ok (e.g. campaign tracking)</span>
                            </th>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </ErrorBoundary>
        );
    }catch(e){}
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default RefStats;
