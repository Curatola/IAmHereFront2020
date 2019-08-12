import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ChamadasPage } from './chamadas.page';
import { ComponetsModule } from '../../components/componets.module';
var routes = [
    {
        path: '',
        component: ChamadasPage
    }
];
var ChamadasPageModule = /** @class */ (function () {
    function ChamadasPageModule() {
    }
    ChamadasPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ComponetsModule
            ],
            declarations: [ChamadasPage]
        })
    ], ChamadasPageModule);
    return ChamadasPageModule;
}());
export { ChamadasPageModule };
//# sourceMappingURL=chamadas.module.js.map