import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavParamsService } from '../../service/nav-params.service';
import { RequestService } from '../../service/request.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidatorMessages } from '../../validator-messages';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
var RequestEmailPage = /** @class */ (function () {
    function RequestEmailPage(navCtrl, navParams, toast, requestProvider, loader, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toast = toast;
        this.requestProvider = requestProvider;
        this.loader = loader;
        this.formBuilder = formBuilder;
        this.msgs = ValidatorMessages.msgs;
        this.requestNewPassword = this.navParams.get("requestNewPassword");
        this.formulario = this.formBuilder.group({
            email: new FormControl("", Validators.compose([Validators.email, Validators.required]))
        });
    }
    RequestEmailPage.prototype.ngOnInit = function () {
    };
    RequestEmailPage.prototype.requestEmail = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loadingDialog, email, rota, resp, t, t, error_1, t;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loader.create({ message: 'Verificando email...', spinner: 'crescent' })];
                    case 1:
                        loadingDialog = _a.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 10, , 13]);
                        email = this.formulario.get("email").value;
                        rota = this.requestNewPassword ? "reset_senha" : "confirm_email";
                        return [4 /*yield*/, this.requestProvider.post(rota, { "email": email }, false)];
                    case 4:
                        resp = _a.sent();
                        return [4 /*yield*/, loadingDialog.dismiss()];
                    case 5:
                        _a.sent();
                        if (!resp.sucesso) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.toast.create({
                                message: resp.sucesso,
                                duration: 3000
                            })];
                    case 6:
                        t = _a.sent();
                        t.present();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.toast.create({
                            message: resp.warning,
                            duration: 3000
                        })];
                    case 8:
                        t = _a.sent();
                        t.present();
                        _a.label = 9;
                    case 9: return [3 /*break*/, 13];
                    case 10:
                        error_1 = _a.sent();
                        return [4 /*yield*/, this.toast.create({
                                message: error_1.message,
                                duration: 3000
                            })];
                    case 11:
                        t = _a.sent();
                        t.present();
                        return [4 /*yield*/, loadingDialog.dismiss()];
                    case 12:
                        _a.sent();
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    RequestEmailPage = tslib_1.__decorate([
        Component({
            selector: 'app-request-email',
            templateUrl: './request-email.page.html',
            styleUrls: ['./request-email.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController, NavParamsService,
            ToastController, RequestService,
            LoadingController,
            FormBuilder])
    ], RequestEmailPage);
    return RequestEmailPage;
}());
export { RequestEmailPage };
//# sourceMappingURL=request-email.page.js.map