import { Observable, Subject } from "rxjs";
import { CoinDeskCurrentPriceModel } from "../models/CoinDeskModels";
import { CurrencyInfo } from "../models/CurrencyInfo";

const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

export class BitCoinPriceService {

    private data: CoinDeskCurrentPriceModel;


    async refreshCoinDesk(): Promise<CoinDeskCurrentPriceModel> {

        const response = await fetch(url, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Error on CoinDesk fetch.')
        }

        const json = await response.json() as CoinDeskCurrentPriceModel;

        this.data = json;

        return json;
    }

    async getCurrencyInfo(): Promise<CoinDeskCurrentPriceModel> {

        return await this.refreshCoinDesk();

    }

}