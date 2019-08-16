import { Directive, Input, ElementRef, EventEmitter, Output } from '@angular/core';
import { Platform, ActionSheetController } from '@ionic/angular';
import { CameraService } from '../service/camera.service';

@Directive({
  selector: '[appImgGetter]',
  host: {
    '(click)': 'getImg()'
  }
})
export class ImgGetterDirective {
  @Input() fileInput: ElementRef;
  @Output() callback = new EventEmitter();


  constructor(
    private plat: Platform,
    private camera: CameraService,
    private actionSheetCtrl: ActionSheetController
  ) { }

  async getImg() {
    if (!this.plat.is('cordova')) {
      this.fileInput.nativeElement.click();
    } else {
      const actionSheet = await this.actionSheetCtrl.create({
        header: 'Selecione o modo',
        buttons: [
          {
            text: 'Camera',
            handler: () => {
              this.camera.takePicture()
                .then((imageData) => this.callback.emit(imageData))
                .catch((error) => console.log(error));
            }
          },
          {
            text: 'Galeria',
            handler: () => {
              this.camera.getFromGallery()
                .then((imageData) => this.callback.emit(imageData))
                .catch((error) => console.log(error));
            }
          }
        ]
      });

      actionSheet.present();
    }
  }
}
