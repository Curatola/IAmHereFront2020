import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CriarTurmaPage } from './criar-turma.page';
var routes = [
    {
        path: '',
        component: CriarTurmaPage
    }
];
var CriarTurmaPageModule = /** @class */ (function () {
    function CriarTurmaPageModule() {
    }
    CriarTurmaPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ReactiveFormsModule,
            ],
            declarations: [CriarTurmaPage]
        })
    ], CriarTurmaPageModule);
    return CriarTurmaPageModule;
}());
export { CriarTurmaPageModule };
//# sourceMappingURL=criar-turma.module.js.map