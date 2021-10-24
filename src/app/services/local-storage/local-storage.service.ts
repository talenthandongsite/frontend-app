import { Injectable } from '@angular/core';
import { ACCESS_LEVEL_TYPE, LOCAL_STORAGE_TYPE } from '@app/enums';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    setToken(token: string): void {
        localStorage.setItem(LOCAL_STORAGE_TYPE.TOKEN, token);
    }

    getToken(): string {
        return localStorage.getItem(LOCAL_STORAGE_TYPE.TOKEN);
    }

    setAccessLevel(accessLevel: ACCESS_LEVEL_TYPE): void {
        localStorage.setItem(LOCAL_STORAGE_TYPE.ACCESS_LEVEL, accessLevel);
    }

    getAccessLevel(): ACCESS_LEVEL_TYPE {
        return <ACCESS_LEVEL_TYPE>localStorage.getItem(LOCAL_STORAGE_TYPE.ACCESS_LEVEL);
    }

    setNickname(nickname: string): void {
        localStorage.setItem(LOCAL_STORAGE_TYPE.NICKNAME, nickname);
    }

    getNickname(): string {
        return localStorage.getItem(LOCAL_STORAGE_TYPE.NICKNAME);
    }

    logout(): void {
        localStorage.removeItem(LOCAL_STORAGE_TYPE.TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_TYPE.NICKNAME);
        localStorage.removeItem(LOCAL_STORAGE_TYPE.ACCESS_LEVEL);
    }
}
