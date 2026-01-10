import SilentErrorBoundary from '../SilentErrorBoundary'; 
import React, { forwardRef } from 'react';
import { PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { presaleAddress } from '../utils/presaleAddress';
import { allowedAssets } from '../utils/allowedAssets';
import { useConnection, useCheckRefCode } from '../hooks';
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type SendViaTrustButtonProps = {
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
  latestCoinValue: number;
  trustActive: boolean,
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const useSendViaTrust = (
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
  latestCoinValue: number,
  trustActive: boolean,
) => {
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const sendAsset = async () => {
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      const getFallbackLink = (isIOS: boolean, isAndroid: boolean) => {
          try{
          if (isAndroid) {
            return "https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp&hl=en";
          } else if (isIOS) {
            return "https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409";
          } else {
            return "https://trustwallet.com/de/download";
          }
        }catch(e){return ""}
      };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const ua = navigator.userAgent;
    const isIOS = /iphone|ipad|ipod|ios/i.test(ua);
    const isAndroid = /android|XiaoMi|MiuiBrowser/i.test(ua);
    const isMobile = isIOS || isAndroid;
    const presalePubkey = new PublicKey(presaleAddress);
    const coinID = 501; // solana
    const numericAmount: number = parseFloat(amount);
    const errorMsg1 = "Meowch 😿 Something went wrong";
    const errorMsg2 = "Retry or ask support@bemeow.club";
    const errorMsg3 = "⚠️";
    let successMsg1 = "MEEEOOOW! 😻🫶 TX SUCCESS:";
    let successMsg2 = "https://solscan.io/tx/";
    let successMsg3 = "✅";


    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    try {
      if (numericAmount / latestCoinValue < minVal - minValTolerance) {
        setUserMsg1("Meowch 😿 Min value undercut:");
        setUserMsg2(`Minimum buy value is $${minVal}`);
        setUserMsg3(errorMsg3);
        return;
      } else if (numericAmount / latestCoinValue > maxVal + maxValTolerance) {
        setUserMsg1("Meowch 😿 Max value exceeded:");
        setUserMsg2(`Maximum buy value is $${maxVal}`);
        setUserMsg3(errorMsg3);
        return;
      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      } else {
        if (refCode && refCode !== "") {
          if (isValidRef === false) {
            setUserMsg1("Meowch 😿 Invalid referral code:");
            setUserMsg2("Must be a Solana wallet address");
            setUserMsg3(errorMsg3);
            return;
          } else if (publicKey && refCode === publicKey.toBase58()) {
            setUserMsg1("Meowch 😿 Invalid referral code:");
            setUserMsg2("No self-referral allowed.");
            setUserMsg3(errorMsg3);
            return;
          }
        }
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        if (isMobile) {
          try{
            let deepLink = "";
            if (selectedAsset === "SOL") {
              deepLink = `https://link.trustwallet.com/send?asset=c${coinID}&address=${presaleAddress}&amount=${numericAmount}&memo=${refCode}`;
            } else {
              const currAssetMintAddress = allowedAssets[selectedAsset][0];
              const presaleAtaPubkey = await getAssociatedTokenAddress(
                new PublicKey(currAssetMintAddress),
                presalePubkey,
                false,
                TOKEN_PROGRAM_ID
              );
              if (presaleAtaPubkey) {
                const presaleAtaAddress = presaleAtaPubkey.toBase58();
                deepLink = `https://link.trustwallet.com/send?asset=c${coinID}_t${currAssetMintAddress}&address=${presaleAddress}&amount=${numericAmount}&memo=${refCode}`;
              }
            }
            window.location.href = deepLink;
          }catch(e){}
          }
      }
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    } catch (e) {
      window.open(getFallbackLink(isIOS, isAndroid), "_blank");
      setUserMsg1(errorMsg1);
      setUserMsg2(errorMsg2);
      setUserMsg3(errorMsg3);
    }
  };
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  return { sendAsset };
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const SendViaTrustButton = forwardRef<HTMLButtonElement, SendViaTrustButtonProps>(
  (
    {
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
      trustActive,
    },
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  ) => {
    const isValidRef = useCheckRefCode(refCode);
    const { sendAsset } = useSendViaTrust(
      setUserMsg1,
      setUserMsg2,
      setUserMsg3,
      selectedAsset,
      amount,
      refCode,
      isValidRef,
      minVal,
      maxVal,
      minValTolerance,
      maxValTolerance,
      positionValue,
      CoinValue,
      latestCoinValue,
      trustActive,
    );
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const handleClick = () => {
      sendAsset();
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return (
      <SilentErrorBoundary>
        <div>
          <button
            className="send-button"
            disabled={disabled}
            onClick={handleClick}
          >
            BEME ME UP
          </button>
        </div>
      </SilentErrorBoundary>
    );
  }
);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default SendViaTrustButton;





