import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler){
        if (req.withCredentials) {
            const token = this.auth.getToken();
            const authReq = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                },
                withCredentials: false
            });


            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}