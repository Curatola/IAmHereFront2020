import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TurmasPage } from './turmas.page';
import { ComponetsModule } from '../../components/componets.module';
var routes = [
    {
        path: '',
        component: TurmasPage
    }
];
var TurmasPageModule = /** @class */ (function () {
    function TurmasPageModule() {
    }
    TurmasPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ComponetsModule
            ],
            declarations: [TurmasPage]
        })
    ], TurmasPageModule);
    return TurmasPageModule;
}());
export { TurmasPageModule };
//# sourceMappingURL=turmas.module.js.map