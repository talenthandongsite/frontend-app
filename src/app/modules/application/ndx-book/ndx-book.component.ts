import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '@services/data/data.service';
import { NdxBookDataPipe } from './ndx-book-data.pipe';
import { Table } from 'primeng/table';
import { 
    EPS_CHART_OPTION, EPS_KEYS, NDX_EPS_CHART_OPTION, NDX_INDEX_KEYS, NDX_RATING_CHART_OPTION, 
    NDX_TARGET_CHART_OPTION, POTENTIAL_CHART_OPTION, TARGET_PRICE_KEYS, NdxStockColumn 
} from './ndx-book-chart.constant';
import { 
    NdxStockFormat, NdxStock, NDX_DATA_TYPE, 
    NDX_CATEGORY_TYPE, ChartData 
} from '@app/interfaces';

@Component({
    selector: 'app-ndx-book',
    templateUrl: './ndx-book.component.html',
    styleUrls: ['./ndx-book.component.scss']
})
export class NdxBookComponent implements OnInit {

    @ViewChild('dataTable') dataTable: Table;

    loaded: 'LOADING' | 'SUCCESS' | 'ERROR' = 'LOADING';

    // table data
    headers: NdxStockFormat[];
    headerMap: { [key: string]: NdxStockFormat } = { };
    data: NdxStock[];
    dataSnapShot: any[];

    summary: NdxStock;
    dataSummary: any = { };

    // common data
    selectedData: NdxStock[] = [ ];

    // chart data
    ndxTargetChart: ChartData;
    ndxRatingChart: ChartData;
    ndxEpsChart: ChartData;
    potentialChart: ChartData;
    epsChangeChart: ChartData;

    ndxTargetChartOption = NDX_TARGET_CHART_OPTION;
    ndxRatingChartOption = NDX_RATING_CHART_OPTION;
    ndxEpsChartOption = NDX_EPS_CHART_OPTION;
    potentialChartOption = POTENTIAL_CHART_OPTION;
    epsChangeChartOption = EPS_CHART_OPTION;

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

    get ibHeader() {
        return this.headers.filter(element => element.category === NDX_CATEGORY_TYPE.IB_TARGET_INFO);
    }

    get epsHeader() {
        return this.headers.filter(element => element.category === NDX_CATEGORY_TYPE.EPS_INFO);
    }

    get summaryHeaderKeys() {
        return this.dataKeys.filter(element => element !== 'name' && element !== 'ticker');
    }

	constructor(private dataService: DataService, private ndxBookDataPipe: NdxBookDataPipe) { }

	ngOnInit() {
        this.getNdxBook().then(_ => this.loaded = 'SUCCESS').catch(error => {
            this.loaded = 'ERROR';
            console.log(error);
        });
    }

    getNdxBook(): Promise<any> {
        return this.dataService.selectNdxBook().toPromise().then(({ data, summary }) => {
            this.headers = NdxStockColumn.filter(element => element.display);
            this.data = data;
            this.headers.sort((a, b) => a.order - b.order);
            this.headers.forEach(element => {
                const { value } = element;
                this.headerMap[value] = element;
            });
            this.summary = summary;
            Object.keys(this.summary).forEach(key => {
                if (key in this.headerMap) {
                    this.dataSummary[key] = this.ndxBookDataPipe.transform(this.summary[key], this.headerMap[key].type);
                }
            });
            NDX_INDEX_KEYS.forEach(key => {
                this.dataSummary[key] = this.ndxBookDataPipe.transform(this.summary[key], NDX_DATA_TYPE.INTEGER);
            });
            this.ndxTargetChart = this.getNdxTargetPriceChart();
            this.ndxRatingChart = this.getNdxRatingChart();
            this.ndxEpsChart = this.getNdxEpsChart();
        });
    }

    onRowSelect() {
        // WARNING: Following code block is actually very dangerous code, because it directly manipulates primeng component. Can be broken in further versions of primeng.
        if (this.selectedData.length > 5) {
            this.selectedData.shift();
            this.dataTable.selection = this.selectedData;
            this.dataTable._selection = this.dataTable.selection;
            this.dataTable.selectionChange.emit(this.dataTable.selection);
            this.dataTable.tableService.onSelectionChange();
            if (this.dataTable.isStateful()) {
                this.dataTable.saveState();
            }
            this.dataTable.updateSelectionKeys();
        }
        
        this.updatePotentialChart();
        this.updateEpsChangeChart();
    }

    onRowUnselect() {
        this.updatePotentialChart();
        this.updateEpsChangeChart();
    }

    updatePotentialChart() {
        const nextChartData: ChartData = { labels: [ ], datasets: [ { data: [ ] } ] };

        this.selectedData.map(({ ticker, potential }) => {
            nextChartData.labels.push(ticker);
            nextChartData.datasets[0].data.push(potential);
        });

        this.potentialChart = nextChartData;
    }

    updateEpsChangeChart() {
        const nextChartData: ChartData = { labels: [ ], datasets: [ ] };

        EPS_KEYS.forEach(key => nextChartData.labels.push(this.headerMap[key].label));

        this.selectedData.map(({ ticker, epsNTM, epsFY1E, epsFY2E, epsFY3E }) => {
            nextChartData.datasets.push({
                label: ticker,
                data: [ epsNTM, epsFY1E, epsFY2E, epsFY3E ]
            });
        });

        this.epsChangeChart = nextChartData;
    }

    getNdxTargetPriceChart(): ChartData {
        const keys = TARGET_PRICE_KEYS;

        const labels = keys.map(key => this.headerMap[key].label);
        const datasets = [{
            data: keys.map(key => parseFloat(this.summary[key])),
            backgroundColor: "#79D1CF",
            fill: true,
            tension: 0.3
        }];
        return { labels, datasets };
    }

    getNdxRatingChart(): ChartData {
        const keys = [ 'strongSell', 'sell', 'hold', 'buy', 'strongBuy' ];

        const labels = keys.map(key => this.headerMap[key].label);
        const datasets = [{
            data: keys.map(key => parseInt(this.summary[key])),
            backgroundColor: '#FFA726',
            fill: false,
            tension: 0.3
        }];
        return { labels, datasets };
    }

    getNdxEpsChart(): ChartData {
        const keys = [ 'epsNTM', 'epsFY1E', 'epsFY2E', 'epsFY3E' ];

        const labels = keys.map(key => this.headerMap[key].label);
        const datasets = [{
            data: keys.map(key => parseInt(this.summary[key])),
            backgroundColor: '#FFA726',
            fill: false,
            tension: 0.3
        }];
        return { labels, datasets };
    }

    headerWidthReduce(previous, current) {
        return previous + parseFloat(current.width.split(/em|rem|px/)[0]);
    }
}
