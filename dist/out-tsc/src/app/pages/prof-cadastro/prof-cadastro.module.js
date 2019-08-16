import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProfCadastroPage } from './prof-cadastro.page';
var routes = [
    {
        path: '',
        component: ProfCadastroPage
    }
];
var ProfCadastroPageModule = /** @class */ (function () {
    function ProfCadastroPageModule() {
    }
    ProfCadastroPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ProfCadastroPage]
        })
    ], ProfCadastroPageModule);
    return ProfCadastroPageModule;
}());
export { ProfCadastroPageModule };
//# sourceMappingURL=prof-cadastro.module.js.map