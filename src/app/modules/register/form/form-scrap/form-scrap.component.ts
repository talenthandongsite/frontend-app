import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DATA_LENGTH_TYPE, ICONS_TYPE } from '@app/enums';
import { RunHisnetLoginReq } from '@app/interfaces';
import { DataService } from '@services/data/data.service';

@Component({
	selector: 'app-form-scrap',
	templateUrl: './form-scrap.component.html',
	styleUrls: ['./form-scrap.component.scss']
})
export class FormScrapComponent implements OnInit {
	
	@Output() nextButtonClick: EventEmitter<{studentId, name, status, talkProfileName, email}> = new EventEmitter<{studentId, name, status, talkProfileName, email}>()
	
	dataLength = DATA_LENGTH_TYPE;
	
	consent: boolean;
	block;
	hisnetCheckButtonIcon;

	hisnetId: string;
	hisnetPassword: string;

	studentId: string;
	studentName: string;
	studentStatus: string;

	talkProfileName: string;
	email: string;

	constructor(private dataService: DataService) { }

	ngOnInit(): void {
		this.initMember();
	}

	initMember() {
        this.block = false;
		this.hisnetCheckButtonIcon = ICONS_TYPE.SIGN_IN;
		
		this.hisnetId = '';
		this.hisnetPassword = '';
    }

	isHisnetLoginReady() {
		return this.hisnetId !== '' && this.hisnetPassword !== '';
	}

	enterKeyRunHisnetLogin(e) {
        if (e.keyCode == 13) {
            this.runHisnetLogin();
        }
    }

	runHisnetLogin() {
        if (this.block == false && this.isHisnetLoginReady()) {
            this.block = true;
            this.hisnetCheckButtonIcon = ICONS_TYPE.SPINNER;

            const request: RunHisnetLoginReq = {
                id: this.hisnetId,
                pw: this.hisnetPassword
            };

            this.dataService.runHisnetLogin(request).toPromise().then(res => {
				const {id, name, status} = res;

				this.dataService.runCheckUserData(id).toPromise().then(check => {
					if (check.length > 0) {
						const {nickname, email, isActive} = check[0];

						if (isActive !== '0') {
							alert('이미 인터뷰가 등록된 학번입니다.');
							this.block = false;
							this.hisnetCheckButtonIcon = ICONS_TYPE.SIGN_IN;
						} else {
							const event = {
								name,
								status,
								email,
								studentId: id,
								talkProfileName: nickname
							};
							this.nextButtonClick.emit(event);
						}
					} else {
						const event = {
							name,
							status,
							email: null,
							studentId: id,
							talkProfileName: null
						};
						this.nextButtonClick.emit(event);
					}
				}).catch(checkError => {
					alert('오류가 발생했습니다. 조금 후에 시도해 주시기 바랍니다.');
					this.block = false;
					this.hisnetCheckButtonIcon = ICONS_TYPE.SIGN_IN;	
				});
            }).catch(err => {
				this.block = false;
                alert('로그인 과정 중 오류가 발생했습니다. HISNET ID/PW를 다시 확인하시거나 조금 후에 시도해 주시기 바랍니다.');
                this.hisnetCheckButtonIcon = ICONS_TYPE.SIGN_IN;
            });
        }
    }
}
