import { Injectable } from "@angular/core";

@Injectable()
export class LoginSession {
	private user_no: number = 0;
	private user_nm: string = "";
	private waiting: boolean = false;

  	constructor() {
		this.setInfo(
			localStorage.getItem("gh_user_no"),
			localStorage.getItem("gh_user_nm")
		);
  	}

	getInfo() {
		return {
			user_no: this.user_no,
			user_nm: this.user_nm
		};
	}

	setLoggedIn(user_no) {
		this.setInfo(user_no, "");
	}

	setInfo(user_no, user_nm) {
		this.user_no = user_no == null ? 0 : user_no;
		this.user_nm = user_nm == null ? "" : user_nm;

		localStorage.setItem("gh_user_no", this.user_no.toString());
		localStorage.setItem("gh_user_nm", this.user_nm);
	}

	clearInfo() {
		this.setInfo("", "");
	}

	isPermitted(): boolean {
		let result: boolean = false;

		try {
			result = this.user_nm.length > 0;
		} catch (error) {
			result = false;
		}

		return result;
	}

	isLoggedIn(): boolean {
		return this.user_no > 0 && this.user_nm.length < 1;
	}

	setWaiting() {
		this.waiting = true;
	}

	isWaiting(): boolean {
		return this.waiting;
	}
  
}
