import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CameraService } from 'src/app/service/camera.service';
import { AlertController } from '@ionic/angular';
import { Chamada } from 'src/models/chamada';



@Component({
  selector: 'app-add-foto',
  templateUrl: './add-foto.component.html',
  styleUrls: ['./add-foto.component.scss'],
})
export class AddFotoComponent {
  @Output() uploadFunction = new EventEmitter();
  @Input() chamadas: Array<Chamada>;
  text: string;
  pathsFotos: Array<string>;
  max = 10;

  constructor(
    public camera: CameraService,
    public alertCtrl: AlertController,
  ) {
    this.pathsFotos = new Array();
  }

  private hasOtherChamadasToday(): boolean {
    const currentDate = new Date().setHours(0, 0, 0, 0);
    return this.chamadas.some((c: Chamada) => {
      const dateC = new Date(c.dateHour).setHours(0, 0, 0, 0);
      return dateC === currentDate;
    });
  }

  private getChamadaOfToday() {
    const currentDate = new Date().setHours(0, 0, 0, 0);

    return this.chamadas.find((c: Chamada) => {
      const dateC = new Date(c.dateHour).setHours(0, 0, 0, 0);
      return dateC === currentDate;
    });
  }

  private async showAlertSubstituirChamada(): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const alert = await this.alertCtrl.create({
        header: 'Já existem chamadas hoje!',
        message: 'Fazer outra chamada irá substituir a anterior! Deseja continuar?',
        buttons: [
          {
            text: 'Não',
            handler: () => resolve(false)
          },
          {
            text: 'Sim',
            handler: () => resolve(true)
          }
        ]
      });
      alert.present();
    });
  }

  async takePicture() {
    if (this.hasOtherChamadasToday() && !await this.showAlertSubstituirChamada()) {
      return;
    }

    const chamadaApagar = this.getChamadaOfToday();

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
                this.uploadFunction.emit({pathFotos: this.pathsFotos, chamadaApagar});
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
        this.uploadFunction.emit({pathFotos: this.pathsFotos, chamadaApagar});
        this.pathsFotos = new Array();
      }

    } catch (error) {
      console.log(error);
    }

  }

  async getFromGallery() {
    if (this.hasOtherChamadasToday() && !await this.showAlertSubstituirChamada()) {
      return;
    }

    const chamadaApagar = this.getChamadaOfToday();
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
                this.uploadFunction.emit({pathFotos: this.pathsFotos, chamadaApagar});
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
        this.uploadFunction.emit({pathFotos: this.pathsFotos, chamadaApagar});
        this.pathsFotos = new Array();
      }

    } catch (error) {
      console.log(error);
    }
  }
}
