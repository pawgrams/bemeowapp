import ErrorBoundary from '../ErrorBoundary'; 
import React, { useEffect, useRef } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
const DeBridgeWidget = () => {
  const {publicKey} = useWallet();
  const widgetRef = useRef(null);
  const scriptLoadedRef = useRef(false);
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  useEffect(() => {
    try{
        if (scriptLoadedRef.current) return;
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        const script = document.createElement('script');
        script.src = 'https://app.debridge.finance/assets/scripts/widget.js';
        script.async = true;
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        document.body.appendChild(script);
        script.onload = () => {
          if (window.deBridge && widgetRef.current) {
            window.deBridge.widget({
              "v":"1",
              "element":"debridge-widget",
              "title":"",
              "description":"",
              "width": "360",
              "height": "470",
              "r":null,
              "supportedChains":"{\"inputChains\":{\"1\":\"all\",\"10\":\"all\",\"56\":\"all\",\"100\":\"all\",\"137\":\"all\",\"1088\":\"all\",\"1890\":\"all\",\"7171\":\"all\",\"8453\":\"all\",\"42161\":\"all\",\"43114\":\"all\",\"59144\":\"all\",\"7565164\":\"all\",\"245022934\":\"all\"},\"outputChains\":{\"1\":\"all\",\"10\":\"all\",\"56\":\"all\",\"100\":\"all\",\"137\":\"all\",\"1088\":\"all\",\"1890\":\"all\",\"7171\":\"all\",\"8453\":\"all\",\"42161\":\"all\",\"43114\":\"all\",\"59144\":\"all\",\"7565164\":\"all\",\"245022934\":\"all\"}}",
              "inputChain":56,
              "outputChain":7565164,
              "inputCurrency":"",
              "outputCurrency":"",
              "address": (publicKey? publicKey.toBase58() : ''),
              "showSwapTransfer":true,
              "amount":"",
              "outputAmount":"",
              "isAmountFromNotModifiable":false,
              "isAmountToNotModifiable":false,
              "lang":"en",
              "mode":"deswap",
              "isEnableCalldata":false,
              "styles":"eyJhcHBCYWNrZ3JvdW5kIjoiIzFjMWMxYyIsIm1vZGFsQmciOiIjMzMzMzMzIiwiY2hhcnRCZyI6IiMzMzMzMzMiLCJib3JkZXJSYWRpdXMiOjE1LCJib3JkZXJDb2xvciI6InJnYmEoMzEsMzYsNDcsMCkiLCJ0b29sdGlwQmciOiIjMzMzMzMzIiwiZm9ybUNvbnRyb2xCZyI6IiMzMzMzMzMiLCJjb250cm9sQm9yZGVyIjoicmdiYSgzMSwzNiw0NywwKSIsInByaW1hcnkiOiIjZmZlNDE5Iiwic3VjY2VzcyI6IiMwYjk5OGIiLCJlcnJvciI6IiNmZjAwMDAiLCJ3YXJuaW5nIjoiI2ZmZmZmZiIsInByaW1hcnlCdG5CZyI6IiMwYjk5OGIiLCJwcmltYXJ5QnRuQmdIb3ZlciI6IiNmZmU0MTkiLCJzZWNvbmRhcnlCdG5PdXRsaW5lIjoicmdiYSgzMSwzNiw0NywwKSIsImlzTm9QYWRkaW5nRm9ybSI6dHJ1ZSwiYnRuUGFkZGluZyI6eyJ0b3AiOjAsInJpZ2h0IjowLCJib3R0b20iOjAsImxlZnQiOjB9LCJidG5Gb250V2VpZ2h0Ijo4MDAsImNoYWluQnRuUGFkZGluZyI6IjAifQ",
              "theme":"dark",
              "isHideLogo":true,
              "logo":"",
              "disabledWallets":[],
              "disabledElements":["Latest trades", "Points", "Routing", "ETA", "Exchange Rate"]
            })
          }
        };
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        scriptLoadedRef.current = true;
    } catch(e){}
  }, []);
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  try{
      return (
        <ErrorBoundary>
          <div className="debridge-repositioner">
            <div className="debridge-wrapper" id="debridge-wrapper">
            <h2 className="debridge-title">Bridge</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between'}}>
              </div>
              <div id="debridge-widget" ref={widgetRef} style={{ width: '300px', height: '400px', overflow: "hidden" }}></div>
            </div>
          </div>
        </ErrorBoundary>
      );
  } catch(e){}
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
export default DeBridgeWidget;
