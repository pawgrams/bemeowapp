import { useState, useEffect } from 'react';

const getPrice = async (base: string, quote: string): Promise<string | null> => {
    interface BinancePriceResponse {price: string;}
    try {
        const symbol = `${base}${quote}`;
        const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;
        const response = await fetch(url);
        const data: BinancePriceResponse = await response.json();
        if (data && data.price) {
            return data.price;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};
export const usePriceFeed = (base: string, quote: string, interval: number = 15000) => {
    const [AmountValue, setCoinvalueInUSDC] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        try{
            const fetchPrice = async () => {
                setIsLoading(true);
                const price = await getPrice(base, quote);
                setCoinvalueInUSDC(price ? parseFloat(price) : null);
                setIsLoading(false);
            };
            fetchPrice();
            const intervalId = setInterval(fetchPrice, interval);
            return () => clearInterval(intervalId);
        } catch(e){}
    }, [base, quote, interval]);
    return { AmountValue };
};
