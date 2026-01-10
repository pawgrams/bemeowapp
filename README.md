# **BEMEOW App**

***redeployment from: https://github.com/BEMEOW/bemeowapp***
**All Rights Reserved** – Usage requires explicit permission from the author.

---

## **Overview**

BEMEOW App aims to offer a seamless, perfomant and engaging interface to participate in the **$BEME token presale**, with additional features such as:  
- **Music Player**: A curated Web3 experience showcasing our label's content.  
- **Swap Widget**: Powered by **Jupiter** for fast and efficient token swaps and intelligent preferences.  
- **Cross-Chain Bridge Widget**: Powered by **deBridge** for extended functionality and flexibility.  
- **Referral Program**: On-chain tracking to reward users for promoting the project.  

The app is designed with a playful **UI/UX**, staying true to our brand identity while focusing on ease of use and accessibility.

---

## **Key Features**

### **$BEME Token Presale**
- **Supported Payment Assets**: SOL, USDT, USDC, BONK, WIF, JUP, RAY (all on Solana).  
- **Daily 24h Countdown & Limited Badges**: Tokens are sold in limited batches, with prices increasing daily.  
- **Launch Target**: January 2025.  

### **Referral Program**
- **On-Chain Implementation**: Uses Solana’s Memo Program to track referrals.  
- **Rewards**:  
  - 5% bonus for buyers.  
  - Affiliates earn 5% on direct purchases and 5% on second-tier referrals.  
- **Simple Setup**: Referral codes are wallet addresses appended to app links (e.g., `/?ref=<base58walletaddress>`).  
- Referred addresses are stored in session data to preventing circumventing afilliates and promote fair remuneration.  

### **Security & Blowfish Compliance**
- **Transaction Validation**: All transactions sent to the user’s wallet for signing are standard Solana transfers (to presale wallet/token account).  
- **Error Handling**:  
  - Comprehensive silent `try/catch` logic and error boundaries.  
  - Error Boundares are silent or user-notified based on relevance.  
- **RPC Rate Limits**:
  - Tight restrictions prevent abuse and enhance app security.  
  - APIs are segmented across scripts for additional obfuscation.  
  - Daily token rotations ensure resilience upon traffic spikes.

### **Integrated Wallets**
Predominantly using the [anza.xyz](https://anza.xyz) standard and custom adaptations for compatibility:  
- **Mobile & Desktop React Components**: Separate implementations for wallets like **OKX Wallet** and **Magic Eden Wallet**.  
- **Wallet Connect Modal**: **Solana Connect Multi Button** with UI cutomization layers.
- **Specialized Logic**:  
  - Adjusts wallet visibility dynamically.  
  - Dedicated support for unconventional setups (e.g., Trust Wallet's direct Universal Links).  

### **Custom Widgets**
- **Swap Widget**: [JupiterTerminal.jsx](./src/components/JupiterTerminal.jsx).  
- **Cross-Chain Bridge**: [DeBridgeWidget.jsx](./src/components/DeBridgeWidget.jsx).  

---

## **Development Notes**

- **Blowfish Review Focus?**:  
  - Key files for transaction logic:  
    - [SendSolanaButton.tsx](./src/components/SendSolanaButton.tsx)  
    - [SendTokensButton.tsx](./src/components/SendTokensButton.tsx)  
  - Transactions are very basic, without more complex instruction logics.
  - Thoroughly validated to improve security, minimize failures and promote performance.  

- **Codebase Quality**:  
  - This is our first React project.  
  - Some areas of redundancy and hardcoding surely exist but do not compromise core functionality.
  - Some scripts are currently not in active use.
  - Phantom wallet suppressions served early investor trust and are now commented out.

- **Console Outputs**: Disabled to reduce performance impact from wallet SDK logs.  

- **Service Worker**: Enables installation as a Chrome app for convenience.  

---

## **Technical Stack**
- **Frontend**: React, JavaScript, Typescript, CSS, HTML.  
- **Off-Chain Database**: Firebase for user stats and badge data.
- **Backend**: Local on dedicated device solely for development.
- **Main Libraries**: @solana/web3.js, @solana-mobile, @solana/wallet-adapter-react, @anza.xyz, mobile-detect. 
- **APIs**:  
  - Binance API for real-time asset prices (client-side).  
  - Quicknode Solana RPCs for on-chain data fetching.
 
## **Go Live of this Version**
- Right after a positive review (and evtl. revion) by of blowfish

---

## **Installation and Usage**

1. Clone the repository:  
   ```bash
   git clone https://github.com/BEMEOW/bemeowapp.git
   cd bemeowapp
