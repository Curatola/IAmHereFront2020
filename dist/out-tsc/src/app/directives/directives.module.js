import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderOnclickDirective } from './header-onclick.directive';
var DirectivesModule = /** @class */ (function () {
    function DirectivesModule() {
    }
    DirectivesModule = tslib_1.__decorate([
        NgModule({
            declarations: [HeaderOnclickDirective],
            imports: [
                CommonModule
            ],
            exports: [HeaderOnclickDirective]
        })
    ], DirectivesModule);
    return DirectivesModule;
}());
export { DirectivesModule };
//# sourceMappingURL=directives.module.js.map