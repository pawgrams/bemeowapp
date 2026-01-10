import { useState, useEffect } from 'react';
import { PublicKey, Connection } from '@solana/web3.js';
import { useConnection } from '../hooks';
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const useCheckRefCode = (referralCode: string | null) => {
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [isValidRef, setIsValidRef] = useState<boolean | null>(null);
    const { connection } = useConnection();
    const _connection: Connection | null = connection;
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    useEffect(() => {
        try{
        const checkRefCode = async () => {
            if (referralCode && referralCode !== "") {
                try {
                    const referralCodePublickey = new PublicKey(referralCode);
                    if (PublicKey.isOnCurve(referralCodePublickey)) {
                        const accountInfo: any = await _connection?.getAccountInfo(referralCodePublickey);
                        if (accountInfo) {
                            const ownerPubkey = accountInfo.owner;
                            const ownerAddress = ownerPubkey.toBase58();
                            const space = accountInfo.space;
                            const executable = accountInfo.executable;
                            if (space === 0 && ownerAddress === "11111111111111111111111111111111" && !executable) {
                                setIsValidRef(true);} else {setIsValidRef(false);}
                        } else {setIsValidRef(false);}
                    } else {setIsValidRef(false);}
                } catch (e) {setIsValidRef(false);}
            } else {setIsValidRef(null);}};
        checkRefCode();
    } catch(e){}
    }, [referralCode, _connection]);
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return isValidRef;
};
