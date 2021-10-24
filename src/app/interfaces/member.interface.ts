import { ACCESS_LEVEL_TYPE } from "@app/enums";

export interface ListMemberOutput {
    status: boolean;
    data: {
        id: number;
        accessLevel: ACCESS_LEVEL_TYPE;
        createDatetime: "2020-12-23T05:32:08.000Z"
        lastAccessDatetime: "2021-10-17T10:38:12.000Z"
        name: "조재은"
        nickname: "김페르난도"
        registerState: "졸업"
        status: "ACTIVE"
        studentId: "21300733"
        updateDatetime: "2021-10-17T01:38:13.000Z"
    }[]
}

export interface MemberOuput {
    
}