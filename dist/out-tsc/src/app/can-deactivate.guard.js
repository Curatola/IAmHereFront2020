import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var CanDeactivateGuard = /** @class */ (function () {
    function CanDeactivateGuard() {
    }
    CanDeactivateGuard.prototype.canDeactivate = function (component) {
        if (!component.canDeactivate()) {
            component.confirm();
        }
        else {
            return true;
        }
    };
    CanDeactivateGuard = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        })
    ], CanDeactivateGuard);
    return CanDeactivateGuard;
}());
export { CanDeactivateGuard };
//# sourceMappingURL=can-deactivate.guard.js.map