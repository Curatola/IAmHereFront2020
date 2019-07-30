import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) {}
  public static API_URL = 'http://192.168.0.3:5000/';
  public static readonly PROFESSOR = 'Professor';
  public static readonly ALUNO = 'Aluno';

  public static erroHandler(httpError: HttpErrorResponse) {
    console.log(httpError);

    if (httpError.status === 400) throw new Error(httpError.error.error);
    else if (httpError.status === 401) throw new Error('401');
    else if (httpError.status === 0)
      throw new Error('Não foi possivel se conectar ao servidor!');
    else throw new Error('Erro desconhecido');
  }

  userIsLogged(): boolean {
    if (this.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  getToken(): string {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  getUserType(): string {
    return localStorage.getItem('user') || sessionStorage.getItem('user');
  }

  deslogarOnlyOnApp() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
  }

  async deslogar() {
    try {
      await this.http
        .post(AuthService.API_URL + 'logoff', {}, {withCredentials: true })
        .toPromise();
      this.deslogarOnlyOnApp();
    } catch (error) {
      AuthService.erroHandler(error);
    }
  }

  async login(email: string, password: string, isPersistent: boolean) {
    let header = new HttpHeaders();
    header = header.set('Authorization', 'Basic ' + btoa(email + ':' + password));
    try {
      let result = await this.http
        .get<any>(AuthService.API_URL + 'login', { headers: header })
        .toPromise();

      if (isPersistent) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', result.userType);
      } else {
        sessionStorage.setItem('token', result.token);
        sessionStorage.setItem('user', result.userType);
      }
    } catch (error) {
      if (error.status === 401) {
        throw new Error('Não é possivel logar com essas informações');
      } else {
        AuthService.erroHandler(error);
      }
    }
  }
}
