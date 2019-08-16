import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ToastController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { File, FileEntry } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(
    public http: HttpClient,
    public auth: AuthService,
    public file: File
  ) {}
  async get(rota: string, withAuthorization = true) {

    try {
      const result = await this.http
        .get<any>(AuthService.API_URL + rota, { withCredentials: true })
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
    rota: string,
    file: string | any,
    data: { [s: string]: any },
    withAuthorization = true,
    httpMethod: string = 'POST'
  ) {
    try {
      const formData = new FormData();

      for (const key in data) {
        if (data[key] !== undefined) {
          if (typeof data[key] !== 'string') {
            formData.append(key.toString(), JSON.stringify(data[key]));
          } else {
            formData.append(key.toString(), data[key]);
          }
        }
      }

      if (typeof file === 'string') {
        const imgBlob: any = await this.readFile(file);
        formData.set('imagefile', imgBlob);
      } else {
        formData.set('imagefile', file);
      }

      if (httpMethod === 'POST') {
        return await this.commitUploadPost(rota, formData, withAuthorization);
      } else if (httpMethod === 'PUT') {
        return await this.commitUploadPut(rota, formData, withAuthorization);
      }
    } catch (error) {
      AuthService.erroHandler(error);
    }
  }

  private async readFile(filePath: string) {
    const entry = await this.file.resolveLocalFilesystemUrl(filePath);
    return new Promise((resolve, reject) => {
      (entry as unknown as FileEntry).file(file => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);

        fileReader.onloadend = () => {
          const imgBlob = new Blob([fileReader.result], {
              type: file.type
          });

          resolve(imgBlob);
        };
      });
    });
  }

  private async commitUploadPost(
    rota: string,
    data: FormData,
    withAuthorization = true,
  ) {

    const result = await this.http
        .post<any>(AuthService.API_URL + rota, data, {withCredentials: withAuthorization})
        .toPromise();

    return result;
  }

  private async commitUploadPut(
    rota: string,
    data: FormData,
    withAuthorization = true,
  ) {

    const result = await this.http
        .put<any>(AuthService.API_URL + rota, data, {withCredentials: withAuthorization})
        .toPromise();

    return result;
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
