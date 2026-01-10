import SilentErrorBoundary from '../SilentErrorBoundary'; 
import React, { useEffect } from 'react';
import {
    PublicKey,
    SystemProgram,
    LAMPORTS_PER_SOL,
    ComputeBudgetProgram,
    VersionedTransaction,
    TransactionMessage,
    TransactionInstruction,
    Transaction,
    Connection,
} from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { presaleAddress } from '../utils/presaleAddress';
import { useConnection, useCheckRefCode } from '../hooks';
import { walletTxVersion } from '../utils/walletTxVersion';
import { sendLegacyViaMagicEden } from '../utils/sendLegacyViaMagicEden';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type SendSolanaButtonProps = {
    disabled: boolean;
    setUserMsg1: (message: string | null) => void;
    setUserMsg2: (message: string | null) => void;
    setUserMsg3: (message: string | null) => void;
    selectedAsset: string;
    amount: string;
    refCode: string;
    minVal: number;
    maxVal: number;
    minValTolerance: number;
    maxValTolerance: number;
    positionValue: number;
    CoinValue: number;
    latestCoinValue:number;
    isDisconnected: boolean;
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const useSendSolana = (
    setUserMsg1: (message: string | null) => void,
    setUserMsg2: (message: string | null) => void,
    setUserMsg3: (message: string | null) => void,
    selectedAsset: string,
    amount: string,
    refCode: string,
    isValidRef: boolean | null,
    minVal: number,
    maxVal: number,
    minValTolerance: number,
    maxValTolerance: number,
    positionValue: number,
    CoinValue: number,
    latestCoinValue:number,
    isDisconnected:boolean,
) => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const { publicKey, wallet, disconnect, sendTransaction, connected, connect } = useWallet();
    const { endpoint, connection, isConnected }  = useConnection();
    let _connection: Connection | null = connection;
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*
    useEffect(() => {
        try{
            if ((wallet && window.solana && window.solana.isPhantom && window.solana.phantom)) {
                window.solana.phantom.disconnect().then(() => {});
                return;
            }
        }catch(e){}
    }, []);
*/
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const connectToEndpoint = async () => {
        const _connection = new Connection(endpoint, 'confirmed');
        return _connection;
    }
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const sendSol = async () => {
        try{
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            selectedAsset = "SOL";
            const presaleAddressSol = presaleAddress;
            const presalePubkeySol = new PublicKey(presaleAddressSol);
            const PRIORITY_FEE = 1_000_000; 
            const numericAmount: number = parseFloat(amount);
            const errorMsg1 = "Meowch 😿 Something went wrong ...";
            const errorMsg2 = "Please retry or try another wallet.";
            const errorMsg3 = "⚠️";
            const successMsg1 = "MEEEOOOW! 😻🫶 SUCCESS:";
            let successMsg2 = "https://solscan.io/tx/";
            const successMsg3 = "✅";
            const catExplosionutton = document.querySelector(".cat-explosion-button") as HTMLButtonElement;
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
            const connectIfNot = async () => {
                if(!connected){
                    try {
                        await wallet?.adapter.connect();
                    } catch(e){
                        try{
                            await wallet?.adapter.connect();
                        } catch(e){
                            setUserMsg1("Meowch 😿 Problems with Wallet Connection");
                            setUserMsg2(`Please ensure connection or try another wallet.`);
                            setUserMsg3(errorMsg3);
                        }
                    }
                }
                return;
            }
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
            try {
                await connectIfNot();
                if (!publicKey) {
                    setUserMsg1("Meowch 😿 Please connect a wallet first:");
                    setUserMsg2(`Choose a Solana wallets from the list`);
                    setUserMsg3(errorMsg3);
                    return;

                } else if(selectedAsset !== 'SOL'){
                    return;

                } else if( !PublicKey.isOnCurve(publicKey) ){
                    setUserMsg1("Meowch 😿 address invalid:");
                    setUserMsg2(`Please use a normal Solana wallet address`);
                    setUserMsg3(errorMsg3);
                    return;

                }else if( ( numericAmount * latestCoinValue ) < ( minVal - minValTolerance ) ){
                    setUserMsg1("Meowch 😿 min value undercut:");
                    setUserMsg2(`Minimum buy value is $${minVal}`);
                    setUserMsg3(errorMsg3);
                    return;

                } else if ( ( numericAmount * latestCoinValue ) > ( maxVal + maxValTolerance ) ){
                    setUserMsg1("Meowch 😿 max value exceeded:");
                    setUserMsg2(`Maximum buy value is $${maxVal}`);
                    setUserMsg3(errorMsg3);
                    return;

                    /*
                } else if ((wallet && (wallet.adapter.name).toLowerCase().includes("phantom"))) {
                    disconnect().then(() => {});
                    setUserMsg1("Meowch 😿 Phantom not supported:");
                    setUserMsg2(`Please try another wallet.`);
                    setUserMsg3(errorMsg3);
                    return;
*/
                // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                } else {
                    const amount = numericAmount * LAMPORTS_PER_SOL;
                    await connectIfNot();
                    if (!isNaN(numericAmount) && publicKey && PublicKey.isOnCurve(publicKey) && connection) {
                        try {
                            let instructions: TransactionInstruction[] = [];
                            let legacyTransaction= new Transaction();
                            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                            if(!isConnected){
                                _connection = await connectToEndpoint();
                            }
                            await connectIfNot();
                            const senderBalance = await _connection!.getBalance(publicKey);
                            const receiverBalance = await _connection!.getBalance(presalePubkeySol);
                            let rentExemptionAmount = await _connection!.getMinimumBalanceForRentExemption(0);
                            if (receiverBalance < rentExemptionAmount) {
                                rentExemptionAmount = rentExemptionAmount - receiverBalance;
                            } else {
                                rentExemptionAmount = 0;
                            }
                            if (rentExemptionAmount > 0) {
                                await connectIfNot();
                                const rentFundingInstruction = SystemProgram.transfer({
                                    fromPubkey: publicKey,
                                    toPubkey: presalePubkeySol,
                                    lamports: rentExemptionAmount
                                });
                                instructions.push(rentFundingInstruction);
                                legacyTransaction.add(rentFundingInstruction);
                            }
                            if (senderBalance < (amount + rentExemptionAmount + (PRIORITY_FEE / 1000000))) {
                                setUserMsg1("Insufficient Sol funds. Need at least:");
                                setUserMsg2(`${((amount + rentExemptionAmount + (PRIORITY_FEE / 1000000)) / LAMPORTS_PER_SOL).toFixed(5)} SOL (excl. Fees)`);
                                setUserMsg3(errorMsg3);
                                return;
                            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                            } else {
                                await connectIfNot();
                                const sendSolInstruction = SystemProgram.transfer({
                                    fromPubkey: publicKey,
                                    toPubkey: presalePubkeySol,
                                    lamports: amount,
                                });
                                instructions.push(sendSolInstruction);
                                legacyTransaction.add(sendSolInstruction);
                                // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                if (refCode && refCode !== "") {
                                    try {
                                        await connectIfNot();
                                        if (isValidRef === false) {
                                            setUserMsg1("Meowch 😿 invalid referral code:");
                                            setUserMsg2("Must be active Solana wallet address.");
                                            setUserMsg3(errorMsg3);
                                            return;
                                        } else if (refCode === publicKey.toBase58()) {
                                            setUserMsg1("Meowch 😿 invalid referral code:");
                                            setUserMsg2("No self-referral allowed.");
                                            setUserMsg3(errorMsg3);
                                            return;
                                        } else if (isValidRef === true) {
                                            await connectIfNot();
                                            const memoInstruction = new TransactionInstruction({
                                                keys: [{
                                                    pubkey: publicKey,
                                                    isSigner: true,
                                                    isWritable: true
                                                },],
                                                data: Buffer.from(refCode, "utf-8"),
                                                programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
                                            });
                                            instructions.push(memoInstruction);
                                            legacyTransaction.add(memoInstruction);
                                        }
                                    } catch (e) {
                                        setUserMsg1(errorMsg1); setUserMsg2(errorMsg2); setUserMsg3(errorMsg3);
                                        return;
                                    }
                                };
                                // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                const priorityFeeInstruction = ComputeBudgetProgram.setComputeUnitPrice({
                                    microLamports: PRIORITY_FEE,
                                });
                                instructions.push(priorityFeeInstruction);
                                legacyTransaction.add(priorityFeeInstruction);
                                // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                let transactionVersion: number = 1;
                                    for(const key of Object.keys(walletTxVersion)){
                                        try{
                                            if( wallet && wallet.adapter && wallet.adapter.name && (wallet.adapter.name).toLowerCase().includes(key) ){
                                                transactionVersion = walletTxVersion[key];
                                                break;
                                            }
                                        } catch(e){}
                                    }
                                // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                const getTxStatus = async (_connection: Connection, signature: string) => {
                                    let status: boolean | null = null;
                                    let statusMsg: any;
                                    let retry = 0;
                                    while (status === null && retry < 10) {
                                        if(!isConnected){
                                            _connection = await connectToEndpoint();
                                        }
                                        const statusResponse = await _connection!.getSignatureStatuses([signature]);
                                        statusMsg = statusResponse?.value?.[0];
                                        if (statusMsg && statusMsg.confirmationStatus === 'confirmed'){
                                            status = true;
                                        } else if (statusMsg && statusMsg.err) {
                                            status = false;
                                        } else if (statusMsg && statusMsg.confirmationStatus !== 'confirmed'){
                                            status = null;
                                        } else {
                                            status = null;
                                        }
                                        retry +=1;
                                        await new Promise((resolve) => setTimeout(resolve, 1000));
                                    }
                                    return status;
                                }
                                // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  
                                const setLoadingMsg = () => {
                                    setUserMsg1("Transaction sent"); setUserMsg2("waiting for confirmation"); setUserMsg3(". . . ");
                                    return;
                                }
                                // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -       
                                if(transactionVersion === 1){
                                    if(!isConnected){
                                        _connection = await connectToEndpoint();
                                    }
                                    const blockhash = await _connection!
                                    .getLatestBlockhash()
                                    .then(res => res.blockhash);
                                    await connectIfNot();
                                    const messageV0 = new TransactionMessage({
                                        payerKey: publicKey,
                                        recentBlockhash: blockhash,
                                        instructions,
                                    }).compileToV0Message();
                                    const transaction = new VersionedTransaction(messageV0);
                                    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                    if(instructions && blockhash && messageV0 && transaction){
                                        if(!isConnected){
                                            _connection = await connectToEndpoint();
                                        }
                                        const signature = await sendTransaction(transaction, _connection!);
                                        if(signature){
                                            setLoadingMsg();
                                            const txStat = await getTxStatus(_connection!, signature);
                                            if(txStat){
                                                successMsg2 += `${signature}`;
                                                setUserMsg1(successMsg1); setUserMsg2(successMsg2); setUserMsg3(successMsg3);
                                                if(catExplosionutton){
                                                    catExplosionutton.click();
                                                    catExplosionutton.click();
                                                    catExplosionutton.click();
                                                }
                                            } else if (txStat === false){
                                                setUserMsg1("Meowch 😿 transaction failed:");
                                                setUserMsg2(errorMsg2); setUserMsg3(errorMsg3);
                                                return;
                                            } else {
                                                setUserMsg1(errorMsg1); setUserMsg2(errorMsg2); setUserMsg3(errorMsg3);  
                                                return;
                                            }
                                        } else {
                                            setUserMsg1(errorMsg1); setUserMsg2(errorMsg2); setUserMsg3(errorMsg3);
                                            return;
                                        }
                                    } else {
                                        setUserMsg1(errorMsg1); setUserMsg2(errorMsg2); setUserMsg3(errorMsg3);
                                    }
                                // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                } else if(transactionVersion === 0){
                                    const _wallet: any = wallet;
                                    if(!isConnected){
                                        _connection = await connectToEndpoint();
                                    }
                                    const blockhash = await _connection!.getLatestBlockhash();
                                    if(instructions && blockhash && _connection && legacyTransaction){
                                        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                        await connectIfNot();
                                        let signature: any;
                                        signature = await sendLegacyViaMagicEden(wallet, publicKey, _connection!, legacyTransaction);
                                        if(signature === null){
                                            setUserMsg1(errorMsg1); setUserMsg2(errorMsg2); setUserMsg3(errorMsg3); 
                                            return;
                                        } else if (signature === false) {
                                            const { _signature } = await _wallet.signAndSendTransaction(legacyTransaction);
                                            signature = _signature;
                                        } 
                                        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                        if(signature){
                                            setLoadingMsg();
                                            if(!isConnected){
                                                _connection = await connectToEndpoint();
                                            }
                                            const txStat = await getTxStatus(_connection!, signature);
                                            if(txStat){
                                                successMsg2 += `${signature}`;
                                                setUserMsg1(successMsg1); setUserMsg2(successMsg2); setUserMsg3(successMsg3);
                                                if(catExplosionutton){
                                                    catExplosionutton.click();
                                                    catExplosionutton.click();
                                                    catExplosionutton.click();
                                                }
                                            } else if (txStat === false){
                                                setUserMsg1("Meowch 😿 transaction failed:");
                                                setUserMsg2(errorMsg2); setUserMsg3(errorMsg3);
                                                return;
                                            } else {setUserMsg1(errorMsg1); setUserMsg2(errorMsg2); setUserMsg3(errorMsg3);  
                                                return;
                                            }
                                        } else {setUserMsg1(errorMsg1); setUserMsg2(errorMsg2); setUserMsg3(errorMsg3);
                                            return;
                                        }
                                    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                    } else {setUserMsg1(errorMsg1); setUserMsg2(errorMsg2); setUserMsg3(errorMsg3);
                                        return;
                                    }   
                                } else {setUserMsg1(errorMsg1); setUserMsg2(errorMsg2); setUserMsg3(errorMsg3);
                                    return;
                                }
                            }
                        } catch(e){
                            setUserMsg1(errorMsg1); setUserMsg2(errorMsg2); setUserMsg3(errorMsg3);
                            return;
                        }
                    } else {setUserMsg1(errorMsg1); setUserMsg2(errorMsg2); setUserMsg3(errorMsg3);}
                }
            } catch (error) {
                setUserMsg1(errorMsg1); setUserMsg2(errorMsg2); setUserMsg3(errorMsg3);
                return;
            }
        }catch(e){return;}
    }
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return { sendSol };
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const SendSolanaButton: React.FC<SendSolanaButtonProps> = ({ 
    disabled, 
    setUserMsg1, 
    setUserMsg2, 
    setUserMsg3, 
    selectedAsset, 
    amount, 
    refCode,
    minVal,
    maxVal,
    minValTolerance,
    maxValTolerance,
    positionValue,
    CoinValue,
    latestCoinValue,
    isDisconnected,
}) => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const isValidRef = useCheckRefCode(refCode);
    const { sendSol } = useSendSolana(
        setUserMsg1, 
        setUserMsg2, 
        setUserMsg3, 
        selectedAsset, 
        amount, refCode, 
        isValidRef,
        minVal,
        maxVal,
        minValTolerance,
        maxValTolerance,
        positionValue,
        CoinValue,
        latestCoinValue,
        isDisconnected,
    );
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const handleClick = async () => {
        const sendButton = document.querySelector(".send-button") as HTMLButtonElement;
        if(sendButton){sendButton.disabled = true;}
        await sendSol();
        if(sendButton){sendButton.disabled = false;}
    };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
try{
    return (
        <SilentErrorBoundary>
            <div>
                <button
                    className="send-button"
                    disabled={disabled}
                    onClick={handleClick}
                >
                {isDisconnected ? ('Connect Wallet') : ('BEME ME UP')}
                    
                </button>
            </div>
        </SilentErrorBoundary>
    );
}catch(e){}
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default SendSolanaButton;
