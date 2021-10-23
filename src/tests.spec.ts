import BigNumber from "bignumber.js";
import { getCurrencyConfig, calculateNumberOfSaleTokens } from "./currencyExchangeService";
import { IExchangeConfig } from "./types/IExchnageConfig";

describe("Exchange Service tests", () => {
    const currencyExchangeConfig = {
        btcUsd: new BigNumber("3825.281112"),
        ethUsd: new BigNumber("138.8911"),
        dogeUsd: new BigNumber("0.00198422341298374987")
    };

    it("Get currency exchange config - valid input string", () => {
      const inputString = "3825.281112 138.8911 0.00198422341298374987";

      expect(getCurrencyConfig(inputString)).toEqual(currencyExchangeConfig);
    });

    it("Get currency exchange config - invalid string", () => {
        const inputString = "3825.281112 138.8911";
  
        expect(() => getCurrencyConfig(inputString)).toThrow(Error);
        expect(() => getCurrencyConfig(inputString)).toThrow("Config string contains 2 arguments. Expected number of arguments: 3.");
      });

    it("Calculate sale tokens - valid case", () => {
        const inputString = "1.5 3 ETH 3.5";

        expect(calculateNumberOfSaleTokens(inputString, currencyExchangeConfig)).toEqual("5.250");
    });

    it("Calculate sale tokens - invalid case", () => {
        const inputString = "1.5 3 ETH";

        expect(() => calculateNumberOfSaleTokens(inputString, currencyExchangeConfig)).toThrow(Error);
        expect(() => calculateNumberOfSaleTokens(inputString, currencyExchangeConfig)).toThrow("Case string contains 3 arguments. Expected number of arguments: 4.");
    });
  });