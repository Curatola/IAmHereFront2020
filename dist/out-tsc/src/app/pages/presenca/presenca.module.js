import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PresencaPage } from './presenca.page';
import { CanDeactivateGuard } from 'src/app/can-deactivate.guard';
var routes = [
    {
        path: '',
        component: PresencaPage,
        canDeactivate: [CanDeactivateGuard]
    }
];
var PresencaPageModule = /** @class */ (function () {
    function PresencaPageModule() {
    }
    PresencaPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [PresencaPage]
        })
    ], PresencaPageModule);
    return PresencaPageModule;
}());
export { PresencaPageModule };
//# sourceMappingURL=presenca.module.js.map