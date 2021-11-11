import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data/data.service';
import { SelectNdxBookRes, NdxStockColumn, NdxStockFormat, NdxStock, NDX_DATA_TYPE, NDX_CATEGORY_TYPE } from '@app/interfaces';

const TRILLION = 1000000000000;
const BILLION = 1000000000;
const MILLION = 1000000;
const THOUSAND = 1000;
const CENTI = 100;
const DISPLAY_DECIMAL = 2;

@Component({
    selector: 'app-ndx-book',
    templateUrl: './ndx-book.component.html',
    styleUrls: ['./ndx-book.component.scss']
})
export class NdxBookComponent implements OnInit {

    loaded: 'LOADING' | 'SUCCESS' | 'ERROR' = 'LOADING';
    

    // chart data
    basicData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: '#42A5F5',
                tension: .4
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: '#FFA726',
                tension: .4
            }
        ]
    };

    basicOptions = {
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

    // table data
    headers: NdxStockFormat[];
    headerMap: { [key: string]: NdxStockFormat } = { };
    data: NdxStock[];
    dataSnapShot: any[];

    dataSummary: any = {};

    // common data
    selectedData: NdxStock[];



    get dataKeys() {
        if (this.loaded !== 'SUCCESS' || !this.data.length ) {
            return [ ];
        }
        const keys = Object.keys(this.headerMap);
        keys.sort((a, b) => this.headerMap[a].order - this.headerMap[b].order);
        return keys;
    }

    get basicHeader() {
        return this.headers.filter(element => element.category === NDX_CATEGORY_TYPE.BASIC_INFO);
    }

    get ibAndEpsHeader() {
        return this.headers.filter(element => element.category !== NDX_CATEGORY_TYPE.BASIC_INFO);
    }

    get ibHeaderCount() {
        return this.headers.filter(element => element.category === NDX_CATEGORY_TYPE.IB_TARGET_INFO).length;
    }

    get epsHeaderCount() {
        return this.headers.filter(element => element.category === NDX_CATEGORY_TYPE.EPS_INFO).length;
    }

    get summaryHeaderKeys() {
        return this.dataKeys.filter(element => element !== 'name' && element !== 'ticker');
    }

	constructor(private dataService: DataService) { }

	ngOnInit() {
        this.getNdxBook().then(_ => this.loaded = 'SUCCESS').catch(error => {
            this.loaded = 'ERROR';
            console.log(error);
        });
    }

    getNdxBook(): Promise<any> {
        return this.dataService.selectNdxBook().toPromise().then(({ header, data, summary, currentNdx }) => {
            this.headers = NdxStockColumn.filter(element => element.display);
            // this.headers = header;
            this.data = data;
            this.headers.sort((a, b) => a.order - b.order);
            this.headers.forEach(element => {
                const { value } = element;
                this.headerMap[value] = element;
            });
            this.dataSnapShot = this.data.map(element => {
                const parsed = {};
                Object.keys(element).forEach(key => {
                    parsed[key] = this.customPipe(element, key);
                });
                return parsed;
            });

            Object.keys(summary).forEach(key => {
                this.dataSummary[key] = this.customPipe(summary, key);
            });
            this.dataSummary['lastPrice'] = currentNdx;
        });
    }

    onRowSelect() {

    }

    onRowUnselect() {

    }

    customPipe(object: any, key: string) {
        if (!(key in this.headerMap)) {
            return '-';
        }

        const value = object[key];
        const { type } = this.headerMap[key];

        if (!value || value.length == 0) {
            return '-';
        }

        if (type == NDX_DATA_TYPE.TIMES) {
            return `${ value.toFixed(DISPLAY_DECIMAL) }x`;
        } else if (type == NDX_DATA_TYPE.PERCENTAGE) {
            return `${ (value * CENTI).toFixed(DISPLAY_DECIMAL) }%`;
        } else if (type == NDX_DATA_TYPE.VARIATION) {
            return `${ value > 0 ? '+' : '' }${ (value * CENTI).toFixed(DISPLAY_DECIMAL) }%`;
        } else if (type == NDX_DATA_TYPE.DATE) {
            return (new Date(value)).toDateString();
        } else if (type == NDX_DATA_TYPE.MARKET_CAP) {
            if (value >= TRILLION * 10) return `$ ${ (value / TRILLION).toFixed(DISPLAY_DECIMAL) }T`;
            if (value >= BILLION * 10) return `$ ${ (value / BILLION).toFixed(DISPLAY_DECIMAL) }B`;
            if (value >= MILLION * 10) return `$ ${ (value / MILLION).toFixed(DISPLAY_DECIMAL) }M`;
            if (value >= THOUSAND * 10) return `$ ${ (value / THOUSAND).toFixed(DISPLAY_DECIMAL) }K`;
        } else if (type == NDX_DATA_TYPE.PRICE) {
            return `$ ${value.toFixed(DISPLAY_DECIMAL)}`;
        } else if (type == NDX_DATA_TYPE.NUMBER) {
            return value;
        } else {
            return value;
        }
    }

}
