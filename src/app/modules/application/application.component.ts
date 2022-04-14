import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ACCESS_LEVEL_TYPE, APP_ROUTE_TYPE, ICONS_TYPE } from '@app/enums';
import { LocalStorageService } from '@services/local-storage/local-storage.service';

@Component({
    selector: 'app-application',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
    
    icon = ICONS_TYPE;
    nickname: string;
    accessLevel: ACCESS_LEVEL_TYPE;

    menuSidebar: boolean = false;
    userSidebar: boolean = false;

    currentActivatedMenu;

    constructor(private router: Router, private localStorageService: LocalStorageService) { }

    ngOnInit() { 
        this.nickname = this.localStorageService.getNickname();
        this.accessLevel = this.localStorageService.getAccessLevel();
        this.currentActivatedMenu = this.router.url.split('/').length == 2 ? '' : this.router.url.split('/')[2];

        // if (!this.nickname || !this.accessLevel) {
        //     this.logout();
        // }
    }

    isAdmin(): boolean {
        return this.accessLevel !== ACCESS_LEVEL_TYPE.APPLICANT && this.accessLevel !== ACCESS_LEVEL_TYPE.MEMBER;
    }


    goToNdxBook() {
        if (!this.isNasdaqBook()) {
            this.router.navigate([APP_ROUTE_TYPE.NAVIGATE_NASDAQ_BOOK]);
            this.currentActivatedMenu = APP_ROUTE_TYPE.NASDAQ_BOOK;
            this.menuSidebar = false;
            this.userSidebar = false;
        }
    }

    goToFttModel() {
        if (!this.isFttModel()) {
            this.router.navigate([APP_ROUTE_TYPE.NAVIGATE_FTT_MODEL]);
            this.currentActivatedMenu = APP_ROUTE_TYPE.FTT_MODEL;
            this.menuSidebar = false;
            this.userSidebar = false;
        }
    }

    goToDownload() {
        if (!this.isDownload()) {
            this.router.navigate([APP_ROUTE_TYPE.NAVIGATE_DOWNLOAD]);
            this.currentActivatedMenu = APP_ROUTE_TYPE.DOWNLOAD;
            this.menuSidebar = false;
            this.userSidebar = false;
        }
    }

    // goToMain() {
    //     if (!this.isMain()) {
    //         this.router.navigate([APP_ROUTE_TYPE.NAVIGATE_MAIN]);
    //         this.currentActivatedMenu = '';
    //         this.menuSidebar = false;
    //         this.userSidebar = false;
    //     }
    // }

    // goToMember() {
    //     if (!this.isMember()) {
    //         this.router.navigate([APP_ROUTE_TYPE.NAVIGATE_MEMBER]);
    //         this.currentActivatedMenu = APP_ROUTE_TYPE.MEMBER;
    //         this.menuSidebar = false;
    //         this.userSidebar = false;
    //     }
    // }

    // goToTicket() {
    //     if (!this.isTicket()) {
    //         this.router.navigate([APP_ROUTE_TYPE.NAVIGATE_MEMBER]);
    //         this.currentActivatedMenu = APP_ROUTE_TYPE.MEMBER;
    //         this.menuSidebar = false;
    //         this.userSidebar = false;
    //     }
    // }


    // goToUsers() {
    //     if (!this.isUser()) {
    //         this.router.navigate([APP_ROUTE_TYPE.NAVIGATE_USERS]);
    //         this.currentActivatedMenu = APP_ROUTE_TYPE.USERS;
    //         this.menuSidebar = false;
    //         this.userSidebar = false;
    //     }
    // }

    // goToAllow() {
    //     if (!this.isAllow()) {
    //         this.router.navigate([APP_ROUTE_TYPE.NAVIGATE_ALLOW]);
    //         this.currentActivatedMenu = APP_ROUTE_TYPE.ALLOW;
    //         this.menuSidebar = false;
    //         this.userSidebar = false;
    //     }
    // }

    // goToInvitation() {
    //     if (!this.isInvitation()) {
    //         this.router.navigate([APP_ROUTE_TYPE.NAVIGATE_INVITATION]);
    //         this.currentActivatedMenu = APP_ROUTE_TYPE.INVIATION;
    //         this.menuSidebar = false;
    //         this.userSidebar = false;
    //     }
    // }

    isNasdaqBook() {
        return this.currentActivatedMenu === APP_ROUTE_TYPE.NASDAQ_BOOK;
    }

    isFttModel() {
        return this.currentActivatedMenu === APP_ROUTE_TYPE.FTT_MODEL;
    }

    isDownload() {
        return this.currentActivatedMenu === APP_ROUTE_TYPE.DOWNLOAD;
    }

    // isMain() {
    //     return this.currentActivatedMenu == '';
    // }

    // isMember() {
    //     return this.currentActivatedMenu === APP_ROUTE_TYPE.MEMBER;
    // }

    // isTicket() {
    //     return this.currentActivatedMenu === APP_ROUTE_TYPE.TICKET;
    // }


    // isUser() {
    //     return this.currentActivatedMenu === APP_ROUTE_TYPE.USERS;
    // }

    // isAllow() {
    //     return this.currentActivatedMenu === APP_ROUTE_TYPE.ALLOW;
    // }

    // isInvitation() {
    //     return this.currentActivatedMenu === APP_ROUTE_TYPE.INVIATION;
    // }

    // logout() {
    //     this.localStorageService.logout();
    //     this.router.navigate([APP_ROUTE_TYPE.NAVIGATE_LOGIN]);
    // }
}
