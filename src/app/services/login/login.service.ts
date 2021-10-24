import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { REQUEST_URL_TYPE } from '@app/enums';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) { }

    runAdminLogin(request): Observable<any> {
        return this.http.post<any>(REQUEST_URL_TYPE.RUN_ADMIN_LOGIN, request);
    }

    selectAdminUser(): Observable<any> {
        return this.http.get<any>(REQUEST_URL_TYPE.ADMIN_USER);
    }

    createAdminUser(request): Observable<any> {
        return this.http.post<any>(REQUEST_URL_TYPE.ADMIN_USER, request);
    }

    runAllowAdminUser(request): Observable<any> {
        return this.http.put<any>(REQUEST_URL_TYPE.RUN_ALLOW_ADMIN_USER, request);
    }

    runDisallowAdminUser(request): Observable<any> {
        return this.http.put<any>(REQUEST_URL_TYPE.RUN_DISALLOW_ADMIN_USER, request);
    }

    selelctUser(): Observable<any> {
        return this.http.get<any>(REQUEST_URL_TYPE.DEPRICATED_USER);
    }

    removeUser(request: number): Observable<any> {
        return this.http.delete<any>(REQUEST_URL_TYPE.DEPRICATED_USER + `/${request}`);
    }
}
