import { CameraService } from './../camera.service';
import { Component, Input } from '@angular/core';



@Component({
  selector: 'app-add-foto',
  templateUrl: './add-foto.component.html',
  styleUrls: ['./add-foto.component.scss'],
})
export class AddFotoComponent {
  @Input() uploadFunction: Function;
  text: string;

  constructor(public camera: CameraService) {
  }

  async takePicture() {
    try {
      let imageData = await this.camera.takePicture();
      await this.uploadFunction(imageData);
    } catch (error) {
      console.log(error);
    }
  }

  async getFromGallery() {
    try {
      let imageData = await this.camera.getFromGallery();
      await this.uploadFunction(imageData);
    } catch (error) {
      console.log(error);
    }
  }

}
