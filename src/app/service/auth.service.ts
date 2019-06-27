import { Injectable } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static API_URL = 'http://172.17.105.233:5000/';
  public static readonly PROFESSOR = 'Professor';
  public static readonly ALUNO = 'Aluno';

  constructor(public http: Http) {}

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
    let header = new Headers();

    let token: string = this.getToken();
    if (!token) return false;

    header.append('Authorization', 'Bearer ' + token);
    try {
      await this.http
        .post(AuthService.API_URL + 'logoff', {}, { headers: header })
        .toPromise();
      this.deslogarOnlyOnApp();
    } catch (error) {
      AuthService.erroHandler(error);
    }
  }

  async login(email: string, password: string, isPersistent: boolean) {
    let header = new Headers();
    header.append('Authorization', 'Basic ' + btoa(email + ':' + password));
    try {
      let result = await this.http
        .get(AuthService.API_URL + 'login', { headers: header })
        .toPromise();

      let json = result.json();
      if (isPersistent) {
        localStorage.setItem('token', json.token);
        localStorage.setItem('user', json.userType);
      } else {
        sessionStorage.setItem('token', json.token);
        sessionStorage.setItem('user', json.userType);
      }
    } catch (error) {
      if (error.status === 401) {
        throw new Error('Não é possivel logar com essas informações');
      } else {
        AuthService.erroHandler(error);
      }
    }
  }

  public static erroHandler(error: Response) {
    console.log(error);

    if (error.status === 400) throw new Error(JSON.parse(error.text()).error);
    else if (error.status === 401) throw new Error('401');
    else if (error.status === 0)
      throw new Error('Não foi possivel se conectar ao servidor!');
    else throw new Error('Erro desconhecido');
  }
}
