export enum REQUEST_URL_TYPE {
    RUN_HISNET_LOGIN = '/api/api/search',
    
    USER = '/api/api/user',  
    RUN_REGISTER_INTERVIEW = '/api/api/user/interview',

    ADMIN = '/api/api/admin',
    RUN_ADMIN_REGISTER = '/api/api/admin/register',
    RUN_ADMIN_LOGIN1 = '/api/api/admin/login',
    RUN_VERIFY_ACCESS = '/api/api/admin/access',
    RUN_ISSUE_ADMIN_INVITATION = '/api/api/admin/issue',

    RUN_MEMBER_LOGIN = '/api/member/login',
    RUN_MEMBER_REGISTER = '/api/member/register',
    RUN_MEMBER_TOKEN_VERIFY = '/api/member/verify',

    INVITATION = '/api/api/invitation',
    VERIFY_INVITATION = '/api/api/invitation/verify',

    ADMIN_USER = '/api/admin/adminUser',
    RUN_ADMIN_LOGIN = '/api/admin/adminUser/login',
    RUN_ALLOW_ADMIN_USER = '/api/admin/adminUser/allow',
    RUN_DISALLOW_ADMIN_USER = '/api/admin/adminUser/disallow',

    DEPRICATED_USER = '/api/admin/user',

    SELECT_SERVER = '/api',
    SELECT_STATUS = '/api/util/siteStatus',

    SELECT_NDX_BOOK = '/api/ndxBook',
    LIST_MEMBER = '/api/member',
    SELECT_MEMBER = '/api/member',
    UPDATE_MEMBER = '/api/member',
}

export enum ServerUrl {
    v1 = '/api/v1',
}

export enum RequestUrl {
    ndxBook = '/ndxBook',
}