import ErrorBoundary from '../ErrorBoundary'; 
import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import {tkn} from '../utils/tkn';
import {network} from '../utils/network';
import {cluster} from '../utils/cluster';
import {provider} from '../utils/provider';
import {epbase} from '../utils/epbase';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
const JupiterTerminal= ({ onClose })=> {
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  const wallet = useWallet();
  const [slippageValue, setSlippageValue] = useState(0.5);
  const endpoint = `https://${epbase[0]}.${network}-${cluster[0]}.${provider[0]}.pro/${tkn[0]}`;
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  const handleSlippageChange = (event) => {
    try{
        let value = event.target.value;
        value = value.replace(',', '.');
        event.target.value = value;
        if (!isNaN(value) && /^(\d+(\.\d{0,1})?)?$/.test(value)) {
          setSlippageValue(value);
        }
      } catch(e){}
  };
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  useEffect(() => {
    try{
        if (window.Jupiter && window.Jupiter.init) {
          window.Jupiter.init({
            displayMode: 'integrated',
            integratedTargetId: 'jupiter-terminal',
            endpoint: endpoint,
            enableWalletPassthrough: true,
            containerStyles: { zIndex: 100 },
            formProps: {
              initialSlippageBps: slippageValue * 100,
            },
              useUserSlippage: true,
          });
          if (wallet && window.Jupiter.syncProps) {
            window.Jupiter.syncProps({
              passthroughWalletContextState: wallet,
            });
          }

        }
      } catch(e){}
  }, [wallet]);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
try{
  return (
    <ErrorBoundary>
      <div>
        <div className="jupiter-terminal-wrapper" id="jupiter-terminal-wrapper">
          <h2 className="jupiter-terminal-title">Swap</h2>
          <hr />
          <button className="jupiter-terminal-close-button" onClick={onClose}>
            <span className="jupiter-terminal-close-button-span">X</span>
          </button>
          <div id="jupiter-terminal"
            style={{
              width: '340px',
              height: '530px',
              minHeight: '470px',
              marginLeft: '-20px',
            }}
          ></div>
          <div className="slippage-input-div">
              <input
                type="text"
                id="slippage"
                value={slippageValue}
                min="0.5"
                max="5.0"
                onChange={handleSlippageChange}
                onClose={handleSlippageChange}
                onSubmit={handleSlippageChange}
                className="slippage-input"
                onFocus={(e) => e.target.select()} 
              />
              <span className="slippage-percent">%</span>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
} catch(e){}
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
export default JupiterTerminal;
