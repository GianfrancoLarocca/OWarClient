import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ILoginResponse } from '../../interfaces/i-login-response';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  router = inject(Router)
  authService = inject(AuthService)

  constructor(){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const user: ILoginResponse = this.authService.getUser();

    const authToken = user?.token;
    const tokenType = user?.type;
    request = request.clone({
      setHeaders: {
        Authorization: authToken ? `${tokenType}${authToken}` : '',
      },
    });

    return next.handle(request);

  }

}
