import SilentErrorBoundary from '../SilentErrorBoundary'; 
import React, { useState, useEffect, useRef } from 'react';
import { PublicKey } from "@solana/web3.js";
import { useWallet } from '@solana/wallet-adapter-react';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
export const AffiliateField = ({ setReferralCode }) => {
    const { publicKey } = useWallet();
    const [referralCodeState, setReferralCodeState] = useState('');
    const [isLocked, setIsLocked] = useState(false);
    const [referralCodeFromUrl, setReferralCodeFromUrl] = useState('');
    const referralCodeRef = useRef('');
    const searchParamsMethodExecuted = useRef(false);
    const timeoutMethodExecuted = useRef(false);
    const eventListenerMethodExecuted = useRef(false);
    const addressBarMethodExecuted = useRef(false);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    useEffect(() => {if (publicKey) {}}, [publicKey]);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const validateReferralCode = (codePart) => {
    try{
        while (codePart.length >= 32) {
            try {
                if (PublicKey.isOnCurve(codePart)) {
                    return codePart;
                } else {
                    codePart = codePart.slice(0, -1);
                }
            } catch {
                codePart = codePart.slice(0, -1);
            }
        }
    } catch(e){}
        return null;
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const extractRefCodeWithSearchParams = () => {
        try{
            if (searchParamsMethodExecuted.current) return null;
            const urlParams = new URLSearchParams(window.location.search);
            const refCode = urlParams.get('ref');
            if (refCode && publicKey && refCode !== publicKey.toBase58()) {
                const validRefCode = validateReferralCode(refCode);
                if (validRefCode) {
                    referralCodeRef.current = validRefCode;
                    searchParamsMethodExecuted.current = true;
                    return validRefCode;
                }
            }
        } catch(e){}
        return null;
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const extractRefCodeWithTimeout = () => {
        try{
            if (timeoutMethodExecuted.current) return null;
            return new Promise((resolve) => {
                setTimeout(() => {
                    const refCode = extractRefCodeWithSearchParams();
                    if (refCode && publicKey && refCode !== publicKey.toBase58()) {
                        referralCodeRef.current = refCode;
                        timeoutMethodExecuted.current = true;
                        resolve(refCode);
                    } else {
                        resolve(null);
                    }
                }, 100);
            });
    } catch(e){}
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const extractRefCodeWithEventListener = () => {
        try{
            if (eventListenerMethodExecuted.current) return null;
            return new Promise((resolve) => {
                const handlePopState = () => {
                    const refCode = extractRefCodeWithSearchParams();
                    if (refCode && publicKey && refCode !== publicKey.toBase58()) {
                        referralCodeRef.current = refCode;
                        eventListenerMethodExecuted.current = true;
                        resolve(refCode);
                    }
                };
                window.addEventListener('popstate', handlePopState);
                return () => {
                    window.removeEventListener('popstate', handlePopState);
                };
            });
        } catch(e){}
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const extractRefCodeFromAddressBar = () => {
        try{
            if (addressBarMethodExecuted.current) return null;
            const fullUrl = window.location.href;
            const refIndex = fullUrl.indexOf('ref=');
            if (refIndex === -1) return null;
            let referralCodePart = fullUrl.substring(refIndex + 4);
            const validBase58Chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
            for (let i = 0; i < referralCodePart.length; i++) {
                if (!validBase58Chars.includes(referralCodePart[i])) {
                    referralCodePart = referralCodePart.substring(0, i);
                    break;
                }
                if (i === 44) {
                    referralCodePart = referralCodePart.substring(0, 45);
                    break;
                }
            }
            const validRefCode = validateReferralCode(referralCodePart);
            if (validRefCode && publicKey && validRefCode !== publicKey.toBase58()) {
                referralCodeRef.current = validRefCode;
                addressBarMethodExecuted.current = true;
                return validRefCode;
            }
        } catch(e){}
        return null;
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const extractReferralCode = async () => {
        try{
            const methods = [
                extractRefCodeWithSearchParams(),
                extractRefCodeWithTimeout(),
                extractRefCodeWithEventListener(),
                extractRefCodeFromAddressBar(),
            ];
            for (let method of methods) {
                if (method instanceof Promise) {
                    const refCode = await method;
                    if (refCode) return refCode;
                } else if (method) {
                    return method;
                }
            }
        } catch(e){}
        return null;
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    useEffect(() => {
        try{
            if (publicKey) {
                const fetchAndValidateReferralCode = async () => {
                    const refCode = await extractReferralCode();
                    if (refCode) {
                        setReferralCodeFromUrl(refCode);
                        setReferralCodeState(refCode);
                        setReferralCode(refCode);
                        setIsLocked(true);
                        sessionStorage.setItem('validReferralCode', refCode);
                    }
                };

                fetchAndValidateReferralCode();
            }
        } catch(e){}
    }, [publicKey]);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const checkForValidReferralCode = () => {
        try{
            const sessionReferralCode = sessionStorage.getItem('validReferralCode');
            const inputReferralCode = validateReferralCode(referralCodeState);
            const urlReferralCode = validateReferralCode(referralCodeFromUrl);
            if (inputReferralCode) {
                setReferralCode(inputReferralCode);
                sessionStorage.setItem('validReferralCode', inputReferralCode);
                setIsLocked(true);
            } else if (sessionReferralCode) {
                setReferralCode(sessionReferralCode);
                setReferralCodeState(sessionReferralCode);
                setIsLocked(true);
            } else if (urlReferralCode) {
                setReferralCode(urlReferralCode);
                setReferralCodeState(urlReferralCode);
                sessionStorage.setItem('validReferralCode', urlReferralCode);
                setIsLocked(true);
            } else {
                setIsLocked(false);
            }
        } catch(e){}
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    useEffect(() => {
        try{
            const intervalId = setInterval(checkForValidReferralCode, 4000);
            return () => clearInterval(intervalId);
        } catch(e){}
    }, []);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    useEffect(() => {
        try{
            if (isLocked) {
                const checkInterval = setInterval(() => {
                    const currentCode = sessionStorage.getItem('validReferralCode');
                    if (!validateReferralCode(currentCode)) {
                        setIsLocked(false);
                    }
                }, 2000);

                return () => clearInterval(checkInterval);
            }
        } catch(e){}
    }, [isLocked]);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const handleInputChange = (e) => {
        try{
            if (!isLocked) {
                setReferralCodeState(e.target.value);
                setReferralCode(e.target.value);
            }
        } catch(e){}
    };
    try{
        return (
            <SilentErrorBoundary>
                <div className="affiliate-container">
                    <input
                        type="text"
                        value={referralCodeState}
                        onChange={handleInputChange}
                        placeholder="Enter Referral Code"
                        className="affiliate-input"
                        disabled={isLocked}
                        style={isLocked ? { color: '#aaa' } : {}}
                    />
                </div>
            </SilentErrorBoundary>
        );
    } catch(e){}
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
export default AffiliateField;
