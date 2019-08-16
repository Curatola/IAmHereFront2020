import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFotoComponent } from './add-foto/add-foto.component';
import { PopoverNavComponent } from './popover-nav/popover-nav.component';
import { IonicModule } from '@ionic/angular';
import { CameraService } from '../service/camera.service';
import { Camera } from '@ionic-native/camera/ngx';
import { SecureImgComponent } from './secure-img/secure-img.component';
var ComponetsModule = /** @class */ (function () {
    function ComponetsModule() {
    }
    ComponetsModule = tslib_1.__decorate([
        NgModule({
            declarations: [AddFotoComponent, PopoverNavComponent, SecureImgComponent],
            imports: [
                CommonModule,
                IonicModule
            ],
            providers: [
                CameraService,
                Camera
            ],
            entryComponents: [PopoverNavComponent],
            exports: [AddFotoComponent, PopoverNavComponent, SecureImgComponent]
        })
    ], ComponetsModule);
    return ComponetsModule;
}());
export { ComponetsModule };
//# sourceMappingURL=componets.module.js.map