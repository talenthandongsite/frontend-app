import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ACCESS_LEVEL_TYPE, ICONS_TYPE, LOCAL_STORAGE_TYPE } from "@app/enums";
import { RunIssueAdminInvitationReq } from "@app/interfaces";
import { DataService } from "@services/data/data.service";
import { LoginService } from '@services/login/login.service';

interface RawData {
	is_allowed: number;
	stdID: string;
	uid: string;
	userName: string;
}

const access = [
	{label: '일반 관리자', value: 'ADM'},
	{label: '개발자', value: 'DEV'},
	{label: '마스터 관리자', value: 'MST'},
];

@Component({
	selector: 'app-allow-page',
	templateUrl: './allow-page.component.html',
	styleUrls: ['./allow-page.component.scss']
})
export class AllowPageComponent implements OnInit {
	
	access = access;

	accessLevel: ACCESS_LEVEL_TYPE;
	admin
	pending
	invitation

	icons = ICONS_TYPE;

	dialogDisplay: boolean = false;

	columns: any[];
	invitationColumn: any[];

	adminInvitationForm: FormGroup;
	accessOption = access;

	constructor(
		private loginService: LoginService, 
		private dataService: DataService,
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.accessLevel = <ACCESS_LEVEL_TYPE>localStorage.getItem(LOCAL_STORAGE_TYPE.ACCESS_LEVEL);
		this.getAllowList();
		this.initForm();
	}

	getAllowList() {
		this.dataService.selectAdmin().toPromise().then(res => {
			this.admin = res.filter(elem => 
				elem.accessTokenRegistered==='1' && elem.is_allowed==1
			).map(elem => {
				return {
					...elem,
					accessLevel: access.filter(item => item.value === elem.accessLevel)[0].label,
					createDatetime: this.utcStringToDisplayDate(elem.createDatetime),
					lastAccessDatetime: this.utcStringToDisplayDate(elem.lastAccessDatetime)
				};
			});
			this.pending = res.filter(elem => 
				elem.accessTokenRegistered==='1' && elem.is_allowed==0
			).map(elem => {
				return {
					...elem,
					accessLevel: access.filter(item => item.value === elem.accessLevel)[0].label,
					createDatetime: this.utcStringToDisplayDate(elem.createDatetime),
					lastAccessDatetime: this.utcStringToDisplayDate(elem.lastAccessDatetime)
				};
			});
			this.invitation = res.filter(elem => 
				elem.accessTokenRegistered==='0'
			).map(elem => {
				const composeInvitation = (token) => {
					return 'https://talenthandong.site/admin/login?token=' + token;
				}
				return {
					createDatetime: this.utcStringToDisplayDate(elem.createDatetime),
					targetTalkProfileName: elem.targetTalkProfileName,
					accessToken: composeInvitation(elem.accessToken)
				};
			});
		});

		this.columns = [
			{ field: 'talkProfileName', header: '대화명' },
			{ field: 'accessLevel', header: '권한' },
			{ field: 'createDatetime', header: '등록일' },
			{ field: 'lastAccessDatetime', header: '최근접속' }
		];

		this.invitationColumn = [
			{ field: 'createDatetime', header: '초대 링크 생성일' },
			{ field: 'targetTalkProfileName', header: '초대할 어드민 대화명' },
			{ field: 'accessToken', header: '어드민 초대 링크 (클릭하여 복사하기)' }
		];
	}

	runAllow(uid: number) {
		if (confirm("해당 관리자의 정지를 해제하시겠습니까?")) {
			const request = {uid};
			this.loginService.runAllowAdminUser(request).toPromise().then((data: any) => {
				this.getAllowList();
			});	
		}
	}

	runDisallow(uid: number) {
		if (confirm("해당 관리자를 정지 처리 하시겠습니까?")) {
			const request = {uid};
			this.loginService.runDisallowAdminUser(request).toPromise().then((data: any) => {
				this.getAllowList();
			});
		}
	}

	runReject(uid: number) {
		if (confirm("해당 관리자 신청/정지 관리자를 삭제하시겠습니까?")) {
			alert("To be delivered");
			// TODO: complete this
		}
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
		return this.accessLevel === ACCESS_LEVEL_TYPE.MASTER || this.accessLevel == ACCESS_LEVEL_TYPE.SYS_ADMIN;
	}

	initForm() {
		this.adminInvitationForm = this.fb.group({
			targetTalkProfileName: ['', Validators.required],
			access: [this.accessOption.filter(elem=>elem.value==='ADM')[0].value, Validators.required]
		});
	}

	submit() {
		const { targetTalkProfileName, access: accessLevel } = this.adminInvitationForm.getRawValue();
		const request: RunIssueAdminInvitationReq = {
			targetTalkProfileName,
			accessLevel
		};
		this.dataService.runIssueAdminInvitation(request).toPromise().then(res => {
			this.dialogDisplay = false;
			alert('Admin invitation has been issued:\n' + res.data);
			this.getAllowList();
		}).catch(error => {
			alert(JSON.stringify(error));
		});
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
