import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) {}
  public static readonly API_VERSION = 'api_v1';
  public static readonly API_URL = 'http://172.17.105.233:5000/' + AuthService.API_VERSION;

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
    return JSON.parse(localStorage.getItem('isLogged'));
  }

  getUserType(): string {
    return localStorage.getItem('user') || sessionStorage.getItem('user');
  }

  isAdmin() {
    return JSON.parse(localStorage.getItem('isAdmin')) || JSON.parse(sessionStorage.getItem('isAdmin'));
  }

  deslogarOnlyOnApp() {
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isLogged');
  }

  async deslogar() {
    try {
      await this.http
        .post(AuthService.API_URL + '/logoff', {}, { withCredentials: true })
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
      const result = await this.http
        .get<any>(AuthService.API_URL + '/login', { headers: header, withCredentials: true})
        .toPromise();

      localStorage.setItem('user', result.userType);
      localStorage.setItem('isAdmin', result.isAdmin);
      localStorage.setItem('isLogged', String(isPersistent));
    } catch (error) {
      if (error.status === 401) {
        throw new Error('Não é possivel logar com essas informações');
      } else {
        AuthService.erroHandler(error);
      }
    }
  }
}
