import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LOCAL_STORAGE_TYPE } from "@app/enums";

@Injectable()
export class DataInterceptor implements HttpInterceptor {

    constructor (private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem(LOCAL_STORAGE_TYPE.TOKEN);
        if (token) {
            const tokenizedReq = req.clone({
                setHeaders: {
                    Authorization: token
                }
            });
            return next.handle(tokenizedReq);
        } else {
            return next.handle(req);
        }
    }
}