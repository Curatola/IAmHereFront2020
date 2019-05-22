import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers } from '@angular/http';
import { ToastController, NavController } from '@ionic/angular';
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from '@ionic-native/file-transfer/ngx';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(
    public http: Http,
    public auth: AuthService,
    private transfer: FileTransfer
  ) {}
  async get(rota: string, withAuthorization = true) {
    const header = new Headers();

    if (withAuthorization) {
      const token: string = this.auth.getToken();
      if (!token) {
        return false;
      }

      header.append('Authorization', 'Bearer ' + token);
    }

    try {
      const result = await this.http
        .get(AuthService.API_URL + rota, { headers: header })
        .toPromise();
      return result.json();
    } catch (error) {
      AuthService.erroHandler(error);
    }
  }

  async post(rota: string, data: any, withAuthorization = true) {
    const header = new Headers();

    if (withAuthorization) {
      const token: string = this.auth.getToken();
      if (!token) {
        return false;
      }

      header.append('Authorization', 'Bearer ' + token);
    }

    try {
      const result = await this.http
        .post(AuthService.API_URL + rota, data, { headers: header })
        .toPromise();
      return result.json();
    } catch (error) {
      AuthService.erroHandler(error);
    }
  }

  async put(rota: string, data: any, withAuthorization = true) {
    const header = new Headers();

    if (withAuthorization) {
      const token: string = this.auth.getToken();
      if (!token) {
        return false;
      }

      header.append('Authorization', 'Bearer ' + token);
    }

    try {
      const result = await this.http
        .put(AuthService.API_URL + rota, data, { headers: header })
        .toPromise();
      return result.json();
    } catch (error) {
      AuthService.erroHandler(error);
    }
  }

  async delete(rota: string) {
    const header = new Headers();

    const token: string = this.auth.getToken();
    if (!token) {
      return false;
    }

    header.append('Authorization', 'Bearer ' + token);

    try {
      const result = await this.http
        .delete(AuthService.API_URL + rota, { headers: header })
        .toPromise();
      return result.json();
    } catch (error) {
      AuthService.erroHandler(error);
    }
  }

  async uploadFile(
    filePath: string,
    rota: string,
    data: { [s: string]: any } = null,
    httpMethod: string = 'POST'
  ) {
    const fileTransfer: FileTransferObject = this.transfer.create();

    const token: string = this.auth.getToken();

    const options: FileUploadOptions = {
      fileKey: 'imagefile',
      fileName: 'foto.jpg',
      chunkedMode: false,
      mimeType: 'image/jpeg',
      params: data,
      headers: { Authorization: 'Bearer ' + token },
      httpMethod
    };

    try {
      const resp = await fileTransfer.upload(
        filePath,
        AuthService.API_URL + rota,
        options
      );
      return JSON.parse(resp.response);
    } catch (error) {
      console.log(error);
      if (error.code === 3) {
        throw new Error('Não foi possivel se conectar ao servidor!');
      }
      const json = JSON.parse(error.body);
      throw new Error(json.error);
    }
  }

  async requestErrorPageHandler(
    error: any,
    toast: ToastController,
    navCtrl: NavController,
    loginPage
  ) {
    if (error.message === '401') {
      await this.auth.deslogarOnlyOnApp();

      await navCtrl.setRoot(loginPage, {}, { animate: true });
      await navCtrl.popToRoot();

      const t = await toast.create({
        message: 'Você foi deslogado. Faça login novamente!',
        duration: 3000
      });

      t.present();
    } else {
      const t = await toast.create({
        message: error.message,
        duration: 3000
      });

      t.present();
    }
  }
}
