import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

/*
  Generated class for the CameraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root'
})

export class CameraService {

  constructor(private camera: Camera) {
  }

  async takePicture() {
    const options: CameraOptions = {
      quality: 100,
      saveToPhotoAlbum: false,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true
    };
    return await this.camera.getPicture(options);
  }

  async getFromGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG
    };

    return await this.camera.getPicture(options);
  }
}
