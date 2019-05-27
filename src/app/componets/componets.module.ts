import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFotoComponent } from './add-foto/add-foto.component';
import { IonicModule } from '@ionic/angular';
import { CameraService } from '../camera.service';
import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  declarations: [AddFotoComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  providers: [
    CameraService,
    Camera
  ],
  exports: [AddFotoComponent]
})
export class ComponetsModule { }
