import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICONS_TYPE } from '@app/enums';
import { DataService } from '@services/data/data.service';

const CAPTCHA_SITE_KEY = '6LfSEDMaAAAAAJ4JN-uFJA1arW6MBLiEreaaWCe-';

@Component({
  selector: 'app-term-register',
  templateUrl: './term-register.component.html',
  styleUrls: ['./term-register.component.scss']
})
export class TermRegisterComponent implements OnInit {

	@Input() invitation: string;
	@Output() nextButtonClick: EventEmitter<boolean> = new EventEmitter<boolean>()

	registrationButtionIcon: string;
	block: boolean;
	siteKey: string;
	captchaPassed: boolean;

	constructor(
		private dataService: DataService
	) { }

	ngOnInit(): void {
		this.captchaPassed = false;
		this.siteKey = CAPTCHA_SITE_KEY;
		this.initializeButton();
	}

	runNextStep() {
		if (!this.block) {
			this.registrationButtionIcon = ICONS_TYPE.SPINNER;
			this.block = true;
			this.dataService.runVerifyInvitation(this.invitation).toPromise().then(result => {
				if (result) {
					if (confirm("초대장이 인증되었습니다. 회원가입을 계속해서 진행해 주시기 바랍니다.")) {
						this.nextButtonClick.emit(true);
					} else {
						this.initializeButton();
					}
				}
			}).catch(error => {
				const { status } = error;
				if (status == 404) {
					alert("잘못된 초대장입니다.");
				} else if (status == 403) {
					alert("이미 사용된 초대장입니다.");
				} else {
					alert("error");
				}
				this.initializeButton();
			});
		}
	}

	initializeButton() {
		this.registrationButtionIcon = ICONS_TYPE.TICKET;
		this.block = false;
	}

	showResponse($event) {
		setTimeout(() => {
			this.captchaPassed = true;
		}, 1000);
	}
}
