import { Component, OnInit, ViewChild } from "@angular/core";
import { LoginService } from '@services/login/login.service';
import { RunRegistrationReq, UpdateUserReq, User } from '@app/interfaces';
import { Table } from 'primeng/table';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ACCESS_LEVEL_TYPE, DATA_LENGTH_TYPE, ICONS_TYPE, LOCAL_STORAGE_TYPE, REGEX_TYPE } from '@app/enums';
import { DataService } from "@services/data/data.service";

interface RawData {
	email: string;
	modifier: boolean;
	nickname: string;
	order: number;
	reg_data: string;
	register_state: string;
	stdID: string;
	stuName: string;
	useYn: number;
}

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

	accessLevel: ACCESS_LEVEL_TYPE;

	users: User[];
	columns: any[];
	dialogDisplay: boolean;
	selectedUser: User;

	interview: User[];
	interviewColumns: any[];

	icons = ICONS_TYPE;

	dataLength = DATA_LENGTH_TYPE;

	userEditorForm: FormGroup;

	@ViewChild('userTable') userTable: Table;

	get name() {return this.userEditorForm.get('name');}
	get studentId() {return this.userEditorForm.get('studentId');}
	get status() {return this.userEditorForm.get('status');}
	get userName() {return this.userEditorForm.get('userName');}
	get email() {return this.userEditorForm.get('email');}
	get order() {return this.userEditorForm.get('order');}
	get registrationDateTime() {return this.userEditorForm.get('registrationDateTime');}

	constructor(private dataService: DataService, private fb: FormBuilder) { }

	ngOnInit(): void {
		this.accessLevel = <ACCESS_LEVEL_TYPE>localStorage.getItem(LOCAL_STORAGE_TYPE.ACCESS_LEVEL);
		this.initializeMember();
		this.getUserList();
	}

	initializeMember() {
		this.dialogDisplay = false;

		this.columns = [
			{ field: 'studentId', header: '학번', colWidth: '10%' },
			{ field: 'name', header: '이름', colWidth: '10%' },
			{ field: 'registerStatus', header: '학적', colWidth: '10%' },
			{ field: 'nickname', header: '카카오톡 대화명', colWidth: '15%' },
			{ field: 'email', header: '메일', colWidth: '15%' },
			{ field: 'createDateTime', header: '가입신청일', colWidth: '20%' }
		];
		
		// if (!this.accessible()) {
		// 	this.columns = [
		// 		{ field: 'studentId', header: '학번', colWidth: '20%' },
		// 		{ field: 'userName', header: '카카오톡 대화명', colWidth: '20%' },
		// 		{ field: 'email', header: '메일', colWidth: '20%' },
		// 		{ field: 'registrationDateTime', header: '가입신청일', colWidth: '20%' }
		// 	];
		// } else {
		// 	this.columns = [
		// 		{ field: 'studentId', header: '학번', colWidth: '10%' },
		// 		{ field: 'name', header: '이름', colWidth: '10%' },
		// 		{ field: 'status', header: '학적', colWidth: '10%' },
		// 		{ field: 'userName', header: '카카오톡 대화명', colWidth: '15%' },
		// 		{ field: 'email', header: '메일', colWidth: '15%' },
		// 		{ field: 'registrationDateTime', header: '가입신청일', colWidth: '20%' }
		// 	];
		// }

		this.userEditorForm = this.fb.group({
			name: ["", Validators.required],
			studentId: [0, [Validators.required, Validators.pattern(REGEX_TYPE.NUMERIC)]],
			status: ["", Validators.required],
			userName: ["", Validators.required],
			email: ["", [Validators.required, Validators.pattern(REGEX_TYPE.EMAIL)]],
			order: [-1, [Validators.required, Validators.pattern(REGEX_TYPE.NUMERIC)]],
			registrationDateTime: [null],
		});

		this.registrationDateTime.disable();
	}

	getUserList() {
		this.dataService.selectUser().toPromise().then(response => {
			const mappedData = response.map(elem => {
				const mapped: User = {
					studentId: parseInt(elem.stdID),
					name: elem.stuName,
					userName: elem.nickname,
					email: elem.email,
					order: elem.order,
					status: elem.register_state,
					registrationDateTime: this.utcStringToDisplayDate(elem.reg_data),
					isActive: elem.isActive,
					interviewLink: elem.interviewLink
				};

				mapped['originalDateString'] = elem.reg_data;

				return mapped;
			});

			this.users = mappedData;
			this.interview = mappedData.filter(elem => elem.isActive === '1');
		});

		this.dataService.listMember().toPromise().then(result => {
			console.log(result);
		})
	}

	runAdd() {
		this.userEditorForm.patchValue({
			name: "",
			studentId: null,
			status: "",
			userName: "",
			email: "",
			order: null,
			registrationDateTime: null
		});

		if (this.name.disabled) {
			this.name.enable();
		}
		if (this.studentId.disabled) {
			this.studentId.enable();
		}

		this.selectedUser = null;
		this.dialogDisplay = true;
	}

	runEdit(selectedUser: User) {

		const {name, studentId, status, userName, email, order, registrationDateTime} = selectedUser;

		this.userEditorForm.patchValue({
			name,
			studentId,
			status,
			userName,
			email,
			order,
			registrationDateTime
		});

		if (this.name.enabled) {
			this.name.disable();
		}
		if (this.studentId.enabled) {
			this.studentId.disable();
		}

		this.selectedUser = selectedUser;
		this.dialogDisplay = true;
	}

	runDelete(studentId) {
		if (window.confirm("선택한 유저를 삭제하시겠습니까?")) {
			this.dataService.removeUser(studentId).toPromise().then(response => {
				this.getUserList();
			});
		}
	}
	
	submit() {
		if (this.selectedUser) {
			console.log("edit")

			const { studentId, status, userName, email } = this.userEditorForm.getRawValue();

			const request: UpdateUserReq = {
				studentId, status, userName, email
			};
			this.dataService.updateUser(request).toPromise().then(res => {
				this.dialogDisplay = false;
				
				this.getUserList();
			}).catch(error => {
				alert(JSON.stringify(error));
			});
		} else {
			console.log("add")

			alert('TBD')
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

	openUrl(link) {
		const externalWindow = window.open(link, '_blank');
		externalWindow.focus();
	}

	accessible(): boolean {
		return this.accessLevel === ACCESS_LEVEL_TYPE.MASTER || this.accessLevel == ACCESS_LEVEL_TYPE.SYS_ADMIN;
	}
}