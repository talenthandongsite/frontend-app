import { Component, OnInit } from '@angular/core';
import { LOCAL_STORAGE_TYPE } from '@app/enums';
import { DataService } from '@services/data/data.service';

export interface Status {
    hisnet: number;
    smart: number;
}
export interface Sys {
    stdout: string;
    stderr: string;
}

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    public hisnetOk: boolean;
    public status: Status;
    public sys: Sys = { stdout: "", stderr: "" };
    public apiOk: boolean;

    nickname: string;

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.nickname = localStorage.getItem(LOCAL_STORAGE_TYPE.NICKNAME);

        this.checkHisnet();
        this.checkAPI();
    }

    checkHisnet() {
        this.dataService.selectStatus().toPromise().then((data: any) => {
            this.status = data;
            if (this.status.hisnet == 200) {
                this.hisnetOk = true;
            } else {
                this.hisnetOk = false;
            }
        });
    }

    checkAPI() {
        this.dataService.selectServer().toPromise().then((data: any) => {
            console.log("status code : " + data.statusText);
            this.apiOk = true;
        }).catch(error => {
            console.log("status code error : " + error.statusText);
            this.apiOk = false;

            if (error.status == 200) {
                this.apiOk = true;
            }
        });
    }
}
