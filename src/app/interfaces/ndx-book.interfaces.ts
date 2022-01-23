
export enum NDX_DATA_TYPE {
    STRING = 'STRING', // Apple Inc.
    INTEGER = 'INTEGER', // 12.1
    NUMBER = 'NUMBER', // 12.1
    MARKET_CAP = 'MARKET_CAP', //ex. $ 12.2B
    PRICE = 'PRICE', // ex. $142.1
    TIMES = 'TIMES', // ex. 65x
    PERCENTAGE = 'PERCENTAGE', // 32%
    VARIATION = 'VARIATION', // +32% , - 21%
    DATE = 'DATE'
}

export enum NDX_CATEGORY_TYPE {
    BASIC_INFO = 'BASIC_INFO',
    EPS_INFO = 'EPS_INFO',
    IB_TARGET_INFO = 'IB_TARGET_INFO'
}

export interface NdxStock {
    epsFY1E: number;
    epsFY2E: number;
    epsFY3E: number;
    epsLTM: number;
    epsNTM: number;
    nextEarnings: number;
    divYield: number;
    evSalesLTM: number;
    evSalesNTM: number;
    lastPrice: number;
    marketCap: number;
    name: string;
    peLTM: number;
    peNTM: number;
    share: number;
    ticker: string;
    buy: number;
    curShare: number;
    hold: number;
    m1Before: number;
    m1Variation: number;
    m3Before: number;
    m3Variation: number;
    m6Before: number;
    m6Variation: number;
    numbers: number;
    potential: number;
    priceTarget: number;
    sell: number;
    strongBuy: number;
    strongSell: number;
    w1Before: number;
    w1Variation: number;
    w1Wave: number;
    y1Before: number;
    y1Variation: number;
}

export interface NdxStockFormat {
    label: string;
    value: string;
    description?: string;
    type: NDX_DATA_TYPE;
    width?: string;
    category: NDX_CATEGORY_TYPE;
    order: number;
    display: boolean;
}

export interface NdxEPSPrediction {
    totalFY1E: number;
    totalFY2E: number;
    totalFY3E: number;
    totalNTM: number;
}

export interface NdxStockRating {
    totalBuy: number;
    totalHold: number;
    totalSell: number;
    totalStrongBuy: number;
    totalStrongSell: number;
}

export interface NdxPrediction {
    ndxCurrent: number;
    ndxTarget: number;
}

export interface NdxBookData {
    data: NdxStock[];
    summary: NdxStock;
}

export interface SelectNdxBookRes extends NdxBookData {

}

export interface ChartData {
    labels: string[];
    datasets: {
        label?: string;
        data: number[]
        fill?: boolean;
        borderColor?: string;
        tension?: number;
    }[];
}
