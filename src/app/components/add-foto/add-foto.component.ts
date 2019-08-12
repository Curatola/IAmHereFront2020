import { Component, Input } from '@angular/core';
import { CameraService } from 'src/app/service/camera.service';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-add-foto',
  templateUrl: './add-foto.component.html',
  styleUrls: ['./add-foto.component.scss'],
})
export class AddFotoComponent {
  @Input() uploadFunction: Function;
  text: string;
  pathsFotos: Array<string>;
  max = 10;

  constructor(
    public camera: CameraService,
    public alertCtrl: AlertController,
    ) {
    this.pathsFotos = new Array();
  }

  async takePicture() {
    try {
      const imageData = await this.camera.takePicture();
      this.pathsFotos.push(imageData);

      let msg = 'Essa será a ' + (this.pathsFotos.length + 1) + 'ª foto de no máximo ' + this.max;
      if (this.pathsFotos.length === this.max - 1) {
        msg = 'Essa será a última foto desse conjunto!';
      }

      if (this.pathsFotos.length < this.max) {
        const alert = await this.alertCtrl.create({
          header: 'Deseja tirar mais fotos?',
          message: msg,
          buttons: [
            {
              text: 'Não',
              handler: async () => {
                await this.uploadFunction(this.pathsFotos);
                this.pathsFotos = new Array();
              }
            },
            {
              text: 'Sim',
              handler: () => {
                this.takePicture();
              }
            }
          ]
        });
        alert.present();
      } else {
        await this.uploadFunction(this.pathsFotos);
        this.pathsFotos = new Array();
      }

    } catch (error) {
      console.log(error);
    }
  }

  async getFromGallery() {
    try {
      const imageData = await this.camera.getFromGallery();
      this.pathsFotos.push(imageData);

      let msg = 'Essa será a ' + (this.pathsFotos.length + 1) + 'ª foto de no máximo ' + this.max;
      if (this.pathsFotos.length === this.max - 1) {
        msg = 'Essa será a última foto desse conjunto!';
      }

      if (this.pathsFotos.length < this.max) {
        const alert = await this.alertCtrl.create({
          header: 'Deseja selecionar mais fotos?',
          message: msg,
          buttons: [
            {
              text: 'Não',
              handler: async () => {
                await this.uploadFunction(this.pathsFotos);
                this.pathsFotos = new Array();
              }
            },
            {
              text: 'Sim',
              handler: () => {
                this.getFromGallery();
              }
            }
          ]
        });
        alert.present();
      } else {
        await this.uploadFunction(this.pathsFotos);
        this.pathsFotos = new Array();
      }

    } catch (error) {
      console.log(error);
    }
  }



}
