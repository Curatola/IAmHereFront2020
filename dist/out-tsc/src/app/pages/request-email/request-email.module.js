import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RequestEmailPage } from './request-email.page';
var routes = [
    {
        path: '',
        component: RequestEmailPage
    }
];
var RequestEmailPageModule = /** @class */ (function () {
    function RequestEmailPageModule() {
    }
    RequestEmailPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ReactiveFormsModule
            ],
            declarations: [RequestEmailPage]
        })
    ], RequestEmailPageModule);
    return RequestEmailPageModule;
}());
export { RequestEmailPageModule };
//# sourceMappingURL=request-email.module.js.map