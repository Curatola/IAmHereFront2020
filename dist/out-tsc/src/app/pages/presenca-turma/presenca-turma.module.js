import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PresencaTurmaPage } from './presenca-turma.page';
var routes = [
    {
        path: '',
        component: PresencaTurmaPage
    }
];
var PresencaTurmaPageModule = /** @class */ (function () {
    function PresencaTurmaPageModule() {
    }
    PresencaTurmaPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [PresencaTurmaPage]
        })
    ], PresencaTurmaPageModule);
    return PresencaTurmaPageModule;
}());
export { PresencaTurmaPageModule };
//# sourceMappingURL=presenca-turma.module.js.map