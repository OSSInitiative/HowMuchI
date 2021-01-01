
export interface CurrencyInfo {

    code: string;
    symbol: string;
    symbolChar?: string;
    format: string;

    exchangeTargetCodes: string[];

}

const f = (a: any, b: any) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
const cartesian = (a: any, b?: any, ...c: any) => (b ? cartesian(f(a, b), ...c) : a);


export function getCurrencyPermutations(cInfo: CurrencyInfo[]) {
    return cartesian(cInfo, cInfo)
        .filter((c: [left: CurrencyInfo, right: CurrencyInfo]) => {
            const [left, right] = c;

            if (left.code == right.code) {
                return false;
            }

            return left.exchangeTargetCodes.includes(right.code);
        })
        .map((c: [left: CurrencyInfo, right: CurrencyInfo]) => {
            const [left, right] = c;
            return left.symbol + '-' + right.symbol;
        });
}