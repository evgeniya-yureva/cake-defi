import BigNumber from "bignumber.js";

import { ECurrency } from "./types/ECurrency";
import { IExchangeCase } from "./types/IExchangeCase";
import { IExchangeConfig } from "./types/IExchnageConfig";

export function getCurrencyConfig(configString: string): IExchangeConfig{
    const parsedString = configString.split(" ");

    if (parsedString.length !== 3) {
        throw new Error(`Config string contains ${parsedString.length} arguments. Expected number of arguments: 3.`)
    }

    return {
        btcUsd: new BigNumber(parsedString[0]),
        ethUsd: new BigNumber(parsedString[1]),
        dogeUsd: new BigNumber(parsedString[2])
    }
}

export function calculateNumberOfSaleTokens(caseString: string, exchangeConfig: IExchangeConfig): string {
    const parsedString = caseString.split(" ");

    if (parsedString.length !== 4) {
        throw new Error(`Case string contains ${parsedString.length} arguments. Expected number of arguments: 4.`)
    }

    const exchangeCase: IExchangeCase = {
        ethSale: new BigNumber(parsedString[0]),
        numberOfDecimals: parseInt(parsedString[1]),
        currency: ECurrency[parsedString[2] as keyof typeof ECurrency],
        purchasedAmount: new BigNumber(parsedString[3])
    }

    let currencyToEthRate: BigNumber = new BigNumber(0);

    switch (exchangeCase.currency) {
        case ECurrency.ETH:
            currencyToEthRate = new BigNumber(1);
            break;
        case ECurrency.BTC:
            currencyToEthRate = exchangeConfig.btcUsd.dividedBy(exchangeConfig.ethUsd);
            break;
        case ECurrency.DOGE:
            currencyToEthRate = exchangeConfig.dogeUsd.dividedBy(exchangeConfig.ethUsd);
            break;
        default:
            console.log(`Unknown currency ${exchangeCase.currency}. Expected currency: ETH, BTC, DOGE.`)
    }

    const sale = exchangeCase.ethSale.times(currencyToEthRate).times(exchangeCase.purchasedAmount);
    const seleFormatted = sale.toFixed(exchangeCase.numberOfDecimals).toString();

    return seleFormatted;
}