import { Component, EventEmitter, Input, OnInit, Output, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ICONS_TYPE, LOCAL_STORAGE_TYPE } from '@app/enums';
import { RunRegisterInterviewReq } from '@app/interfaces';
import { DataService } from '@services/data/data.service';

@Component({
	selector: 'app-form-interview',
	templateUrl: './form-interview.component.html',
	styleUrls: ['./form-interview.component.scss']
})
export class FormInterviewComponent implements OnInit {
	
	@Input() studentId: string;
	@Input() talkProfileName: string;
	@Input() invitation: string;
	@Output() nextButtonClick: EventEmitter<boolean> = new EventEmitter<boolean>()
	
	url: string;
	submitButtionIcon: string;
	block: boolean;

	constructor(private dataService: DataService) { }

	ngOnInit(): void {
		this.block = false;
		this.submitButtionIcon = ICONS_TYPE.CHECK;
		this.url = '';
	}

	isSubmittable() {
		return this.url !== '';
	}

	submit() {
		this.block = true;
		this.submitButtionIcon = ICONS_TYPE.SPINNER;

		const request: RunRegisterInterviewReq = {
			studentId: this.studentId,
			url: this.url,
			invitation: this.invitation
		};

		this.dataService.runRegisterInterview(request).toPromise().then(res => {
			const { code } = res;

			if (code != 200) {
				alert('초대장이 잘못되었거나 만료되었습니다.');
				this.block = false;
				this.submitButtionIcon = ICONS_TYPE.CHECK;
			} else {
				this.nextButtonClick.emit();
			}
		}).catch(error => {
			this.block = false;
			this.submitButtionIcon = ICONS_TYPE.CHECK;
			alert(error)
		});
	}
}
