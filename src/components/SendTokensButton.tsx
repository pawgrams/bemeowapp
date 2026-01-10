import SilentErrorBoundary from '../SilentErrorBoundary'; 
import React, { useState, useEffect, useRef } from 'react';
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
import { allowedAssets } from '../utils/allowedAssets';
import { useConnection, useCheckRefCode } from '../hooks';
import { ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress, TokenInvalidAccountOwnerError, TokenAccountNotFoundError, createTransferInstruction, Account, getAccount, createAssociatedTokenAccountInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import MobileDetect from 'mobile-detect';
import { walletTxVersion } from '../utils/walletTxVersion';
import { sendLegacyViaMagicEden } from '../utils/sendLegacyViaMagicEden';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
type SendTokensButtonProps = {
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
    isDisconnected:boolean;
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
export const useSendTokens = (
    setUserMsg1: (message: string | null) => void, 
    setUserMsg2: (message: string | null) => void, 
    setUserMsg3: (message: string | null) => void,
    selectedAsset: any,
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
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const { publicKey, wallet, disconnect, sendTransaction, connected, connect } = useWallet();
    const { endpoint, connection, isConnected }  = useConnection();
    let _connection: Connection | null = connection;
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
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
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const sendTokens = async () => {
        try{
            const errorMsg1 = "Meowch 😿 Something went wrong";
            const errorMsg2 = "Please retry or try another wallet.";
            const errorMsg3 = "⚠️";
            const successMsg1 = "MEEEOOOW! 😻🫶 SUCCESS:";
            let successMsg2 = "https://solscan.io/tx/";
            const successMsg3 = "✅";
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
            try {
                const presalePubkey = new PublicKey(presaleAddress);
                const currAssetMintAddress: any = allowedAssets[selectedAsset][0];
                const md = new MobileDetect(window.navigator.userAgent);
                const currAssetMintPubkey = new PublicKey(currAssetMintAddress);
                const currAssetProgramAddress = allowedAssets[selectedAsset][2];
                const currAssetProgramPubkey = new PublicKey(currAssetProgramAddress);
                const PRIORITY_FEE = 1_000_000; 
                const decimals: number = Number(allowedAssets[selectedAsset][1]);
                const numericAmount: number = parseFloat(amount);
                const _amount = numericAmount * decimals;
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
                            return
                        }
                    }
                }
                // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                if(publicKey && currAssetMintPubkey && presalePubkey && currAssetProgramPubkey && ASSOCIATED_TOKEN_PROGRAM_ID){
                    try {
                        await connectIfNot();
                        if (!publicKey) {
                            setUserMsg1("Meowch 😿 Please connect a wallet first:");
                            setUserMsg2(`Choose a Solana wallets from the list`);
                            setUserMsg3(errorMsg3);
                            return;
                        } else if (selectedAsset === 'SOL'){
                                return;
                        } else if( !PublicKey.isOnCurve(publicKey) ){
                            setUserMsg1("Meowch 😿 address invalid:");
                            setUserMsg2(`Please use a normal Solana wallet address`);
                            setUserMsg3(errorMsg3);
                            return;
                        } else if ( ( numericAmount * latestCoinValue ) < ( minVal - minValTolerance ) ){
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
                        } else if ((wallet && (wallet.adapter.name).toLowerCase().includes("brave") && md.mobile())) {
                            disconnect().then(() => {});
                            setUserMsg1("Meowch 😿 Brave mobile wallet not supported:");
                            setUserMsg2(`Please try another wallet.`);
                            setUserMsg3(errorMsg3);
                            return;      
                        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                        } else {
                            await connectIfNot();
                            let senderAtaPubkey = await getAssociatedTokenAddress(
                                currAssetMintPubkey,
                                publicKey,
                                false,
                                currAssetProgramPubkey
                            );
                            let presaleAtaPubkey = await getAssociatedTokenAddress(
                                currAssetMintPubkey,
                                presalePubkey,
                                false,
                                currAssetProgramPubkey
                            );
                            let presaleAtaPubkeyInfo: Account;
                            let presaleAtaPubkeyExists: null | boolean = false;
                            let associatedTokenAccountInstruction;
                            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                            try {
                                if(!isConnected){
                                    _connection = await connectToEndpoint();
                                }
                                presaleAtaPubkeyInfo = await getAccount(_connection!, presaleAtaPubkey, "finalized", TOKEN_PROGRAM_ID);
                                if(presaleAtaPubkeyInfo){
                                    presaleAtaPubkeyExists = true;
                                } else {
                                    presaleAtaPubkeyExists = false;
                                }
                            } catch (error: unknown) {
                                if (error instanceof TokenAccountNotFoundError || error instanceof TokenInvalidAccountOwnerError) {
                                    presaleAtaPubkeyExists = false;
                                }
                            }
                            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                            await connectIfNot();
                            if (
                                !isNaN(numericAmount) 
                                && publicKey 
                                && PublicKey.isOnCurve(publicKey) 
                                && _connection! 
                                && PublicKey.isOnCurve(presalePubkey)
                            ) {
                                // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                let instructions: TransactionInstruction[] = [];
                                let legacyTransaction= new Transaction();
                                if(!isConnected){
                                    _connection = await connectToEndpoint();
                                }
                                await connectIfNot();
                                const senderSolBalance = await _connection!.getBalance(publicKey); 
                                // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                let receiverBalance = 0;
                                let rentExemptionAmount = await _connection!.getMinimumBalanceForRentExemption(0);
                                if(!presaleAtaPubkeyExists){
                                    await connectIfNot();
                                    associatedTokenAccountInstruction = createAssociatedTokenAccountInstruction(
                                        publicKey,
                                        presaleAtaPubkey,
                                        presalePubkey,
                                        currAssetMintPubkey,
                                        TOKEN_PROGRAM_ID,
                                        ASSOCIATED_TOKEN_PROGRAM_ID
                                    )
                                    instructions.push(associatedTokenAccountInstruction);
                                    legacyTransaction.add(associatedTokenAccountInstruction);
                                } else {
                                    receiverBalance = await _connection!.getBalance(presaleAtaPubkey);
                                }
                                if (receiverBalance < rentExemptionAmount) {
                                    rentExemptionAmount = rentExemptionAmount - receiverBalance;   
                                } else {
                                    rentExemptionAmount = 0;
                                }
                                if(rentExemptionAmount > 0){
                                    await connectIfNot();
                                    const rentFundingInstruction = SystemProgram.transfer({
                                        fromPubkey: publicKey,
                                        toPubkey: presaleAtaPubkey,
                                        lamports: rentExemptionAmount
                                    });
                                    instructions.push(rentFundingInstruction);
                                    legacyTransaction.add(rentFundingInstruction);
                                }
                                // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                let senderAtaPubkeyInfo: Account;
                                let senderAtaPubkeyExists: null | boolean = false;
                                try {
                                    if(!isConnected){
                                        _connection = await connectToEndpoint();
                                    } 
                                    senderAtaPubkeyInfo = await getAccount(_connection!, senderAtaPubkey, "finalized", TOKEN_PROGRAM_ID);
                                    if(senderAtaPubkeyInfo){
                                        senderAtaPubkeyExists = true;
                                    } else {
                                        senderAtaPubkeyExists = false;
                                    }
                                } catch (error: unknown) {
                                    if (error instanceof TokenAccountNotFoundError || error instanceof TokenInvalidAccountOwnerError) {
                                        senderAtaPubkeyExists = false;
                                    }
                                }
                                let senderTokenBalanceInfo;
                                let senderTokenBalance;
                                if(senderAtaPubkeyExists){
                                    if(!isConnected){
                                        _connection = await connectToEndpoint();
                                    }
                                    senderTokenBalanceInfo = await _connection!.getTokenAccountBalance(senderAtaPubkey);
                                    if(senderTokenBalanceInfo && senderTokenBalanceInfo.value && senderTokenBalanceInfo.value.amount){
                                        senderTokenBalance = Number(senderTokenBalanceInfo.value.amount);
                                    }  
                                }
                                // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                if( senderSolBalance < (rentExemptionAmount + (PRIORITY_FEE / 1000000) ) ){
                                    setUserMsg1("Insufficient Sol funds. Need at least:");
                                    setUserMsg2(`${((rentExemptionAmount + (PRIORITY_FEE / 1000000)) / LAMPORTS_PER_SOL).toFixed(8)} SOL for fees`); 
                                    setUserMsg3(errorMsg3);
                                    return;
                                } else if( !senderAtaPubkeyExists || !senderTokenBalanceInfo || !senderTokenBalance ){
                                    let _selectedAsset = selectedAsset;
                                    if(selectedAsset === "BONK"){_selectedAsset = "Bonk"};
                                    setUserMsg1(`Need ${selectedAsset} on Solana before using it:`); 
                                    setUserMsg2(`You can Swap or Bridge here (see top left).`);
                                    setUserMsg3(errorMsg3);
                                    return;
                                } else if( senderTokenBalance < _amount ){
                                    setUserMsg1(`Insufficient ${selectedAsset} funds. Need at least:`); 
                                    setUserMsg2(`${numericAmount.toFixed(5)} ${selectedAsset}`); 
                                    setUserMsg3(errorMsg3);
                                    return;
                                } else {
                                    await connectIfNot();
                                    const sendTokensInstruction = createTransferInstruction(
                                        senderAtaPubkey,
                                        presaleAtaPubkey,
                                        publicKey,
                                        _amount,
                                        [],
                                        currAssetProgramPubkey,
                                    );
                                    instructions.push(sendTokensInstruction);
                                    legacyTransaction.add(sendTokensInstruction);
                                    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                    if (refCode && refCode !== "") {
                                        try {
                                            await connectIfNot();
                                            if (isValidRef === false) {
                                                setUserMsg1("Meowch 😿 invalid referral code:");
                                                setUserMsg2("Must be active Solana wallet address");
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
                                                    }],
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
                                        if( wallet && wallet.adapter && wallet.adapter.name && (String(wallet.adapter.name)).toLowerCase().includes(key) ){
                                            transactionVersion = walletTxVersion[key];
                                            break;
                                        }
                                        } catch(e){}
                                    }
                                    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                    const getTxStatus = async (_connection: Connection | null, signature: string) => {
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
                                        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                        if(instructions && blockhash && messageV0 && transaction){
                                            if(!isConnected){
                                                _connection = await connectToEndpoint();
                                            }
                                            const signature = await sendTransaction(transaction, _connection!);
                                            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
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
                                            } else {
                                                setUserMsg1(errorMsg1); setUserMsg2(errorMsg2); setUserMsg3(errorMsg3);
                                                alert(`7:`);
                                                return;
                                            }
                                        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                        } else {
                                            setUserMsg1(errorMsg1); setUserMsg2(errorMsg2); setUserMsg3(errorMsg3);
                                            return;
                                        }   
                                    } else {
                                        setUserMsg1(errorMsg1); setUserMsg2(errorMsg2); setUserMsg3(errorMsg3);
                                        return;
                                    }
                                }
                            } else {
                                setUserMsg1(errorMsg1); setUserMsg2(errorMsg2); setUserMsg3(errorMsg3);
                                return;
                            }
                        }
                    } catch (error) {
                        setUserMsg1(errorMsg1); setUserMsg2(errorMsg2); setUserMsg3(errorMsg3);
                        return;
                    }
                } else {
                    setUserMsg1(errorMsg1); setUserMsg2(errorMsg2); setUserMsg3(errorMsg3);
                    return;
                }
            } catch (error) {
                setUserMsg1(errorMsg1); setUserMsg2(errorMsg2); setUserMsg3(errorMsg3);
                return;
            }
        }catch(error){
            return;
        }
    }
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    return { sendTokens };
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
const SendTokensButton: React.FC<SendTokensButtonProps> = ({ 
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
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const isValidRef = useCheckRefCode(refCode);
    const { sendTokens } = useSendTokens(
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
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const handleClick = async () => {
        const sendButton = document.querySelector(".send-button") as HTMLButtonElement;
        if(sendButton){sendButton.disabled = true;}
        await sendTokens();
        if(sendButton){sendButton.disabled = false;}
    };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
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
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
export default SendTokensButton;