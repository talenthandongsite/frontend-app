import { Pipe, PipeTransform } from "@angular/core";
import { NDX_DATA_TYPE } from "@app/interfaces";

const TRILLION = 1000000000000;
const BILLION = 1000000000;
const MILLION = 1000000;
const THOUSAND = 1000;
const CENTI = 100;
const DISPLAY_DECIMAL = 2;

@Pipe({
    name: 'ndxBookData'
})
export class NdxBookDataPipe implements PipeTransform {   
    transform(value: any, type: NDX_DATA_TYPE): any { 
        // console.log(value, type);

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
            return value.toFixed(DISPLAY_DECIMAL);
        } else if (type == NDX_DATA_TYPE.INTEGER) {
            return Math.round(value);
        } else {
            return value;
        }
    }
}