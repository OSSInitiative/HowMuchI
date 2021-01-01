import { from, Observable, Subject } from "rxjs";
import { CoinDeskCurrentPriceModel } from "../models/CoinDeskModels";
import { CurrencyInfo } from "../models/CurrencyInfo";
import { BitCoinPriceService } from "./BitCoinPriceService";

export const CurrencyInfoTable = {
    USD: {
        code: 'USD',
        symbol: 'USD',
        symbolChar: '$',
        format: '0',
        exchangeTargetCodes: ['BTC']
    },
    GBP: {
        code: 'GBP',
        symbol: 'GBP',
        symbolChar: '$',
        format: '0',
        exchangeTargetCodes: ['BTC']
    },
    EUR: {
        code: 'EUR',
        symbol: 'EUR',
        symbolChar: '$',
        format: '0',
        exchangeTargetCodes: ['BTC']
    },
    BTC: {
        code: 'BTC',
        symbol: 'BTC',
        symbolChar: 'Ƀ',
        format: '0.0000',
        exchangeTargetCodes: ['USD','EUR','GBP']
    }
};


export interface ICurrencyService {

    getLiveCurrencyInfo(abort: AbortSignal): Observable<CurrencyInfo[]>;

    getExchangeRate(fromCode: string, toCode: string, fromValue: number): number;

    getMin1ExchangeRate(fromCode: string, toCode: string): {
        fromValue: number,
        toValue: number
    };

}


export class CurrencyService implements ICurrencyService {

    private _bitCoinPriceService: BitCoinPriceService;
    private _currencies: Observable<CurrencyInfo>;
    private _exchangeTable: CoinDeskCurrentPriceModel;

    constructor() {

        this._bitCoinPriceService = new BitCoinPriceService();

        this._currencies

    }

    getLiveCurrencyInfo(abort: AbortSignal): Observable<CurrencyInfo[]> {
        const subject = new Subject<CurrencyInfo[]>();

        const loader = async () => {

            this._exchangeTable = await this._bitCoinPriceService.getCurrencyInfo();

            subject.next([
                {
                    code: CurrencyInfoTable.BTC.code,
                    exchangeTargetCodes: CurrencyInfoTable.BTC.exchangeTargetCodes,
                    format: CurrencyInfoTable.BTC.format,
                    symbol: CurrencyInfoTable.BTC.symbol,
                    symbolChar: CurrencyInfoTable.BTC.symbolChar
                },
                {
                    code: CurrencyInfoTable.USD.code,
                    exchangeTargetCodes: CurrencyInfoTable.USD.exchangeTargetCodes,
                    format: CurrencyInfoTable.USD.format,
                    symbol: CurrencyInfoTable.USD.symbol,
                    symbolChar: CurrencyInfoTable.USD.symbolChar
                },
                {
                    code: CurrencyInfoTable.EUR.code,
                    exchangeTargetCodes: CurrencyInfoTable.EUR.exchangeTargetCodes,
                    format: CurrencyInfoTable.EUR.format,
                    symbol: CurrencyInfoTable.EUR.symbol,
                    symbolChar: CurrencyInfoTable.EUR.symbolChar
                },
                {
                    code: CurrencyInfoTable.GBP.code,
                    exchangeTargetCodes: CurrencyInfoTable.GBP.exchangeTargetCodes,
                    format: CurrencyInfoTable.GBP.format,
                    symbol: CurrencyInfoTable.GBP.symbol,
                    symbolChar: CurrencyInfoTable.GBP.symbolChar
                }
            ]);

        };

        setImmediate(loader);

        const interval = setInterval(loader, 10000);

        const listener = (ev) => {

            clearInterval(interval);

            abort.removeEventListener("abort", listener);
        };
        abort.addEventListener("abort", listener);

        return subject;
    }

    getExchangeRate(fromCode: string, toCode: string, fromValue: number): number {
        switch (fromCode) {
            case 'BTC': {
                switch (toCode) {
                    case 'EUR':
                        return this._exchangeTable.bpi.EUR.rate_float * fromValue;
                    case 'GBP':
                        return this._exchangeTable.bpi.GBP.rate_float * fromValue;
                    case 'USD': defualt:
                        return this._exchangeTable.bpi.USD.rate_float * fromValue;
                }
            }
            case 'EUR': {
                switch (toCode) {
                    case 'BTC': return fromValue / this._exchangeTable.bpi.EUR.rate_float;
                }
            }
            case 'USD': {
                switch (toCode) {
                    case 'BTC': return fromValue / this._exchangeTable.bpi.USD.rate_float;
                }
            }
            case 'GBP': {
                switch (toCode) {
                    case 'BTC': return fromValue / this._exchangeTable.bpi.GBP.rate_float;
                }
            }
        }
    }

    getMin1ExchangeRate(fromCode: string, toCode: string) {
        let from = 1;

        let exRate = this.getExchangeRate(fromCode, toCode, from);

        while (exRate < 1) {
            exRate = exRate * 10;
            from = from * 10;
        }

        return {
            fromValue: from,
            toValue: exRate
        };
    }

}