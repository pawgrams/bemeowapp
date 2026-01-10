import { useState, useEffect } from 'react';
import { LAMPORTS_PER_SOL, Connection } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

export const useSolBalance = (connection: Connection | null) => {
    const [balance, setBalance] = useState<number>(0);
    const { publicKey } = useWallet();
    useEffect(() => {
        try{
            if (!connection || !publicKey) {
                return;
            }
            const fetchBalance = async () => {
                try {
                    const lamports = await connection.getBalance(publicKey);
                    setBalance(lamports / LAMPORTS_PER_SOL);
                } catch (error) {}
            };
            fetchBalance();
            const subscriptionId = connection.onAccountChange(
                publicKey,
                (updatedAccountInfo) => {
                    setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
                }
            );
            return () => {
                connection.removeAccountChangeListener(subscriptionId);
            };
        } catch(e){}
    }, [connection, publicKey]);
    return balance;
};
