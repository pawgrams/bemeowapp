import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

export const useReferralLink = () => {
    const { publicKey } = useWallet();
    const [refLink, setRefLink] = useState<string>('connect your wallet first');
    useEffect(() => {
        try{
            if (publicKey) {
                setRefLink(`/?ref=${publicKey.toBase58()}`);
            } else {
                setRefLink('connect your wallet first');
            }
        } catch(e){}
    }, [publicKey]);
    return refLink;
};
