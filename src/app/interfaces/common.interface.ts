import { ACCESS_LEVEL_TYPE } from "@app/enums";

export interface CommonRes {
    status: boolean;
    data?: any;
    error?: any;
}

export interface RunHisnetLoginReq {
    id: string;
    pw: string;
}

export interface RunHisnetLoginRes {
    name: string;
    id: any;
    status: string;
}

export interface RunRegistrationReq {
    from?: string;
    to?: string;
    subject?: string;
    body?: any;
    studentId: number;
    studentName: string;
    studentStatus: string;
    userName: string;
    userEmail: string; 
}

export interface RunRegistrationRes extends CommonRes {
    
}

export interface UpdateUserReq {
    studentId: string;
    status: string;
    userName: string;
    email: string;
}

export interface LoginResult {
    token: string;
    username: string;
    accessLevel: string;
}

export interface RunMemberLoginReq {
    uid: string;
}

export interface RunMemberLoginRes {
    status: boolean;
    data: {
        nickname: string,
        accessLevel: ACCESS_LEVEL_TYPE,
        token: string
    }
}

export interface RunMemberRegisterReq {
    uid: string;
    studentId: string;
}

export interface RunMemberRegisterRes {
    status: boolean;
    data: {
        nickname: string,
        accessLevel: ACCESS_LEVEL_TYPE,
        token: string
    }
}

export interface RunMemberTokenVerifyRes {
    status: boolean;
    data: {
        nickname: string;
        accessLevel: ACCESS_LEVEL_TYPE;
    }
}

export interface RunAdminLoginReq {
    uid: string;
}

export interface RunAdminLoginRes extends LoginResult {
    
}

export interface RunAdminRegisterReq {
    uid: string;
    stdID: string;
    name: string;
    talkProfileName: string; 
    accessToken: string;
}

export interface RunAdminRegisterRes extends LoginResult {

}

export interface RunVerifyAccessReq {
    accessLevel: string;
}

export interface SelectUserRes {
    stdID: string;
    stuName: string;
    nickname: string;
    email: string;
    order: number;
    register_state: string;
    reg_data: string;
    useYn: string;
    interviewLink: string;
    isActive: string;
}

export interface SelectInvitationRes {
    invitation: string;
    adminUid: string;
    studentId: string;
    createDatetime: string;
    updateDatetime: string;
    isActive: string;
}

export interface CreateInvitationReq {
    uid: string;
}

export interface RunTransferInvitationReq {
    invitation: string;
    uid: string;
}

export interface RunRegisterInterviewReq {
    studentId: string;
    url: string;
    invitation: string;
}
