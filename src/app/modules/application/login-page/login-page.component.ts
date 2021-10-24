import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ADMIN_ROUTE_TYPE, LOCAL_STORAGE_TYPE } from '@app/enums';
import { DataService } from "@services/data/data.service";
import { LocalStorageService } from "@services/local-storage/local-storage.service";

declare let Kakao;

export interface InformationElement {
	uid: string;
	stu_no: string;
	name: string;
	is_allowed: number;
}

@Component({
	selector: "app-login-page",
	templateUrl: "./login-page.component.html"
})
export class LoginPageComponent implements OnInit {

	result: InformationElement[] = [];
	judge_uid;
	idid;

	token;

	constructor(
		private router: Router,
		private localStorageService: LocalStorageService,
		private dataService: DataService,
	) {}

	ngOnInit() {
		if (!Kakao.isInitialized()) {
			Kakao.init("010b3b9a2c9ec42305cf257f4e27b9c0");
		}

		Kakao.Auth.createLoginButton({
			container: "#kakao-login-btn",
			success: (authObj) => {
				Kakao.API.request({
					url: "/v2/user/me",
					success: (response) => {
						const { id } = response;
						const runMemberLoginRequest = { uid: id };

						this.dataService.runMemberLogin(runMemberLoginRequest).toPromise().then(result => {
							if (!result.status) {
								console.log(status)
							}
							const { token, nickname, accessLevel } = result.data;
							
							this.localStorageService.setToken(token);
							this.localStorageService.setNickname(nickname);
							this.localStorageService.setAccessLevel(accessLevel);

							this.router.navigate([ADMIN_ROUTE_TYPE.NAVIGATE_MAIN]);

						}).catch(error => {

							alert(error);
							if (error.status == 403) {
								alert("관리자에 의해 정지된 계정입니다.");
							} else if (error.status == 401) {
								this.goJoinPage(id);
							} else {
								alert("문제가 발생했습니다.");
							}
						});
					},
					fail: (error) => { alert(JSON.stringify(error)) }
				});
			},
			fail: (error) => { alert(JSON.stringify(error)) }
		});
	}

	goJoinPage(id: string) {
		this.router.navigate([ADMIN_ROUTE_TYPE.NAVIGATE_JOIN_PAGE], { queryParams: { id }});
	}
}
