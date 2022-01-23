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
            if (!Date.parse(value)) {
                return '-';
            }
            const dateToken = (new Date(value)).toLocaleString('ko-kr', {timeZone:'Asia/Seoul'}).split(' ').slice(0,3);
            if (dateToken[1].length == 2) {
                dateToken[1] = '0' + dateToken[1];
            }
            if (dateToken[2].length == 2) {
                dateToken[2] = '0' + dateToken[2];
            }
            return dateToken.join('').slice(0, -1);
        } else if (type == NDX_DATA_TYPE.MARKET_CAP) {
            if (value >= TRILLION * 10) return `$ ${ (value / TRILLION).toFixed(DISPLAY_DECIMAL) }T`;
            if (value >= BILLION) return `$ ${ (value / BILLION).toFixed(DISPLAY_DECIMAL) }B`;
            if (value >= MILLION) return `$ ${ (value / MILLION).toFixed(DISPLAY_DECIMAL) }M`;
            if (value >= THOUSAND) return `$ ${ (value / THOUSAND).toFixed(DISPLAY_DECIMAL) }K`;
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