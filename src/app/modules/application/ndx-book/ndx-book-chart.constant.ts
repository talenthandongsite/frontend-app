import { NdxStockFormat, NDX_CATEGORY_TYPE, NDX_DATA_TYPE } from "@app/interfaces";

export const NDX_TARGET_CHART_OPTION = {
    legend: {
        display: false
    },
    plugins: {
        legend: {
            labels: {
                color: '#495057'
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        },
        y: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        }
    }
};

export const NDX_RATING_CHART_OPTION = {
    indexAxis: 'y',
    legend: {
        display: false
    },
    plugins: {
        legend: {
            labels: {
                color: '#495057'
            },
            tooltips: {
                mode: 'index',
                intersect: true
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        },
        y: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        }
    }
};

export const NDX_EPS_CHART_OPTION = {
    legend: {
        display: false
    },
    plugins: {
        legend: {
            labels: {
                color: '#495057'
            },
            tooltips: {
                mode: 'index',
                intersect: true
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        },
        y: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        }
    }
};

export const POTENTIAL_CHART_OPTION = {
    legend: {
        display: false
    },
    plugins: {
        legend: {
            labels: {
                color: '#495057'
            },
            tooltips: {
                mode: 'index',
                intersect: true
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        },
        y: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        }
    }
};

export const EPS_CHART_OPTION = {
    plugins: {
        legend: {
            labels: {
                color: '#495057'
            },
            tooltips: {
                mode: 'index',
                intersect: true
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        },
        y: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        }
    }
};

export const NDX_INDEX_KEYS = [ 'y1Before', 'm6Before', 'm3Before', 'm1Before', 'w1Before', 'priceTarget', 'lastPrice' ];
export const TARGET_PRICE_KEYS = [ 'y1Before', 'm6Before', 'm3Before', 'm1Before', 'w1Before', 'priceTarget' ];
export const EPS_KEYS = [ 'epsNTM', 'epsFY1E', 'epsFY2E', 'epsFY3E' ];

export const NDX_STOCK_COLUMNS: NdxStockFormat[] = [
    {
        label: 'EPS(FY1E)',
        value: 'epsFY1E',
        description: '',
        type: NDX_DATA_TYPE.NUMBER,
        category: NDX_CATEGORY_TYPE.EPS_INFO,
        width: '6.5em',
        display: true,
        order: 34
    },
    {
        label: 'EPS(FY2E)',
        value: 'epsFY2E',
        description: '',
        type: NDX_DATA_TYPE.NUMBER,
        category: NDX_CATEGORY_TYPE.EPS_INFO,
        width: '6.5em',
        display: true,
        order: 35
    },
    {
        label: 'EPS(FY3E)',
        value: 'epsFY3E',
        description: '',
        type: NDX_DATA_TYPE.NUMBER,
        category: NDX_CATEGORY_TYPE.EPS_INFO,
        width: '6.5em',
        display: true,
        order: 36
    },
    {
        label: 'EPS(LTM)',
        value: 'epsLTM',
        description: '',
        type: NDX_DATA_TYPE.NUMBER,
        category: NDX_CATEGORY_TYPE.EPS_INFO,
        width: '6.5em',
        display: true,
        order: 32
    },
    {
        label: 'EPS(NTM)',
        value: 'epsNTM',
        description: '',
        type: NDX_DATA_TYPE.NUMBER,
        category: NDX_CATEGORY_TYPE.EPS_INFO,
        width: '6.5em',
        display: true,
        order: 33
    },
    {
        label: '실적발표일',
        value: 'nextEarnings',
        description: '',
        type: NDX_DATA_TYPE.DATE,
        category: NDX_CATEGORY_TYPE.EPS_INFO,
        width: '7em',
        display: true,
        order: 31
    },
    {
        label: '배당 (LTM)',
        value: 'divYield',
        description: '',
        type: NDX_DATA_TYPE.PERCENTAGE,
        category: NDX_CATEGORY_TYPE.BASIC_INFO,
        width: '5em',
        display: true,
        order: 10
    },
    {
        label: 'EV/Sales (LTM)',
        value: 'evSalesLTM',
        description: '',
        type: NDX_DATA_TYPE.TIMES,
        category: NDX_CATEGORY_TYPE.BASIC_INFO,
        width: '5em',
        display: true,
        order: 9
    },
    {
        label: 'EV/Sales (NTM)',
        value: 'evSalesNTM',
        description: '',
        type: NDX_DATA_TYPE.TIMES,
        category: NDX_CATEGORY_TYPE.BASIC_INFO,
        width: '5em',
        display: true,
        order: 8,
    },
    {
        label: '종가',
        value: 'lastPrice',
        description: '',
        type: NDX_DATA_TYPE.PRICE,
        category: NDX_CATEGORY_TYPE.BASIC_INFO,
        width: '7em',
        display: true,
        order: 3
    },
    {
        label: '시가총액',
        value: 'marketCap',
        description: '',
        type: NDX_DATA_TYPE.MARKET_CAP,
        category: NDX_CATEGORY_TYPE.BASIC_INFO,
        width: '7em',
        display: true,
        order: 4
    },
    // {
    //     label: '이름',
    //     value: 'name',
    //     description: '',
    //     type: NDX_DATA_TYPE.STRING,
    //     category: NDX_CATEGORY_TYPE.BASIC_INFO,
    //     display: true,
    //     order: 2
    // },
    {
        label: 'P/E (LTM)',
        value: 'peLTM',
        description: '',
        type: NDX_DATA_TYPE.TIMES,
        category: NDX_CATEGORY_TYPE.BASIC_INFO,
        width: '5em',
        display: true,
        order: 7
    },
    {
        label: 'P/E (NTM)',
        value: 'peNTM',
        description: '',
        type: NDX_DATA_TYPE.TIMES,
        category: NDX_CATEGORY_TYPE.BASIC_INFO,
        width: '5em',
        display: true,
        order: 6
    },
    {
        label: '비중',
        value: 'share',
        description: '',
        type: NDX_DATA_TYPE.PERCENTAGE,
        category: NDX_CATEGORY_TYPE.BASIC_INFO,
        width: '6em',
        display: true,
        order: 5
    },
    {
        label: '티커',
        value: 'ticker',
        description: '',
        type: NDX_DATA_TYPE.STRING,
        category: NDX_CATEGORY_TYPE.BASIC_INFO,
        width: '5em',
        display: true,
        order: 1
    },
    {
        label: '매수',
        value: 'buy',
        description: '',
        type: NDX_DATA_TYPE.INTEGER,
        category: NDX_CATEGORY_TYPE.IB_TARGET_INFO,
        width: '4em',
        display: true,
        order: 13
    },
    {
        label: '현재비중',
        value: 'curShare',
        description: '',
        type: NDX_DATA_TYPE.PERCENTAGE,
        category: NDX_CATEGORY_TYPE.IB_TARGET_INFO,
        width: '8em',
        display: false,
        order: 19
    },
    {
        label: '보유',
        value: 'hold',
        description: '',
        type: NDX_DATA_TYPE.INTEGER,
        category: NDX_CATEGORY_TYPE.IB_TARGET_INFO,
        width: '4em',
        display: true,
        order: 14
    },
    {
        label: '1M전',
        value: 'm1Before',
        description: '',
        type: NDX_DATA_TYPE.PRICE,
        category: NDX_CATEGORY_TYPE.IB_TARGET_INFO,
        width: '6.5em',
        display: true,
        order: 23
    },
    {
        label: '1M 비중 변화',
        value: 'm1Variation',
        description: '',
        type: NDX_DATA_TYPE.VARIATION,
        category: NDX_CATEGORY_TYPE.IB_TARGET_INFO,
        width: '6.5em',
        display: false,
        order: 24
    },
    {
        label: '3M전',
        value: 'm3Before',
        description: '',
        type: NDX_DATA_TYPE.PRICE,
        category: NDX_CATEGORY_TYPE.IB_TARGET_INFO,
        width: '6.5em',
        display: true,
        order: 25
    },
    {
        label: '3M 비중 변화',
        value: 'm3Variation',
        description: '',
        type: NDX_DATA_TYPE.VARIATION,
        category: NDX_CATEGORY_TYPE.IB_TARGET_INFO,
        width: '6.5em',
        display: false,
        order: 26
    },
    {
        label: '6M전',
        value: 'm6Before',
        description: '',
        type: NDX_DATA_TYPE.PRICE,
        category: NDX_CATEGORY_TYPE.IB_TARGET_INFO,
        width: '6.5em',
        display: true,
        order: 27
    },
    {
        label: '6M 비중 변화',
        value: 'm6Variation',
        description: '',
        type: NDX_DATA_TYPE.VARIATION,
        category: NDX_CATEGORY_TYPE.IB_TARGET_INFO,
        width: '6.5em',
        display: false,
        order: 28
    },
    {
        label: '건 수',
        value: 'numbers',
        description: '',
        type: NDX_DATA_TYPE.INTEGER,
        category: NDX_CATEGORY_TYPE.IB_TARGET_INFO,
        width: '5em',
        display: true,
        order: 11
    },
    {
        label: '상승여력',
        value: 'potential',
        description: '',
        type: NDX_DATA_TYPE.VARIATION,
        category: NDX_CATEGORY_TYPE.IB_TARGET_INFO,
        width: '6em',
        display: true,
        order: 18
    },
    {
        label: '현재 목표가',
        value: 'priceTarget',
        description: '',
        type: NDX_DATA_TYPE.PRICE,
        category: NDX_CATEGORY_TYPE.IB_TARGET_INFO,
        width: '6.5em',
        display: true,
        order: 17
    },
    {
        label: '매도',
        value: 'sell',
        description: '',
        type: NDX_DATA_TYPE.INTEGER,
        category: NDX_CATEGORY_TYPE.IB_TARGET_INFO,
        width: '4em',
        display: true,
        order: 15
    },
    {
        label: '강력매수',
        value: 'strongBuy',
        description: '',
        type: NDX_DATA_TYPE.INTEGER,
        category: NDX_CATEGORY_TYPE.IB_TARGET_INFO,
        width: '4em',
        display: true,
        order: 12
    },
    {
        label: '강력매도',
        value: 'strongSell',
        description: '',
        type: NDX_DATA_TYPE.INTEGER,
        category: NDX_CATEGORY_TYPE.IB_TARGET_INFO,
        width: '4em',
        display: true,
        order: 16
    },
    {
        label: '1W전',
        value: 'w1Before',
        description: '',
        type: NDX_DATA_TYPE.PRICE,
        category: NDX_CATEGORY_TYPE.IB_TARGET_INFO,
        width: '6.5em',
        display: true,
        order: 21
    },
    {
        label: '1W 비중 변화',
        value: 'w1Variation',
        description: '',
        type: NDX_DATA_TYPE.VARIATION,
        category: NDX_CATEGORY_TYPE.IB_TARGET_INFO,
        width: '6.5em',
        display: false,
        order: 22
    },
    {
        label: '1W 변동',
        value: 'w1Wave',
        description: '',
        type: NDX_DATA_TYPE.PRICE,
        category: NDX_CATEGORY_TYPE.IB_TARGET_INFO,
        width: '6.5em',
        display: true,
        order: 20
    },
    {
        label: '1Y전',
        value: 'y1Before',
        description: '',
        type: NDX_DATA_TYPE.PRICE,
        category: NDX_CATEGORY_TYPE.IB_TARGET_INFO,
        width: '6.5em',
        display: true,
        order: 29
    },
    {
        label: '1Y 비중 변화',
        value: 'y1Variation',
        description: '',
        type: NDX_DATA_TYPE.VARIATION,
        category: NDX_CATEGORY_TYPE.IB_TARGET_INFO,
        width: '6.6em',
        display: false,
        order: 30
    },
]

export const SUMMARY_KEYS = [ 'lastPrice', 'priceTarget', 'potential', 'epsNTM' ];
export const FIXED_COLUMNS = ['ticker'];