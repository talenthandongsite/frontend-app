import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ADMIN_ROUTE_TYPE, ICONS_TYPE, LOCAL_STORAGE_TYPE, REGEX_TYPE, REGISTER_ROUTE_TYPE } from '@app/enums';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from "@services/data/data.service";
import { RunAdminRegisterReq, RunMemberRegisterReq } from "@app/interfaces";

@Component({
	selector: "app-join-page",
	templateUrl: "./join-page.component.html",
	styleUrls: ["./join-page.component.scss"]
})
export class JoinPageComponent implements OnInit {
	user_nm: string = "";
	stu_id: string = "";
	condition: boolean = false;
	hisnet_id: string = "";
	
	joinForm: FormGroup;
	numericRegex: RegExp;
	submitButtonIcon: string;
	block: boolean;

	routerLink = REGISTER_ROUTE_TYPE;

	private kakaoId: any;
	public allow: any;
	public kakaoui: any;

	get profile() {return this.joinForm.get('profile')}
	get name() {return this.joinForm.get('name')}
	get studentId() {return this.joinForm.get('studentId')}

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		private dataService: DataService
	) { }

	ngOnInit() {
		this.initMember();
		this.initForm();

		this.route.queryParams.subscribe(next => {
			const { id } = next;

			if (!id) {
				alert('Invalid Access');
				this.router.navigate([ADMIN_ROUTE_TYPE.LOGIN]);
			}
			
			this.kakaoId = id;
		});
	}

	initMember() {
		this.numericRegex = new RegExp(REGEX_TYPE.NUMERIC);
		this.submitButtonIcon = ICONS_TYPE.CHECK;
		this.block = false;
	}

	initForm() {
		this.joinForm = this.fb.group({
			// profile: ['', Validators.required],
			// name: ['', Validators.required],
			studentId: ['', Validators.required]
		});
	}

	handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			this.submit();
		}
	}

	submit() {
		if (this.joinForm.valid) {
			const { studentId } = this.joinForm.getRawValue();

			const request: RunMemberRegisterReq = {
				uid: this.kakaoId,
				studentId,
			}
			
			this.dataService.runMemberRegister(request).toPromise().then(res => {
				const { status, data } = res;

				if (!status) {
					alert("기존 회원 정보중 해당 학번이 존재하지 않습니다.");	
				}

				const { nickname, accessLevel, token } = data;
				localStorage.setItem(LOCAL_STORAGE_TYPE.TOKEN, token);
				localStorage.setItem(LOCAL_STORAGE_TYPE.USERNAME, nickname);
				localStorage.setItem(LOCAL_STORAGE_TYPE.ACCESS_LEVEL, accessLevel);
				this.router.navigate([ADMIN_ROUTE_TYPE.NAVIGATE_MAIN]);

			}).catch(error => {
				alert("기존 회원 정보중 해당 학번이 존재하지 않습니다.");
			});
		}
	}
}
