import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ToastController, NavController } from '@ionic/angular';
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from '@ionic-native/file-transfer/ngx';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(
    public http: HttpClient,
    public auth: AuthService,
    private transfer: FileTransfer
  ) {}
  async get(rota: string, withAuthorization = true) {

    try {
      const result = await this.http
        .get<any>(AuthService.API_URL + rota, { withCredentials: withAuthorization })
        .toPromise();
      return result;
    } catch (error) {
      AuthService.erroHandler(error);
    }
  }

  async post(rota: string, data: any, withAuthorization = true) {
    try {
      const result = await this.http
        .post<any>(AuthService.API_URL + rota, data, { withCredentials: withAuthorization })
        .toPromise();
      return result;
    } catch (error) {
      AuthService.erroHandler(error);
    }
  }

  async put(rota: string, data: any, withAuthorization = true) {
    try {
      const result = await this.http
        .put<any>(AuthService.API_URL + rota, data, { withCredentials: withAuthorization })
        .toPromise();
      return result;
    } catch (error) {
      AuthService.erroHandler(error);
    }
  }

  async delete(rota: string) {
    try {
      const result = await this.http
        .delete<any>(AuthService.API_URL + rota, {withCredentials: true})
        .toPromise();
      return result;
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

  async requestErrorPageHandler(error: any, toast: ToastController, navCtrl: NavController) {
    if (error.message === '401') {
      await this.auth.deslogarOnlyOnApp();

      await navCtrl.navigateRoot('/login');

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
