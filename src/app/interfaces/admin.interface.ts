export interface User {
    studentId: number;
    name: string;
    userName: string;
    email: string;
    status: string;
    order: number;
    registrationDateTime: string;
    isActive?: string;
    interviewLink?: string;
}

export interface SelectAdminRes {
    uid: string;
    talkProfileName: string;
    targetTalkProfileName: string;
    is_allowed: number;
    accessLevel: string;
    accessToken: string;
    accessTokenRegistered: string;
    createDatetime: string;
    lastAccessDatetime: string;
}

export interface RunIssueAdminInvitationReq {
    targetTalkProfileName: string;
    accessLevel: string;
}