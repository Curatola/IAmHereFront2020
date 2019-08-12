import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var NavParamsService = /** @class */ (function () {
    function NavParamsService() {
    }
    NavParamsService.prototype.setParams = function (params) {
        this.params = params;
    };
    NavParamsService.prototype.get = function (key) {
        return this.params[key];
    };
    NavParamsService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], NavParamsService);
    return NavParamsService;
}());
export { NavParamsService };
//# sourceMappingURL=nav-params.service.js.map