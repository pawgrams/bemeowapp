import SilentErrorBoundary from '../SilentErrorBoundary'; 
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
export const GetSolBalance = () => {
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  const [balance, setBalance] = useState(0);
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  useEffect(() => {
    try{
        if (!connection || !publicKey) {
          return;
        }
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        const fetchBalance = async () => {
          const accountInfo = await connection.getAccountInfo(publicKey);
          if (accountInfo) {
            setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
          }
        };
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        fetchBalance();
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        const subscriptionId = connection.onAccountChange(publicKey, (updatedAccountInfo) => {
          setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
        });
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        return () => {
          connection.removeAccountChangeListener(subscriptionId);
        };
    } catch(e){}
  }, [connection, publicKey]);
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  try{
      return (
        <SilentErrorBoundary>
          <div>
            <p>{publicKey ? `Balance: ${balance.toFixed(3)} SOL` : ""}</p>
          </div>
        </SilentErrorBoundary>
      );
  } catch(e){}
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
export default GetSolBalance;
