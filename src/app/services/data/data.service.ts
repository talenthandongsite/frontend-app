import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { 
    CreateInvitationReq,
    RunAdminLoginReq, RunAdminLoginRes, 
    RunAdminRegisterReq, RunAdminRegisterRes, 
    RunHisnetLoginReq, RunHisnetLoginRes, 
    RunIssueAdminInvitationReq, 
    RunMemberLoginReq, 
    RunMemberLoginRes, 
    RunMemberRegisterReq, 
    RunMemberRegisterRes, 
    RunMemberTokenVerifyRes, 
    RunRegisterInterviewReq, 
    RunRegistrationReq, RunRegistrationRes, RunTransferInvitationReq, RunVerifyAccessReq, SelectAdminRes, SelectInvitationRes, SelectNdxBookRes, SelectUserRes, UpdateUserReq
} from '@app/interfaces';
import { REQUEST_URL_TYPE } from '@app/enums';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) { }

    selectStatus(): Observable<any> {
        return this.http.get<any>(REQUEST_URL_TYPE.SELECT_STATUS);
    }

    selectServer(): Observable<any> {
        return this.http.get<any>(REQUEST_URL_TYPE.SELECT_SERVER);
    }

    runHisnetLogin(request: RunHisnetLoginReq): Observable<RunHisnetLoginRes> {
        return this.http.post<RunHisnetLoginRes>(REQUEST_URL_TYPE.RUN_HISNET_LOGIN, request);
    }

    runMemberLogin(request: RunMemberLoginReq) {
        return this.http.post<RunMemberLoginRes>(REQUEST_URL_TYPE.RUN_MEMBER_LOGIN, request);
    }

    runMemberRegister(request: RunMemberRegisterReq) {
        return this.http.post<RunMemberRegisterRes>(REQUEST_URL_TYPE.RUN_MEMBER_REGISTER, request);
    }

    runMemberTokenVerify() {
        return this.http.get<RunMemberTokenVerifyRes>(REQUEST_URL_TYPE.RUN_MEMBER_TOKEN_VERIFY);
    }

    runAdminLogin(request: RunAdminLoginReq): Observable<RunAdminLoginRes> {
        return this.http.post<RunAdminLoginRes>(REQUEST_URL_TYPE.RUN_ADMIN_LOGIN1, request);
    }

    runAdminRegister(request: RunAdminRegisterReq): Observable<RunAdminRegisterRes> {
        return this.http.post<RunAdminRegisterRes>(REQUEST_URL_TYPE.RUN_ADMIN_REGISTER, request);
    }

    runVerifyAccess(request: RunVerifyAccessReq): Observable<boolean> {
        return this.http.post<boolean>(REQUEST_URL_TYPE.RUN_VERIFY_ACCESS, request);
    }

    selectAdmin(): Observable<SelectAdminRes[]> {
        return this.http.get<SelectAdminRes[]>(REQUEST_URL_TYPE.ADMIN);
    }

    runIssueAdminInvitation(request: RunIssueAdminInvitationReq): Observable<{data:string}> {
        return this.http.post<{data:string}>(REQUEST_URL_TYPE.RUN_ISSUE_ADMIN_INVITATION, request);
    }

    selectUser(): Observable<SelectUserRes[]> {
        return this.http.get<SelectUserRes[]>(REQUEST_URL_TYPE.USER);
    }

    createUser(request: RunRegistrationReq): Observable<RunRegistrationRes> {
        return this.http.post<RunRegistrationRes>(REQUEST_URL_TYPE.USER, request);
    }

    updateUser(request: UpdateUserReq): Observable<any> {
        return this.http.put<RunRegistrationRes>(REQUEST_URL_TYPE.USER, request);
    }

    removeUser(request: number): Observable<any> {
        return this.http.delete<any>(REQUEST_URL_TYPE.USER + `/${request}`);
    }

    selectInvitation(): Observable<SelectInvitationRes[]> {
        return this.http.get<SelectInvitationRes[]>(REQUEST_URL_TYPE.INVITATION);
    }

    createInvitation(request: CreateInvitationReq): Observable<boolean> {
        return this.http.post<boolean>(REQUEST_URL_TYPE.INVITATION, request);
    }

    runTransferInvitation(request: RunTransferInvitationReq): Observable<any> {
        return this.http.put<any>(REQUEST_URL_TYPE.INVITATION, request);
    }

    runDisableInvitation(invitation: string): Observable<any> {
        return this.http.delete<any>(REQUEST_URL_TYPE.INVITATION + `?invitation=${invitation}`);
    }

    runCheckUserData(studentId): Observable<any> {
        return this.http.get<any>(REQUEST_URL_TYPE.USER + `/${studentId}`);
    }

    runRegisterInterview(request: RunRegisterInterviewReq): Observable<{code:number}> {
        return this.http.post<{code:number}>(REQUEST_URL_TYPE.RUN_REGISTER_INTERVIEW, request);
    }

    runVerifyInvitation(invitation: string): Observable<any> {
        return this.http.get<any>(REQUEST_URL_TYPE.VERIFY_INVITATION + `?invitation=${invitation}`);
    }

    selectNdxBook(): Observable<SelectNdxBookRes[]> {
        return this.http.get<SelectNdxBookRes[]>(REQUEST_URL_TYPE.SELECT_NDX_BOOK);
    }

    listMember(): Observable<any> {
        return this.http.get<any>(REQUEST_URL_TYPE.LIST_MEMBER)
    }

    selectMember(id: number): Observable<any> {
        return this.http.get<any>(REQUEST_URL_TYPE.SELECT_MEMBER + '/' + id);
    }

    updateMember(id: number, data): Observable<any> {
        return this.http.put<any>(REQUEST_URL_TYPE.UPDATE_MEMBER + '/' + id, data);
    }
}
