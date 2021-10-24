import { Component, OnInit } from '@angular/core';
//import { DataService } from '@services/data/data.service';
import { ProductService } from './productservice';
import { DataService } from '@services/data/data.service';
import { SelectNdxBookRes } from '@app/interfaces';


@Component({
  selector: 'app-ndx-book',
  templateUrl: './ndx-book.component.html',
  styleUrls: ['./ndx-book.component.scss']
})
export class NdxBookComponent implements OnInit {

    objectKeys = Object.keys;
    objectValues = Object.values;

    products: SelectNdxBookRes[];
    list;
    cards;
    responsiveOptions;

    /* CHART 1. Nasdaq-100 종목별 레이팅 */
    ratingChartData: any;
    ratingChartOptions: any;
    ratingNumArr = [];


   /* CHART 2. Nasdaq-100 EPS 변화 */
    epsChangeChartData: any;
    epsChangeChartOptions:any;
    epsDataArr = [];

    /* CHART 3. 종목 상승여력 */
    upsideChartData: any;
    upsideChartOptions:any;

    upsideDataLabels=[];
    upsideDataArr=[];
    upsideDataSet=[];

    loaded: 'LOADING' | 'SUCCESS' | 'ERROR' = 'LOADING';

    headerName = {
        ticker: "티커",
        name: "이름",
        lastPrice: "종가",
        marketCap: "시가총액",
        share: "비중",
        peNTM: "P/E (NTM)",
        peLTM: "P/E (LTM)",
        evSalesNTM: "EV/Sales (NTM)",
        evSalesLTM: "EV/Sales (LTM)",
        divYield: "배당 (LTM)",
        numbers: "건 수",
        strongBuy: "강력매수",
        buy: "매수",
        hold: "보유",
        sell: "매도",
        strongSell: "강력매도",
        priceTarget: "현재",
        potential: "상승여력",
        curShare: "비중",
        w1Wave: "1W변동",
        w1Before: "1W전",
        w1Share: "1W비중",
        m1Before: "1M전",
        m1Share: "1M비중",
        m3Before: "3M전",
        m3Share: "3M비중",
        m6Before: "6M전",
        m6Share: "6M비중",
        y1Before: "1Y전",
        y1Share: "1Y비중",
        nextEarnings: "다음실적발표일",
        epsNTM: "EPS(NTM)",
        epsLTM: "EPS(LTM)",
        epsFY1E: "EPS(FY1E)",
        epsFY2E: "EPS(FY2E)",
        epsFY3E: "EPS(FY3E)"
    }

    get selectedProductBasicInfo() {
        return this.objectKeys(this.products[0].basicInfo);
    }

    get selectedProductIbTargetInfo() {
        return this.objectKeys(this.products[0].ibTargetInfo);
    }

    get selectedProductEpsInfo() {
        return this.objectKeys(this.products[0].EPSInfo);
    }

	constructor(private dataService: DataService, private productService: ProductService) { }

	ngOnInit() {
        this.dataService.selectNdxBook().toPromise().then((result: any) => {
            this.products = result.result.map(element => {
                const { ticker } = element.basicInfo;
                return { ...element, ticker };
            });
            /* Chart1 Data Setup */
            let ratingObj = result.stat.ratingChart
            
            this.ratingNumArr.push(ratingObj.totalStrongSell);
            this.ratingNumArr.push(ratingObj.totalSell);
            this.ratingNumArr.push(ratingObj.totalHold);
            this.ratingNumArr.push(ratingObj.totalBuy);
            this.ratingNumArr.push(ratingObj.totalStrongBuy);

            this.ratingChartData = {
                labels: ['강력매도', '매도', '보유', '매수', '강력매수'],
                datasets: [
                    {
                        label: '종목별 레이팅',
                        barThickness: 16,
                        backgroundColor: '#42A5F5',
                        data: this.ratingNumArr
                    },
                ]
            };

            this.ratingChartOptions = {
                indexAxis: 'y',
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
                            color: '#495057',
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


            /* Chart2 Data Setup */
            let epsObj = result.stat.epsChangeChart
            
            this.epsDataArr.push(epsObj.totalNTM);
            this.epsDataArr.push(epsObj.totalFY1E);
            this.epsDataArr.push(epsObj.totalFY2E);
            this.epsDataArr.push(epsObj.totalFY3E);
        
            this.epsChangeChartData = {
                labels: ['EPS-NTM', 'EPS-FY1E', 'EPS-FY2E', 'EPS-FY3E'],
                datasets: [
                    {
                        label: 'EPS 전망치',
                        barThickness: 16,
                        backgroundColor: '#42A5F5',
                        data: this.ratingNumArr
                    },
                ]
            };


            this.epsChangeChartOptions = {
                indexAxis: 'y',
                
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
                            barThickness: 1,
                            color: '#495057',
                            
                        
                        },
                        grid: {
                            color: '#ebedef',
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
            this.loaded = 'SUCCESS';
        }).catch(error => {
            console.log(error);
            this.loaded = 'ERROR';
        });
    }

    onRowSelect = (event) => {
        console.log(this.upsideDataArr)

        if (this.upsideDataArr.length > 20) {
            this.upsideDataArr.shift();
        }

        this.upsideDataLabels = this.upsideDataArr.map(row => row.basicInfo.ticker);
        this.upsideDataSet = this.upsideDataArr.map(row => parseFloat(row.ibTargetInfo.potential)*100);

        this.upsideChartData = {
            labels: this.upsideDataLabels,
            datasets: [
                {
                    label: '상승여력',
                    backgroundColor: '#42A5F5',
                    data: this.upsideDataSet
                },
            ]
        }

        this.upsideChartData = {
            labels: this.upsideDataLabels,
            datasets: [
                {
                    label: '상승여력',
                    barThickness: 16,
                    backgroundColor: '#42A5F5',
                    data: this.upsideDataSet
                },
            ]
        }


        this.upsideChartOptions = {
            indexAxis: 'y',
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
                        min: 0,
                        max: 100,
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };
    }

    onRowUnselect = (event) => {
        this.upsideDataLabels = this.upsideDataArr.map(row => row.basicInfo.ticker);
        this.upsideDataSet = this.upsideDataArr.map(row => parseFloat(row.ibTargetInfo.potential)*100);

        this.upsideChartData = {
            labels: this.upsideDataLabels,
            datasets: [
                {
                    label: '상승여력',
                    backgroundColor: '#42A5F5',
                    data: this.upsideDataSet
                },
            ]
        }

        this.upsideChartData = {
            labels: this.upsideDataLabels,
            datasets: [
                {
                    label: '상승여력',
                    barThickness: 16,
                    backgroundColor: '#42A5F5',
                    data: this.upsideDataSet
                },
            ]
        }


        this.upsideChartOptions = {
            indexAxis: 'y',
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        min: 0,
                        maxTicksLimit: 100,
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };
    }
}
