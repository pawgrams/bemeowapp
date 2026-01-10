import { useMemo } from 'react';
import {
    BitgetWalletAdapter,
    PhantomWalletAdapter,
    TrustWalletAdapter,
    CoinbaseWalletAdapter,
    LedgerWalletAdapter,
    TrezorWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
    TokenaryWalletAdapter,
    XDEFIWalletAdapter,
    Coin98WalletAdapter,
    CoinhubWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { BackpackWalletAdapter } from '@solana/wallet-adapter-backpack';
import { BraveWalletAdapter } from '@solana/wallet-adapter-brave';

export const useWalletAdapters = () => {
    const wallets = useMemo(() => [
        new CoinbaseWalletAdapter(),
        new PhantomWalletAdapter(),
        new BitgetWalletAdapter(),
        new BraveWalletAdapter(),
        new TrustWalletAdapter(),
        new LedgerWalletAdapter(),
        new BackpackWalletAdapter(),
        new SolflareWalletAdapter(),
        new TrezorWalletAdapter(),
        new TorusWalletAdapter(),
        new TokenaryWalletAdapter(),
        new XDEFIWalletAdapter(),
        new Coin98WalletAdapter(),
        new CoinhubWalletAdapter(),
        ],[]);
return wallets;
};
