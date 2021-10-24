export enum DATA_LENGTH_TYPE {
    L10 = 10,
    L20 = 20,
    L50 = 50,
    L100 = 100,
    L200 = 200
}

export enum LOCAL_STORAGE_TYPE {
    TOKEN = 'token',
    USERNAME = 'username',
    NICKNAME = 'nickname',
    ACCESS_LEVEL = 'accessLevel',
    PROGRESS = 'progress'
}

export enum ICONS_TYPE {
    CHECK = 'pi pi-check',
    SIGN_IN = 'pi pi-sign-in',
    SIGN_OUT = 'pi pi-sign-out',
    SPINNER = 'pi pi-spin pi-spinner',
    USER = 'pi pi-user',
    LIST = 'pi pi-list',
    CLIP = 'pi pi-paperclip',
    OUTER_LINK = 'pi pi-external-link',
    TICKET = 'pi pi-ticket',
}

export enum REGEX_TYPE {
    EMAIL = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
    NUMERIC = '^[0-9]+$',
    BASE64 = '^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$',
    STUDENT_ID = '(\\d){8}',
}

export enum ACCESS_LEVEL_TYPE {
    APPLICANT = 'APPLICANT',
    MEMBER = 'MEMBER',
    ADMIN = 'ADMIN',
    SYS_ADMIN = 'SYS_ADMIN',
    MASTER = 'MASTER'
}

export enum STATUS_TYPE {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}