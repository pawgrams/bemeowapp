export interface AssetDetails {
    0: string;   
    1: number;  
    2: string;   
}

export const allowedAssets: Record<string, AssetDetails> = {
    "SOL":      ["", 0, ""],

    "USDC":     ["EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", 1000000, "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"],
    "USDT":     ["Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", 1000000, "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"],

    "BONK":     ["DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", 100000, "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"],
    "WIF":      ["EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm", 1000000, "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"],

    "JUP":      ["JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN", 1000000, "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"],
    "RAY":      ["4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R", 1000000, "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"],

}