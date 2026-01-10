import ErrorBoundary from './ErrorBoundary'; 
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { PublicKey } from '@solana/web3.js';
import CustomSelect from './CustomSelect';
import { getPriceViaBinance } from './utils/getPriceViaBinance';
import SendSolanaButton from './components/SendSolanaButton';
import SendTokensButton from './components/SendTokensButton';
import { allowedAssets } from './utils/allowedAssets';
import AffiliateField from './components/AffiliateField';
import { useBatchdata } from './hooks';
import {remcon} from './utils/remcon'
import SendViaTrustButton from './components/SendViaTrustButton';
import WalletAdapterHandler from './components/WalletAdapterHandler';
import { useWallet } from '@solana/wallet-adapter-react';
import {disableJupButton, enableJupButton} from './utils/handleJupButton';
import MobileDetect from 'mobile-detect';
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const fetchLatestPrice = async (asset) => {
  let base = asset;
  try {
    if (base === "USDC" || base === "USDT") {
      return 1.00000;
    } else {
      const coinValue = await getPriceViaBinance(base, 'USDT');
      return coinValue;
    }
  } catch (error) {
    return 0;
  }
};
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const BatchSaleMask = ({ handleTermsClick }) => {

  const positionValueEmojiMap = { 0: "😿", 40: "😸", 250: "😼", 1000: "😽", 2500: "😻", 4500: "🙀",};
  //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const md = new MobileDetect(window.navigator.userAgent);
  const [ referralCode, setReferralCode ] = useState('');
  const { presaleGlobals, currentBatchData, nextBatchData, loading, batchMap, setCurrentBatchData, setNextBatchData } = useBatchdata();
  const { currentBatchID, nextBatchID, maxTokensForPresale, minBuyVal, maxBuyVal, minTolerance, maxTolerance } = presaleGlobals;
  const { currPrice, currTokensLeftInBatch, currEndTimestamp } = currentBatchData;
  const { nextPrice, nextTokensLeftInBatch, nextEndTimestamp } = nextBatchData;
  const allowedAssetsSymbols = Object.keys(allowedAssets);
  const { publicKey, wallet, connected } = useWallet(null);
  //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const [trustActive, setTrustActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [amount, setAmount] = useState(0.50);
  const [asset, setAsset] = useState('SOL');
  const [coinValue, setCoinValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [userMsg1, setUserMsg1] = useState('');
  const [userMsg2, setUserMsg2] = useState('');
  const [userMsg3, setUserMsg3] = useState('');
  const inputRef = useRef(null);
  const [tokensToReceive, setTokensToReceive] = useState(0);
  const [positionValue, setPositionValue] = useState(0);
  const priceRaisePercent = (nextPrice / currPrice) * 100 - 100;
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 useEffect(() => {
    try{
        const connButton = document.querySelector(".wallet-adapter-button-trigger");
        if (connButton) {
          const connButtonImage = connButton.querySelector('img');
          if (connButtonImage && connButtonImage.alt) {
              const connButtonAlt = connButtonImage.alt.toLowerCase();
            if (connButtonAlt.includes("trust") && md.mobile()) {
              setTrustActive(true);
            }
          }
        }
    } catch(e){}
 }, []);
 useEffect(() => {
  try{
      const timeoutId = setTimeout(() => {}, 1000);
      return () => clearTimeout(timeoutId);
  } catch(e){}
}, [trustActive]);
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const altValuesToFind = ['phantom', 'okx', 'solflare', 'backpack', 'ledger', 'trust', 'magic eden', 'coinbase', 'trezor', 'brave', 'bitget', 'torus', 'tokenary', 'xdefi', 'coin98', 'coinhub', 'glow'];
useEffect(() => {try{
    let interval;
    const timeout = setTimeout(() => {let checkCount = 0;
      interval = setInterval(() => {const connectButton = document.querySelector('.wallet-adapter-button-trigger');
      if(connectButton){const connectButtontext = connectButton.textContent?.toLowerCase();
        if(connectButtontext && !connectButtontext.includes("select") && connectButtontext.includes("connect")){
          const connectButtonIconElem = document.querySelector(".wallet-adapter-button-start-icon");
          if (connectButtonIconElem) {const connectButtonImage = connectButtonIconElem.querySelector('img');
            if (connectButtonImage) {const connectAlt = connectButtonImage.alt.toLowerCase();
              if(/*!connectAlt.includes("phantom") && */!connectAlt.includes("trust") && altValuesToFind.some(word => connectAlt.includes(word))){
                connectButton.click(); clearInterval(interval);
            }}}}}
      checkCount += 500;
      if (checkCount >= 15000) {
        clearInterval(interval);
      }
    }, 500);
  }, 1000); 
  return () => {
    clearTimeout(timeout);
    clearInterval(interval);
  };} catch(e){}
}, []);
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
useEffect(() => {try{
    setAmount("1.00");
    setTimeout(() => {setAmount("0.50");}, 10);
} catch(e){}
}, []);
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
try{const slider = document.querySelector('.slider');
  if(slider){
    slider.addEventListener('input', function() {
      const value = (this.value - this.min) / (this.max - this.min) * 100;
      this.style.background = `linear-gradient(to right, #0B998B ${value}%, #333 ${value}%)`;
    });
}} catch(e){}
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
useEffect(() => {
  try{const handleJupiter = async () => {
    if (wallet && wallet.adapter && wallet.adapter.name && wallet.adapter.name.toLowerCase().includes("solflare") ) {
        disableJupButton();
    } else {enableJupButton();}}
    const interval = setInterval(handleJupiter, 1000);
    return () => clearInterval(interval);
  } catch(e){}
})
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const POLL_INTERVAL = 3000;
useEffect(() => {try{
  const updateCountdown = () => {
      let endTme;
      if(currEndTimestamp){endTme = new Date(Number(currEndTimestamp) * 1000);
      } else { endTme = new Date((Number(currEndTimestamp) * 1000) + (24*60*60));}    
      const now = new Date();
      const diffMs = Number(endTme.getTime()) - Number(now.getTime());
      if (diffMs <= 0) {
          setTimeLeft("00:00:00");
          clearInterval(interval);
          handleCountdownEnd();
          return;
      }
      const hours = Number(Math.floor(Number(diffMs) / (1000 * 60 * 60)));
      const minutes = Number(Math.floor((Number(diffMs) % (1000 * 60 * 60)) / (1000 * 60)));
      const seconds = Number(Math.floor((Number(diffMs) % (1000 * 60)) / 1000));
      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
  };
  const interval = setInterval(updateCountdown, 1000);
  updateCountdown();
  return () => clearInterval(interval);
} catch(e){}
}, [currEndTimestamp, nextEndTimestamp, currentBatchID, nextBatchID]);
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
useEffect(() => {try{const pollTimestamps = () => {
      if (new Date(nextEndTimestamp * 1000) <= new Date()) {
        handleCountdownEnd();
      }};
    const intervalId = setInterval(pollTimestamps, POLL_INTERVAL);
    return () => clearInterval(intervalId);
  } catch(e){}
}, [currEndTimestamp, nextEndTimestamp, currentBatchID, nextBatchID]);
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const handleCountdownEnd = () => {
  try{
    if(currentBatchID && nextBatchID){
      // get new batch Ids - - - - - - - -
          const newCurrID = String(nextBatchID) || String(Number(currentBatchID)+1);
          const newNextID = String((Number(newCurrID) + 1));
          const newNexxtID = String((Number(newNextID) + 1));
        if(newCurrID && newNextID && newNexxtID){
            // get batch new data from batch map  - - - - - - - -
            const newCurrBatchData = batchMap[newCurrID];
            const newNextBatchData =  batchMap[newNextID];
            const newNexxtBatchData =  batchMap[newNexxtID];
            if(newCurrBatchData && newNextBatchData && newNexxtBatchData){
                // define fallback new current batch data- - - - - - - -
                const _currPrice = newCurrBatchData[4]? newCurrBatchData[4] : nextPrice || currPrice;
                let _currTokensLeftInBatch = 0;
                if(newCurrBatchData[2] && newCurrBatchData[3] && maxTokensForPresale){
                  _currTokensLeftInBatch = Number((newCurrBatchData[2] - newCurrBatchData[3]) * maxTokensForPresale / 100);
                } else if(newCurrBatchData[2] && maxTokensForPresale){
                  _currTokensLeftInBatch = Number(newCurrBatchData[2] * maxTokensForPresale / 100);
                } 
                _currTokensLeftInBatch = _currTokensLeftInBatch? _currTokensLeftInBatch : currTokensLeftInBatch || 0;
                const _currEndTimestamp = newNextBatchData[1]? newNextBatchData[1] : Math.ceil((Date.now() / 1000) + (24*60*60));
                // set new current batch data - - - - - - - -
                setCurrentBatchData({
                  currPrice: Number(_currPrice),
                  currTokensLeftInBatch: Number(_currTokensLeftInBatch),
                  currEndTimestamp: Number(_currEndTimestamp),
                });
                // define fallback new current batch data- - - - - - - -
                const _nextPrice = newNextBatchData[4]? newNextBatchData[4] : nextPrice;
                let _nextTokensLeftInBatch = 0;
                if(newNexxtBatchData[2] && newNexxtBatchData[3] && maxTokensForPresale){
                  _nextTokensLeftInBatch = Number((newNexxtBatchData[2] - newNexxtBatchData[3]) * maxTokensForPresale / 100);
                } else if(newNexxtBatchData[2] && maxTokensForPresale){
                  _nextTokensLeftInBatch = Number(newNexxtBatchData[2] * maxTokensForPresale / 100);
                } 
                _nextTokensLeftInBatch = _nextTokensLeftInBatch? _nextTokensLeftInBatch : nextTokensLeftInBatch || 0;
                const _nextEndTimestamp = newNexxtBatchData[1]? newNexxtBatchData[1] : Math.ceil((Date.now() / 1000) + (24*60*60*2));
                // set new current batch data - - - - - - - -
                setNextBatchData({
                  nextPrice: Number(_nextPrice),
                  nextTokensLeftInBatch: Number(_nextTokensLeftInBatch),
                  nextEndTimestamp: Number(_nextEndTimestamp),
                });
            }
        }
    }
  } catch(e){}
};
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  useEffect(() => {
    try{
      const fetchPrice = async () => {
        setIsLoading(true);
        const price = await fetchLatestPrice(asset);
        if (price !== null && !isNaN(price)) {
          setCoinValue(parseFloat(price));
        }
        setIsLoading(false);
      };
      fetchPrice();
      const intervalId = setInterval(fetchPrice, 15000);
      return () => clearInterval(intervalId);
  } catch(e){}
  }, [asset]);
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const handleSliderChange = (e) => {
  try{
    const percentage = e.target.value / 100;
    const valueInUSD = percentage * maxBuyVal;
    const calculatedAmount = (valueInUSD / coinValue).toFixed(2);
    setAmount(calculatedAmount); 
  } catch(e){}
};
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const handleAmountChange = (e) => {
  try{
    let { selectionStart, value } = e.target;
    let inputValue = value.replace(/[^0-9.,]/g, '');
    let addLeadingZero = false;
    if (inputValue.startsWith('.') || inputValue.startsWith(',')) {
        inputValue = '0' + inputValue;
        addLeadingZero = true;
    }
    inputValue = inputValue.replace(',', '.');
    const firstDotIndex = inputValue.indexOf('.');
    if (firstDotIndex !== -1) {
        inputValue = inputValue.slice(0, firstDotIndex + 1) + inputValue.slice(firstDotIndex + 1).replace(/\./g, '');
    }
    const parts = inputValue.split('.');
    if (parts.length > 2 || (parts.length === 2 && parts[0] === '')) {
        return;
    }
    if (parts[1] && parts[1].length > 2) {
        parts[1] = parts[1].slice(0, 2);
        inputValue = parts.join('.');
    }
    let numericValue = parseFloat(inputValue);
    if (isNaN(numericValue)) {numericValue = 0;}
    const valueInUSD = numericValue * coinValue; 
    if (valueInUSD > maxBuyVal) {numericValue = maxBuyVal / coinValue;}
    setAmount(numericValue.toFixed(2));
    const percentage = (valueInUSD / maxBuyVal) * 100;
    const slider = document.getElementById("slider");
    if (slider) {slider.value = percentage;}
  //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  setTimeout(() => {
      if (selectionStart !== null) {
          let nextPosition = selectionStart;
          if (addLeadingZero) {nextPosition += 1;}
          inputRef.current.setSelectionRange(nextPosition, nextPosition);
      }}, 0);
} catch(e){}};
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const handleAssetChange = async (newAsset) => {
  try{
    setAsset(newAsset);
    setCoinValue(coinValue);
    const inputRow = document.querySelector(".input-row");
    const assetAmount = inputRow.querySelector("input");
    const positionValueSpan = document.querySelector(".position-value-span");
    const assetPrice = document.querySelector(".asset-price");
    if(inputRow && positionValueSpan && assetAmount && assetPrice){
      inputRow.style.color = "#333";
      positionValueSpan.style.color = "#333";
      assetAmount.style.color = "#333";
      assetPrice.style.color = "#333";
    }
      let numericAmount = parseFloat(amount);
      if (isNaN(numericAmount)) numericAmount = 0;
      const newPrice = await fetchLatestPrice(newAsset);
      if (newPrice !== null && !isNaN(newPrice)) {
          numericAmount = (numericAmount * coinValue) / newPrice;
          const valueInUSD = numericAmount * newPrice;
          if (valueInUSD > maxBuyVal) {numericAmount = maxBuyVal / newPrice;}
          if(newAsset === "BONK"){setAmount(numericAmount.toFixed(0));
          } else {setAmount(numericAmount.toFixed(2));}
          setAsset(newAsset);
          setCoinValue(newPrice);
      }
      inputRow.style.color = "#ffffff";
      positionValueSpan.style.color = "#aaa";
      assetAmount.style.color = "#ffffff";
      assetPrice.style.color = "#aaa";
  } catch(e){}
};
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const validateReferralCode = () => {
    try {
        const referralCodePubkey = new PublicKey(referralCode);
        if (PublicKey.isOnCurve(referralCodePubkey)) {
          return true;
        } else {
          return false;
        }
    } catch (e) {
      return false;
    }
  };
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const handleButtonClick = () => {
    try {if (validateReferralCode()) {}} catch(e){}
  };
  //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  useEffect(() => {
    try{
      const tokens = Math.floor((coinValue * amount) / currPrice);
      const position = tokens * currPrice;
      setTokensToReceive(tokens);
      setPositionValue(position);
      setUserMsg1("You will receive:");
      setUserMsg2(`${tokens.toLocaleString("en-US")} $BEME`);
      setUserMsg3(getEmojiForPosition(position));
    } catch(e){}
  }, [amount, coinValue, currPrice, currEndTimestamp, nextEndTimestamp, currentBatchID, nextBatchID]);  
 //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const getEmojiForPosition = (value) => {
    try{
        let selectedEmoji = "😸";
        for (const [key, emoji] of Object.entries(positionValueEmojiMap)) {
          if (value >= parseInt(key)) {
            selectedEmoji = emoji;
          }
        }
        return selectedEmoji;
  } catch(e){}
  };
  const selectedEmoji = getEmojiForPosition(positionValue);
  useEffect(() => {remcon.inval();}, []);
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const isAmountValid = parseFloat(amount) > 0 && ((positionValue >= (minBuyVal)) && positionValue <= (maxBuyVal));
  const isDisabled = !isChecked || !isAmountValid || !publicKey || !wallet || !connected;
  const isTrustDisabled = !isChecked || !isAmountValid;
  const isDisconnected = !publicKey || !wallet || !connected;
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
useEffect(() => {
  try{
      const setUserMessages = async () => {
        setUserMsg1("You will receive:");
        setUserMsg2(`${tokensToReceive.toLocaleString("en-US")} $BEME`);
        setUserMsg3(selectedEmoji);
      };
      const interval = setInterval(setUserMessages, 25000);
      return () => clearInterval(interval);
} catch(e){}
}, [tokensToReceive, selectedEmoji]);
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
try{
  return (
    <ErrorBoundary>
      <div>
        <div className="mask-container">
          <div className="mask">
            <div className="mask-topspace"></div>
            <h1 className="icoTitle">Beats of Meow ICO</h1>
            <hr className = "main-title-line"></hr>

            {loading ? (<div><br></br>... loading data ...<br></br></div>) : (
                <div className="countdown">
                  <span className="countdown1">{timeLeft} </span>
                </div>
            )}
            {loading ? (<div><br className="loading-space-adjuster" style={{ lineHeight: '25.5px'}}></br></div>) : (
                <div className="preBatchText">
                  <span className="preBatchText1">to grab the last</span>
                </div>  
            )}
          {loading ? (<div><br></br></div>) : (
              <div className="batch">
                <span className="batch1">{currTokensLeftInBatch.toLocaleString("en-US")}</span>
                <span className="batch2" style={{letterSpacing: '0.8px'}}><span style={{color:'#FFFFFF', fontWeight: 'normal'}}></span>$BEME</span>
                <span className="batch3">@ </span>
                <span className="batch4">$<span style={{color:'#FFE419', fontWeight: 'normal', letterSpacing: '0.4px'}}>{currPrice.toFixed(4)}</span></span>
              </div>  
          )}
            {loading ? (<div><br></br></div>) : (
                  <div className="prices">
                    <div className="nextPrice">
                      <span className="nextPrice1">Next Price </span>
                      <span className="nextPrice2">${nextPrice.toFixed(5)} </span>
                      <span className="nextPrice3">
                        (+{priceRaisePercent.toFixed(1)}%)
                        </span>
                    </div>
                  </div>
            )}
            <div className="space1"></div>
            <div className="input-group">
            <table className = "input-amount-table">
              <tbody className="input-tbody">
                <tr className="input-row">
                  <th>
                  <input
                  ref={inputRef}
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="Amount"
                  style={{ border: '1px solid #333', backgroundColor: '#333', color: 'white', fontSize: '15px', width: '272px', height: '20px' }}
              />
              <span className="amount-asset" style={{ marginLeft: `${(((amount.length) * 7) - ((amount.length + 24) / 2.2)) + 30 + (asset === "BONK" ? 15 : 1)}px` }}>
                  {"  " + asset}
              </span>
              {loading ? (<div style={{ lineHeight: '6.3px', color: '#1C1C1C'}}>...</div>) : (
              <div className="slider-container">
              <input
                  type="range"
                  min="0"
                  max="100"
                  value={(amount * coinValue / maxBuyVal) * 100} 
                  id="slider"
                  className="slider"
                  onInput={handleSliderChange}
                  style = {{background: `linear-gradient(to right, #0B998B ${amount*coinValue/100*2}%, #333 ${(((amount * coinValue / maxBuyVal)/100)-(amount*coinValue/100))*2}%)`}}
              />
          </div>
            )}
              </th>
              <th className="position-value-col" style={{ padding: '0px', border: '0px solid transparent', borderRadius: '0px', backgroundColor: 'transparent', width: '0px', height: '0px'}}>
              <div className="position-value"
              style={{ padding: '10px', border: '0px solid transparent', borderRadius: '0px', backgroundColor: 'transparent', width: '0px', height: '26px'}}
              >
              <span className="position-value-span">
            
              {loading? '' : '$'}
              {loading? '' : positionValue.toFixed(2)}
            </span>
              </div>
            </th></tr>
            </tbody>
            </table>
              <CustomSelect
                options={allowedAssetsSymbols}
                selectedValue={asset}
                onChange={handleAssetChange} 
                assetPrice={coinValue}
                isLoading={isLoading}
              />
              <div className="checkbox-group">
                <input 
                  type="checkbox" 
                  id="accept-conditions" 
                  checked={isChecked} 
                  onChange={(e) => setIsChecked(e.target.checked)} 
                />
          <label htmlFor="accept-conditions">
              I understand and accept the
              <button
                type="button"
                className="accept-conditions-link"
                onClick={handleTermsClick}
              >
                terms
              </button>
          </label>
              </div>
              <WalletAdapterHandler setTrustActive={setTrustActive} />
              {trustActive === true? (
                  <SendViaTrustButton 
                  className="send-button"
                  disabled={isTrustDisabled}
                  setUserMsg1={setUserMsg1}
                  setUserMsg2={setUserMsg2}
                  setUserMsg3={setUserMsg3}
                  selectedAsset={asset}
                  amount={amount}
                  refCode={referralCode}
                  minVal={minBuyVal}
                  maxVal={maxBuyVal}
                  minValTolerance={minTolerance}
                  maxValTolerance={maxTolerance}
                  positionValue={positionValue}
                  coinValue={coinValue}
                  latestCoinValue={fetchLatestPrice}
                  trustActive={trustActive}
                  onClick={handleButtonClick}
                />
              ) : (
                asset === 'SOL' ? (
                <SendSolanaButton 
                  className="send-button" 
                  disabled={isDisabled}
                  setUserMsg1={setUserMsg1}
                  setUserMsg2={setUserMsg2}
                  setUserMsg3={setUserMsg3}
                  selectedAsset={asset}
                  amount={amount}
                  refCode={referralCode}
                  minVal={minBuyVal}
                  maxVal={maxBuyVal}
                  minValTolerance={minTolerance}
                  maxValTolerance={maxTolerance}
                  positionValue={positionValue}
                  coinValue={coinValue}
                  latestCoinValue={fetchLatestPrice}
                  onClick={handleButtonClick}
                  isDisconnected={isDisconnected}
                />
              ) : (
                <SendTokensButton 
                  className="send-button" 
                  disabled={isDisabled}
                  setUserMsg1={setUserMsg1}
                  setUserMsg2={setUserMsg2}
                  setUserMsg3={setUserMsg3}
                  selectedAsset={asset}
                  amount={amount}
                  refCode={referralCode}
                  minVal={minBuyVal}
                  maxVal={maxBuyVal}
                  minValTolerance={minTolerance}
                  maxValTolerance={maxTolerance}
                  positionValue={positionValue}
                  coinValue={coinValue}
                  latestCoinValue={fetchLatestPrice}
                  onClick={handleButtonClick}
                  isDisconnected={isDisconnected}
                />
              )
            )}
            </div>
              <div>
                <AffiliateField setReferralCode={setReferralCode} />
                <input className="affiliate-input-ref" type="text"></input>
              </div>
              {loading ? (<div><br></br></div>) : (
                <div className="tokens-received">
                  <span 
                    className="tokens-received-text" 
                    style={{ color: userMsg1.startsWith("Meowch")  ? "red" : "inherit" }}
                  >
                    {userMsg1 || "You will receive:"}
                  </span>
                  <span className="tokens-received-amount" style={{ color: "#FFE419" }}>
                    {userMsg3 === "✅" ? <a href={userMsg2} target="_blank" rel="noopener noreferrer" style={{ color: "#FFE419" }}>View Tx on Solscan</a> : (userMsg2 || `${tokensToReceive.toLocaleString("en-US")} $BEME`)}
                  </span>
                  <span className="tokens-received-catemoji">
                    {userMsg3 || selectedEmoji}
                  </span>
                </div>
              )}
            <div className="mask-bottomspace"></div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
} catch(e){}
};
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default BatchSaleMask;
