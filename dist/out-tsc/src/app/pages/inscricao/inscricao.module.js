import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { InscricaoPage } from './inscricao.page';
var routes = [
    {
        path: '',
        component: InscricaoPage
    }
];
var InscricaoPageModule = /** @class */ (function () {
    function InscricaoPageModule() {
    }
    InscricaoPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ReactiveFormsModule
            ],
            declarations: [InscricaoPage]
        })
    ], InscricaoPageModule);
    return InscricaoPageModule;
}());
export { InscricaoPageModule };
//# sourceMappingURL=inscricao.module.js.map