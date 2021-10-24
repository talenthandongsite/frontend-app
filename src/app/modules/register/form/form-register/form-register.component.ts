import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DATA_LENGTH_TYPE, ICONS_TYPE, REGEX_TYPE } from '@app/enums';
import { RunRegistrationReq } from '@app/interfaces';
import { DataService } from '@services/data/data.service';

@Component({
	selector: 'app-form-register',
	templateUrl: './form-register.component.html',
	styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {
	
	@Input() studentId;
	@Input() name;
	@Input() status;
	@Output() nextButtonClick: EventEmitter<{talkProfileName, email}> = new EventEmitter<{talkProfileName, email}>()
	dataLength = DATA_LENGTH_TYPE;
	registrationButtionIcon: string;
	talkProfileName: string = '';
	email: string = '';
	block: boolean;

	constructor(private dataService: DataService) { }

	ngOnInit(): void {
		this.registrationButtionIcon = ICONS_TYPE.CHECK;
		this.talkProfileName = '';
		this.email = '';
	}

	isSubmittable() {
		const emailRegex = new RegExp(REGEX_TYPE.EMAIL)
		return this.talkProfileName !== '' && emailRegex.test(this.email);
	}

	submit() {
		this.block = true;
        this.registrationButtionIcon = ICONS_TYPE.SPINNER;

		const request: RunRegistrationReq = {
			studentId: this.studentId,
			studentName: this.name,
			studentStatus: this.status,
			userName: this.talkProfileName,
			userEmail: this.email
		};

		this.dataService.createUser(request).toPromise().then(res => {
			if (res.status) {
				this.nextButtonClick.emit({talkProfileName: this.talkProfileName, email: this.email});
			} else {
				alert('처리중 오류가 발생했습니다. 잠시 후 다시 시도해주시기 바랍니다.');
				this.block = false;
				this.registrationButtionIcon = ICONS_TYPE.CHECK;
			}
		}).catch(err => {
			alert('처리중 오류가 발생했습니다. 잠시 후 다시 시도해주시기 바랍니다.');
			
			this.block = false;
			this.registrationButtionIcon = ICONS_TYPE.CHECK;
		});
	}
}
