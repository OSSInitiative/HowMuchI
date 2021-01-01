
export interface CoinDeskCurrentPriceModel {
    time:       CoinDeskTime;
    disclaimer: string;
    chartName:  string;
    bpi:        CoinDeskBpi;
}

export interface CoinDeskBpi {
    USD: CoinDeskCurrency;
    GBP: CoinDeskCurrency;
    EUR: CoinDeskCurrency;
}

export interface CoinDeskCurrency {
    code:        string;
    symbol:      string;
    rate:        string;
    description: string;
    rate_float:  number;
}

export interface CoinDeskTime {
    updated:    string;
    updatedISO: Date;
    updateduk:  string;
}
