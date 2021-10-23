import BigNumber from "bignumber.js";
import { ECurrency } from "./ECurrency";

export interface IExchangeCase {
    ethSale: BigNumber;
    numberOfDecimals: number;
    currency: ECurrency;
    purchasedAmount: BigNumber;
}