import { Transaction, PublicKey, Connection } from "@solana/web3.js";
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const sendLegacyViaMagicEden = async (wallet: any, publicKey: PublicKey, connection: Connection, legacyTransaction: Transaction) => {
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    try {
        //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        let currWallet; let currWalletName: any; let window: any; let isMagicEden = false; let currAdapter;
        if(wallet && wallet?.adapter && wallet?.adapter.name){
            currWalletName = wallet?.adapter.name;
            currAdapter = wallet?.adapter;
            currWallet = wallet;
        }
        //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        if(window && window.magicEden && window.magicEden?.solana){
            isMagicEden = true
        }
        //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        let signature: any;
        if( connection && currAdapter && currWalletName.toLowerCase().includes("magic") && currWalletName.toLowerCase().includes("eden") ){
            signature  = await currAdapter.sendTransaction(legacyTransaction, connection);
            return signature;
        } else if(isMagicEden){
            const magicEdenProvider = window.magicEden?.solana;
            signature  = await magicEdenProvider.sendTransaction(legacyTransaction);
            return signature;
        } else {
            return false;
        }
        //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    } catch (error) {
        return null;
    }
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  };