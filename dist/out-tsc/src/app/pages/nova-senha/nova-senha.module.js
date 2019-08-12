import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NovaSenhaPage } from './nova-senha.page';
var routes = [
    {
        path: '',
        component: NovaSenhaPage
    }
];
var NovaSenhaPageModule = /** @class */ (function () {
    function NovaSenhaPageModule() {
    }
    NovaSenhaPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ReactiveFormsModule
            ],
            declarations: [NovaSenhaPage]
        })
    ], NovaSenhaPageModule);
    return NovaSenhaPageModule;
}());
export { NovaSenhaPageModule };
//# sourceMappingURL=nova-senha.module.js.map