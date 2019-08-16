import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditarTurmaPage } from './editar-turma.page';
var routes = [
    {
        path: '',
        component: EditarTurmaPage
    }
];
var EditarTurmaPageModule = /** @class */ (function () {
    function EditarTurmaPageModule() {
    }
    EditarTurmaPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ReactiveFormsModule
            ],
            declarations: [EditarTurmaPage]
        })
    ], EditarTurmaPageModule);
    return EditarTurmaPageModule;
}());
export { EditarTurmaPageModule };
//# sourceMappingURL=editar-turma.module.js.map