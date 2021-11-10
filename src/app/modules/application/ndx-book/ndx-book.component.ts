import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data/data.service';
import { SelectNdxBookRes, NdxStockColumn, NdxStockFormat, NdxStock, NDX_DATA_TYPE, NDX_CATEGORY_TYPE } from '@app/interfaces';

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
    
    headers: NdxStockFormat[];
    headerMap: { [key: string]: NdxStockFormat } = { };
    data: NdxStock[];
    dataSnapShot: any[];

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

	constructor(private dataService: DataService) { }

	ngOnInit() {
        this.getNdxBook().then(_ => this.loaded = 'SUCCESS').catch(error => {
            this.loaded = 'ERROR';
            console.log(error);
        });
    }

    getNdxBook(): Promise<any> {
        return this.dataService.selectNdxBook().toPromise().then(({ ndxPrediction, epsPrediction, stockInfo, stockHeader, stockRating }) => {
            this.headers = stockHeader;
            // this.headers = NdxStockColumn;
            this.data = stockInfo;
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
        });
    }

    onRowSelect() {

    }

    onRowUnselect() {

    }

    customPipe(object: any, key: string) {
        const value = object[key];
        const { type } = this.headerMap[key];

        if (!value || value.length == 0) {
            return '-';
        }

        if (type == NDX_DATA_TYPE.TIMES) {
            return `${ value }x`;
        } else if (type == NDX_DATA_TYPE.PERCENTAGE) {
            return `${ (value * CENTI).toFixed(DISPLAY_DECIMAL) }%`;
        } else if (type == NDX_DATA_TYPE.VARIATION) {
            return `${ value > 0 ? '+' : '' }${ (value * CENTI).toFixed(DISPLAY_DECIMAL) }%`;
        } else if (type == NDX_DATA_TYPE.DATE) {
            return (new Date(value)).toDateString();
        } else if (type == NDX_DATA_TYPE.MARKET_CAP) {
            if (value >= BILLION) return `$ ${ (value / BILLION).toFixed(DISPLAY_DECIMAL) }B`;
            if (value >= MILLION) return `$ ${ (value / MILLION).toFixed(DISPLAY_DECIMAL) }M`;
            if (value >= THOUSAND) return `$ ${ (value / THOUSAND).toFixed(DISPLAY_DECIMAL) }K`;
        } else if (type == NDX_DATA_TYPE.PRICE) {
            return `$ ${value.toFixed(DISPLAY_DECIMAL)}`;
        } else if (type == NDX_DATA_TYPE.NUMBER) {
            return value;
        } else {
            return value;
        }
    }
}
