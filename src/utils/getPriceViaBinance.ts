import fetch from 'cross-fetch';

interface BinancePriceResponse {
    price: string;
}
export const getPriceViaBinance = async (base: string, quote: string): Promise<string | null> => {

    const symbol = `${base}${quote}`;
    const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;
    try {
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
