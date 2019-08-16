import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ChamadaImagesPage } from './chamada-images.page';
import { IonicImageLoader } from 'ionic-image-loader';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { DirectivesModule } from '../../directives/directives.module';
import { ComponetsModule } from 'src/app/components/componets.module';
var routes = [
    {
        path: '',
        component: ChamadaImagesPage
    }
];
var ChamadaImagesPageModule = /** @class */ (function () {
    function ChamadaImagesPageModule() {
    }
    ChamadaImagesPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                IonicImageLoader,
                ComponetsModule,
                PinchZoomModule,
                DirectivesModule
            ],
            declarations: [ChamadaImagesPage]
        })
    ], ChamadaImagesPageModule);
    return ChamadaImagesPageModule;
}());
export { ChamadaImagesPageModule };
//# sourceMappingURL=chamada-images.module.js.map