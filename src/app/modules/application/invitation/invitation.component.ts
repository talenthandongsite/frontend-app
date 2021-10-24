import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ACCESS_LEVEL_TYPE, ICONS_TYPE, LOCAL_STORAGE_TYPE } from '@app/enums';
import { CreateInvitationReq, RunTransferInvitationReq } from '@app/interfaces';
import { DataService } from '@services/data/data.service';
import { Table } from 'primeng/table';

const utcStringToDisplayDate = (utcDateString: string): string => {
	if (isNaN(Date.parse(utcDateString))) {
		return '';
	} else {
		const dateObject = new Date(utcDateString);

		const year = dateObject.getFullYear();
		const month = dateObject.getMonth() + 1;
		const date = dateObject.getDate();
		const hour = ('00' + dateObject.getHours()).slice(-2);
		const minute = ('00' + dateObject.getMinutes()).slice(-2);

		const dateString = `${year}년 ${month}월 ${date}일 ${hour}시 ${minute}분`;

		return dateString;
	}
}

@Component({
	selector: 'app-invitation',
	templateUrl: './invitation.component.html',
	styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {

	@ViewChild('invitationTable') invitationTable: Table;

	accessLevel: ACCESS_LEVEL_TYPE;
	icons = ICONS_TYPE;

	adminOption: any[];
	invitation: any[];
	myInvitation: any[];

	dialogDisplay: boolean = false;

	transfer: boolean = false;
	talkProfileName;

	invitationColumns: any[];
	myInvitationColumns: any[];

	invitationForm: FormGroup;

	selectedInvitation: string;

	constructor(
		private dataService: DataService,
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.accessLevel = <ACCESS_LEVEL_TYPE>localStorage.getItem(LOCAL_STORAGE_TYPE.ACCESS_LEVEL);
		this.talkProfileName = localStorage.getItem(LOCAL_STORAGE_TYPE.USERNAME);

		this.invitationColumns = [
			{ field: 'talkProfileName', header: '소유자' },
			{ field: 'createDatetime', header: '초대 링크 생성일' },
			{ field: 'invitationId', header: '초대장 ID' }
		];

		this.myInvitationColumns = [
			{ field: 'invitation', header: '초대 링크 (클릭하여 복사하기)' },
			{ field: 'createDatetime', header: '초대 링크 생성일' },
			{ field: 'invitationId', header: '초대장 ID' }
		];

		this.initForm();
		this.getData();
	}

	getData() {
		const invitation = this.dataService.selectInvitation().toPromise();
		const admin = this.dataService.selectAdmin().toPromise();

		Promise.all([admin, invitation]).then(responseArray => {
			const adminRes = responseArray[0].filter(elem => elem.accessTokenRegistered==='1');
			const adminDict = {};
			this.adminOption = adminRes.map(elem => {
				return {label: elem.talkProfileName, value: elem.uid}
			});
			const currentUserUid = this.adminOption.filter(elem=> this.talkProfileName === elem.label)[0].value;
			this.invitationForm.patchValue({uid: currentUserUid});

			adminRes.forEach(elem => {
				adminDict[elem.uid] = elem;
			});

			const invitationRes = responseArray[1].map(elem => {
				return {
					...elem,
					invitationId: elem.invitation,
					talkProfileName: adminDict[elem.adminUid] ? adminDict[elem.adminUid].talkProfileName : 'Disabled',
					invitation: `https://talenthandong.site/register?token=${elem.invitation}`,
					createDatetime: utcStringToDisplayDate(elem.createDatetime),
					updateDatetime: utcStringToDisplayDate(elem.updateDatetime)
				};
			});

			this.myInvitation = invitationRes.filter(elem => elem.adminUid === currentUserUid);
			this.invitation = invitationRes;
		});
	}

	utcStringToDisplayDate(utcDateString: string): string {
		if (isNaN(Date.parse(utcDateString))) {
			return '';
		} else {
			const dateObject = new Date(utcDateString);

			const year = dateObject.getFullYear();
			const month = dateObject.getMonth() + 1;
			const date = dateObject.getDate();
			const hour = ('00' + dateObject.getHours()).slice(-2);
			const minute = ('00' + dateObject.getMinutes()).slice(-2);

			const dateString = `${year}년 ${month}월 ${date}일 ${hour}시 ${minute}분`;

			return dateString;
		}
	}

	accessible(): boolean {
		return this.accessLevel === ACCESS_LEVEL_TYPE.SYS_ADMIN || this.accessLevel == ACCESS_LEVEL_TYPE.MASTER;
	}

	initForm() {
		this.invitationForm = this.fb.group({
			uid: ['', Validators.required]
		});
	}

	openIssue() {
		this.transfer = false;
		this.dialogDisplay = true;
	}

	openTransfer(obj) {
		const { invitation } = obj;
		this.selectedInvitation = invitation.split('=')[1];
		this.transfer = true;
		this.dialogDisplay = true;
	}

	runDelete(obj) {
		const { invitation } = obj;
		const selectedInvitation = invitation.split('=')[1];

		if (confirm('해당 초대장을 삭제하시겠습니까?')) {
			this.dataService.runDisableInvitation(selectedInvitation).toPromise().then(res => {
				alert('삭제되었습니다');
				this.getData();
			}).catch(error => {
				alert(JSON.stringify(error));
			});
		}
	}

	submit() {
		const { uid } = this.invitationForm.getRawValue();
		const invitation = this.selectedInvitation;

		if (this.transfer) {
			if (confirm('해당 초대장을 이전하시겠습니까?')) {
				const request: RunTransferInvitationReq = { uid, invitation };
				this.dataService.runTransferInvitation(request).toPromise().then(res => {
					alert('이전되었습니다');
					this.dialogDisplay = false;
					this.getData();
				}).catch(error => {
					alert(JSON.stringify(error));
				});
			}
		} else {
			if (confirm('초대장을 발급하시겠습니까?')) {
				const request: CreateInvitationReq = { uid };
				this.dataService.createInvitation(request).toPromise().then(res => {
					alert('발급되었습니다');
					this.dialogDisplay = false;
					this.getData();
				}).catch(error => {
					alert(JSON.stringify(error));
				});
			}
		}
	}

	copy(str) {
		const el = document.createElement('textarea');
		el.value = str;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
		alert('클립보드에 복사되었습니다');
	};
}
