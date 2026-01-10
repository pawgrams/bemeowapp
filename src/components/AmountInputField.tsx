import { useState } from 'react';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
interface UseHandleAmountChangeProps {
    initialAmount: string;
    initialAsset: string;
    CoinValueInUSDC: number | null;
    maxVal: number;
    minVal: number;
    inputRef: React.RefObject<HTMLInputElement>;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
export const useAmountChange = ({ 
    initialAmount, 
    initialAsset, 
    CoinValueInUSDC, 
    maxVal, 
    minVal,
    inputRef, 
}: UseHandleAmountChangeProps) => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const [amount, setAmount] = useState<string>(initialAmount);
    const [asset, setAsset] = useState<string>(initialAsset);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        try{
            const { selectionStart, value } = e.target;
            let inputValue = value.replace(/[^0-9.]/g, '');
            const parts = inputValue.split('.');
            if (parts.length > 2 || (parts.length === 2 && parts[0] === '')) {
                return;
            }
            if (parts[1] && parts[1].length > 2) {
                parts[1] = parts[1].slice(0, 2);
                inputValue = parts.join('.');
            }
            let numericValue = parseFloat(inputValue);
            if (isNaN(numericValue)) {
                numericValue = 0;
            }
            if (asset === 'SOL' && CoinValueInUSDC) {
                const valueInUSD = numericValue * CoinValueInUSDC;
                if (valueInUSD > maxVal) {
                    numericValue = maxVal / CoinValueInUSDC;
                }
            } else if (asset === 'USDC') {
                if (numericValue > maxVal) {
                    numericValue = maxVal;
                }
            }
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
            setAmount(numericValue.toFixed(parts[1] ? 2 : 2));
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
            setTimeout(() => {
                if (selectionStart !== null && selectionStart > value.indexOf('.')) {
                    const nextPosition = selectionStart + 0;
                    inputRef.current?.setSelectionRange(nextPosition, nextPosition);
                }
            }, 0);
        } catch(e){}
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const handleAssetChange = (newAsset: string) => {
        try{
            if (newAsset !== asset && CoinValueInUSDC) {
                let numericAmount = parseFloat(amount);
                if (isNaN(numericAmount)) numericAmount = 0;
                if (newAsset === 'SOL') {
                    numericAmount = numericAmount / CoinValueInUSDC;
                } else {
                    numericAmount = numericAmount * CoinValueInUSDC;
                }
                numericAmount = Math.min(numericAmount, maxVal / (newAsset === 'SOL' ? CoinValueInUSDC : 1));
                setAmount(numericAmount.toFixed(2));
                setAsset(newAsset);
            } else {
                setAsset(newAsset);
            }
        } catch(e){}
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    try{
        const numericAmount = parseFloat(amount);
        const isAmountValid = numericAmount > 0 && (
            (asset === 'SOL' && CoinValueInUSDC && numericAmount * CoinValueInUSDC >= minVal) 
            || (asset === 'USDC' && numericAmount >= minVal)
        );
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        return { amount, asset, handleAmountChange, handleAssetChange, isAmountValid, setAmount };
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    } catch(e){}
};
