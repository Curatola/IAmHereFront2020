import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AlunoCadastroPage } from './aluno-cadastro.page';
var routes = [
    {
        path: '',
        component: AlunoCadastroPage
    }
];
var AlunoCadastroPageModule = /** @class */ (function () {
    function AlunoCadastroPageModule() {
    }
    AlunoCadastroPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ReactiveFormsModule
            ],
            declarations: [AlunoCadastroPage]
        })
    ], AlunoCadastroPageModule);
    return AlunoCadastroPageModule;
}());
export { AlunoCadastroPageModule };
//# sourceMappingURL=aluno-cadastro.module.js.map