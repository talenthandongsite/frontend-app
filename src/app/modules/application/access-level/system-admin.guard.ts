import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { ACCESS_LEVEL_TYPE, APP_ROUTE_TYPE, LOCAL_STORAGE_TYPE } from '@app/enums';
import { DataService } from "@services/data/data.service";
import { LocalStorageService } from "@services/local-storage/local-storage.service";

@Injectable()
export class SystemAdminGuard implements CanActivate {
	constructor(private router: Router, private localStorageService: LocalStorageService, private dataService: DataService) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
        const token = localStorage.getItem(LOCAL_STORAGE_TYPE.TOKEN);

        if (token) {
            return this.dataService.runMemberTokenVerify().toPromise().then(result => {
                const { status, data: { nickname, accessLevel } } = result;

                if (!status) {
                    return false;
                }

                if ( accessLevel === ACCESS_LEVEL_TYPE.APPLICANT || accessLevel === ACCESS_LEVEL_TYPE.MEMBER || accessLevel === ACCESS_LEVEL_TYPE.ADMIN ) {
                    return false;
                }

                this.localStorageService.setAccessLevel(accessLevel);
                this.localStorageService.setNickname(nickname);

                return true;      
            }).catch(error => {
                console.log(error);
                this.router.navigate([APP_ROUTE_TYPE.NAVIGATE_LOGIN]);
                return false;
            });
        } else {
            this.router.navigate([APP_ROUTE_TYPE.NAVIGATE_LOGIN]);
			return of(false);
        }
    }
}
