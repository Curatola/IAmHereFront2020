import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFotoComponent } from './add-foto/add-foto.component';
import { PopoverNavComponent } from './popover-nav/popover-nav.component';
import { IonicModule } from '@ionic/angular';
import { CameraService } from '../camera.service';
import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  declarations: [AddFotoComponent, PopoverNavComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  providers: [
    CameraService,
    Camera
  ],
  entryComponents: [PopoverNavComponent],
  exports: [AddFotoComponent, PopoverNavComponent]
})
export class ComponetsModule { }
