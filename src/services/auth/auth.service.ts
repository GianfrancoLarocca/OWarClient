import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUserReg } from '../../interfaces/i-user-reg';
import { IUserLogin } from '../../interfaces/i-user-login';
import { ILoginResponse } from '../../interfaces/i-login-response';
import { Router } from '@angular/router';
import { IAccountActivation } from '../../interfaces/iaccount-activation';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //backend url
  localhostUrl: string = 'http://localhost:7070/api/auth';

  //general fields

  //dependencies
  http = inject(HttpClient);
  router = inject(Router)

  constructor() {
  }

  //chiamate http al backend
  registerUser(user: IUserReg){
    return this.http.post<any>(this.localhostUrl + '/register', user);
  }

  loginUser(user: IUserLogin) {
    return this.http.post<ILoginResponse>(this.localhostUrl + '/login', user);
  }

  activeAccount(accountActivation: IAccountActivation){
    return this.http.post<any>(`${this.localhostUrl}/account-activation/${accountActivation.userEmail}/${accountActivation.activationCode}`, {});
  }

  resetPasswordEmail(userEmail: string) {
    return this.http.post(`${this.localhostUrl}/reset/password/email/${userEmail}`, null, { responseType: 'text' })
  }

  resetPassword(userEmail: string, code: string, password: string, passwordConfirm: string) {
    return this.http.post(`${this.localhostUrl}/reset/password/${userEmail}/${code}`, { "password": password, "passwordConfirm": passwordConfirm}, { responseType: 'text' })
  }

  //metodi utili
  getUser(): ILoginResponse {
    const user = localStorage.getItem('auth');
    const js: ILoginResponse = JSON.parse(user!)
    return js;
  }

  isExpired() {
    const user = this.getUser();
    let isExpired:boolean = Date.now() > new Date(user.exp).getTime() ? true : false;
    return isExpired;
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user.role == 'ADMIN' ? true : false;
  }
}
