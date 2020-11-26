
export interface CurrencyInfo {

    symbol: string;
    symbolChar?: string;
    format: string;

}

export const Currencies = [
    {
        symbol: 'USD',
        symbolChar: '$',
        format: '0'
    },
    {
        symbol: 'BTC',
        format: '0.000'
    }
    
] as CurrencyInfo[];
