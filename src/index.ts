import * as readline from "readline";

import { IExchangeConfig } from "./types/IExchnageConfig";
import { getCurrencyConfig, calculateNumberOfSaleTokens} from "./currencyExchangeService";

const fileReader = readline.createInterface({
    input: process.stdin,
  });

let exchangeConfig: IExchangeConfig = undefined;
let currentLine = 0;

fileReader.on('line', (line) => {
    
    if (currentLine == 0) {
        exchangeConfig = getCurrencyConfig(line);
    } else {
        const numberOfSaleTokens = calculateNumberOfSaleTokens(line, exchangeConfig);
        console.log(numberOfSaleTokens);
    }

    currentLine++;
})