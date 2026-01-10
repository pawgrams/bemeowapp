import { useMemo } from 'react';

interface UseAllocationProps {
    amount: string;
    asset: string;
    CoinValueInUSDC: number | null;
    currPrice: number;
}
export const useAllocation = ({ amount, asset, CoinValueInUSDC, currPrice }: UseAllocationProps) => {
    const tokensToReceive = useMemo(() => {
        if (asset === 'SOL' && CoinValueInUSDC !== null) {
            return Math.floor((CoinValueInUSDC * parseFloat(amount)) / currPrice);
        } else {
            return Math.floor(parseFloat(amount) / currPrice);
        }
    }, [amount, asset, CoinValueInUSDC, currPrice]);
    const positionValue = useMemo(() => tokensToReceive * currPrice, [tokensToReceive, currPrice]);
    return { tokensToReceive, positionValue };
};
