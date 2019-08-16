import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ConfirmaPage } from './confirma.page';
import { CanDeactivateGuard } from 'src/app/can-deactivate.guard';
var routes = [
    {
        path: '',
        component: ConfirmaPage,
        canDeactivate: [CanDeactivateGuard]
    }
];
var ConfirmaPageModule = /** @class */ (function () {
    function ConfirmaPageModule() {
    }
    ConfirmaPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
            ],
            declarations: [ConfirmaPage]
        })
    ], ConfirmaPageModule);
    return ConfirmaPageModule;
}());
export { ConfirmaPageModule };
//# sourceMappingURL=confirma.module.js.map