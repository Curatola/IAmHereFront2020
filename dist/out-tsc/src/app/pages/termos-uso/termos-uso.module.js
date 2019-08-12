import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TermosUsoPage } from './termos-uso.page';
var routes = [
    {
        path: '',
        component: TermosUsoPage
    }
];
var TermosUsoPageModule = /** @class */ (function () {
    function TermosUsoPageModule() {
    }
    TermosUsoPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TermosUsoPage]
        })
    ], TermosUsoPageModule);
    return TermosUsoPageModule;
}());
export { TermosUsoPageModule };
//# sourceMappingURL=termos-uso.module.js.map