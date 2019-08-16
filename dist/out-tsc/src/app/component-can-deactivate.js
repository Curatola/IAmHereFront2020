import * as tslib_1 from "tslib";
import { HostListener } from '@angular/core';
var ComponentCanDeactivate = /** @class */ (function () {
    function ComponentCanDeactivate(alertCtrl, navCtrl) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.isToDoBack = true;
        this.ignore = false;
        this.isLoaded = false;
    }
    ComponentCanDeactivate.prototype.canDeactivate = function () {
        return this.isToDoBack || this.ignore;
    };
    ComponentCanDeactivate.prototype.confirm = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Deseja mesmo sair?',
                            message: 'As alterações feitas serão perdidas!',
                            buttons: [
                                {
                                    text: 'Sim',
                                    handler: function () {
                                        _this.isToDoBack = true;
                                        _this.navCtrl.pop();
                                    }
                                },
                                {
                                    text: 'Não',
                                    role: 'cancel'
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ComponentCanDeactivate.prototype.unloadHandler = function ($event) {
        if (!this.canDeactivate()) {
            $event.returnValue = true;
        }
    };
    tslib_1.__decorate([
        HostListener('window:beforeunload', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ComponentCanDeactivate.prototype, "unloadHandler", null);
    return ComponentCanDeactivate;
}());
export { ComponentCanDeactivate };
//# sourceMappingURL=component-can-deactivate.js.map