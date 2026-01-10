import { useState, useEffect, useCallback } from "react";
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const useWalletConnect = (wallet: any) => {
  //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const connectWallet = useCallback(async () => {
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    try {
      if (!wallet.connected) {
        await wallet.connect();
      }
      if (wallet.publicKey) {
        setPublicKey(wallet.publicKey.toBase58());
      }
    } catch (err) {}
  }, [wallet]);
  //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const disconnectWallet = useCallback(async () => {
    try {
      if (wallet.connected) {
        await wallet.disconnect();
      }
      setPublicKey(null);
    } catch (err) {}
  }, [wallet]);
  //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  useEffect(() => {
      try{
          wallet.on("connect", () => {
              if (wallet.publicKey) {setPublicKey(wallet.publicKey.toBase58());}
          });
          wallet.on("disconnect", () => {setPublicKey(null);});
          return () => {
              wallet.off("connect");
              wallet.off("disconnect");
          };
      } catch(e){}
  }, [wallet]);
  //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  try{
    return {
      publicKey,
      connectWallet,
      disconnectWallet,
    };
} catch(e){}
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
};
