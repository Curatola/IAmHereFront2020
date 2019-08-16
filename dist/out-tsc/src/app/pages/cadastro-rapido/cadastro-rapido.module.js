import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CadastroRapidoPage } from './cadastro-rapido.page';
import { CanDeactivateGuard } from 'src/app/can-deactivate.guard';
var routes = [
    {
        path: '',
        component: CadastroRapidoPage,
        canDeactivate: [CanDeactivateGuard]
    }
];
var CadastroRapidoPageModule = /** @class */ (function () {
    function CadastroRapidoPageModule() {
    }
    CadastroRapidoPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                ReactiveFormsModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CadastroRapidoPage]
        })
    ], CadastroRapidoPageModule);
    return CadastroRapidoPageModule;
}());
export { CadastroRapidoPageModule };
//# sourceMappingURL=cadastro-rapido.module.js.map