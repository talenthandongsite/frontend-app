import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { DATA_LENGTH_TYPE, ICONS_TYPE, LOCAL_STORAGE_TYPE, REGISTER_ROUTE_TYPE } from '@app/enums';
import { MenuItem } from 'primeng/api';
import * as CryptoJs from 'crypto-js';

const FORM_STEP: MenuItem[] = [
    {label: "회원가입 안내사항"},
    {label: "개인정보동의"},
    {label: "구성원인증동의"},
    {label: "위험고지"},
    {label: "학회약관"},
    {label: "구성원인증"},
    {label: "추가정보입력"},
    {label: "인터뷰영상링크"}
];

const KEY = 'f19fnjIenEa1O2De';
const SPEC = {
    iv: CryptoJs.enc.Utf8.parse('0000000000000000'),
    padding: CryptoJs.pad.Pkcs7,
    mode: CryptoJs.mode.ECB
}

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

    currentStepIndex: number;
    steps: MenuItem[];

    dataLength = DATA_LENGTH_TYPE;
    block: boolean;

    hisnetCheckButtonIcon: string;
    registrationButtionIcon: string;

    isOnlyInterview;
    studentId;
    name;
    status;
    talkProfileName;
    email;
    interviewUrl;
    invitation;

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() { 
        this.initMember();
    }

    initMember() {
        this.currentStepIndex = 0;
        this.block = false;
        this.hisnetCheckButtonIcon = ICONS_TYPE.SIGN_IN;
        this.registrationButtionIcon = ICONS_TYPE.CHECK;
        this.steps = FORM_STEP;
        this.isOnlyInterview = false;
        
        this.route.queryParams.subscribe(next => {
            const { token } = next;
            this.invitation = token;
            this.loadProgress();
        });
    }

    nextStep() {
        this.currentStepIndex += 1;
        this.scrollToTop();
    }

    handleScrapping(e) {
        const { studentId, name, status, talkProfileName, email } = e;

        this.studentId = studentId;
        this.name = name;
        this.status = status;

        if (talkProfileName) {
            this.isOnlyInterview = true;
            this.talkProfileName = talkProfileName;
            this.email = email;

            this.saveProgress(studentId, talkProfileName);

            this.currentStepIndex += 1;
            this.nextStep();
        } else {
            this.nextStep();
        }
    }

    handleRegister(e) {
        const { talkProfileName, email } = e;

        this.talkProfileName = talkProfileName;
        this.email = email;
        
        this.saveProgress(this.studentId, talkProfileName);

        this.nextStep();
    }

    loadProgress() {
        const cipher = localStorage.getItem(LOCAL_STORAGE_TYPE.PROGRESS);

        if (cipher) {
            const payload = CryptoJs.AES.decrypt(cipher, KEY, SPEC).toString(CryptoJs.enc.Utf8);
            const { studentId, talkProfileName } = JSON.parse(payload);
            this.studentId = studentId;
            this.talkProfileName = talkProfileName;
            this.currentStepIndex = FORM_STEP.length - 1;
        }
    }

    saveProgress(studentId: string, talkProfileName: string) {
        const payload = JSON.stringify({studentId, talkProfileName});
        const progress = CryptoJs.AES.encrypt(payload, KEY, SPEC).toString();
        localStorage.setItem(LOCAL_STORAGE_TYPE.PROGRESS, progress);
    }

    goToComplete(e) {
        localStorage.removeItem(LOCAL_STORAGE_TYPE.PROGRESS);
        this.router.navigate([REGISTER_ROUTE_TYPE.NAVIGATE_COMPLETE]);
    }

    scrollToTop() {
        window.scroll({top:0, left:0, behavior: 'smooth'});
    }
}
