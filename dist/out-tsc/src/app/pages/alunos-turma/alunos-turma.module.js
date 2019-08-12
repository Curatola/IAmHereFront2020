import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AlunosTurmaPage } from './alunos-turma.page';
import { IonicImageLoader } from 'ionic-image-loader';
import { ComponetsModule } from 'src/app/components/componets.module';
var routes = [
    {
        path: '',
        component: AlunosTurmaPage
    }
];
var AlunosTurmaPageModule = /** @class */ (function () {
    function AlunosTurmaPageModule() {
    }
    AlunosTurmaPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                IonicImageLoader,
                ComponetsModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AlunosTurmaPage]
        })
    ], AlunosTurmaPageModule);
    return AlunosTurmaPageModule;
}());
export { AlunosTurmaPageModule };
//# sourceMappingURL=alunos-turma.module.js.map