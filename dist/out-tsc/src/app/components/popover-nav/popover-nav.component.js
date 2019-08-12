import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, PopoverController, AlertController } from '@ionic/angular';
import { NavParamsService } from 'src/app/service/nav-params.service';
import { AuthService } from 'src/app/service/auth.service';
import { RequestService } from 'src/app/service/request.service';
var PopoverNavComponent = /** @class */ (function () {
    function PopoverNavComponent(navCtrl, navParams, auth, popoverController, loader, toast, requests, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.popoverController = popoverController;
        this.loader = loader;
        this.toast = toast;
        this.requests = requests;
        this.alertCtrl = alertCtrl;
        this.isLogoff = navParams.get("is_logoff");
        this.isGoPerfil = navParams.get("isGoPerfil");
        //this.turma = navParams.get("turma");
        //this.chamada = navParams.get("chamada");
    }
    PopoverNavComponent.prototype.ngOnInit = function () { };
    PopoverNavComponent.prototype.logoff = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Confirme!',
                            message: 'Deseja mesmo fazer logoff?',
                            buttons: [
                                {
                                    text: 'Não',
                                    role: 'cancel',
                                },
                                {
                                    text: 'Sim',
                                    handler: function () {
                                        _this.commitLogoff();
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        alert.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    PopoverNavComponent.prototype.download = function () {
    };
    PopoverNavComponent.prototype.commitLogoff = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loadingDialog, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loader.create({ message: 'Fazendo logoff...', spinner: 'crescent' })];
                    case 1:
                        loadingDialog = _a.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 7, 10, 12]);
                        return [4 /*yield*/, this.auth.deslogar()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.popoverController.dismiss()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.navCtrl.navigateRoot('/login')];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 7:
                        error_1 = _a.sent();
                        return [4 /*yield*/, this.popoverController.dismiss()];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.requests.requestErrorPageHandler(error_1, this.toast, this.navCtrl)];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 10: return [4 /*yield*/, loadingDialog.dismiss()];
                    case 11:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    PopoverNavComponent.prototype.goPerfil = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.popoverController.dismiss();
                this.navCtrl.navigateForward('/perfil-usuario');
                return [2 /*return*/];
            });
        });
    };
    PopoverNavComponent = tslib_1.__decorate([
        Component({
            selector: 'app-popover-nav',
            templateUrl: './popover-nav.component.html',
            styleUrls: ['./popover-nav.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            NavParamsService,
            AuthService,
            PopoverController,
            LoadingController,
            ToastController,
            RequestService,
            AlertController])
    ], PopoverNavComponent);
    return PopoverNavComponent;
}());
export { PopoverNavComponent };
//# sourceMappingURL=popover-nav.component.js.map