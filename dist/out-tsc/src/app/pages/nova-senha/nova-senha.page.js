import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavParamsService } from '../../service/nav-params.service';
import { RequestService } from '../../service/request.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidatorMessages } from '../../validator-messages';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { ConfirmSenhaValidator } from '../../confirm-senha-validator';
var NovaSenhaPage = /** @class */ (function () {
    function NovaSenhaPage(navCtrl, navParams, toast, requestProvider, loader, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toast = toast;
        this.requestProvider = requestProvider;
        this.loader = loader;
        this.formBuilder = formBuilder;
        this.msgs = ValidatorMessages.msgs;
        this.token = navParams.get("token");
        this.resetform = this.formBuilder.group({
            senha: new FormControl("", Validators.compose([Validators.required, Validators.minLength(6)])),
            confirm: new FormControl("", Validators.compose([Validators.required, Validators.minLength(6)]))
        }, { "validator": ConfirmSenhaValidator.isMatching });
    }
    NovaSenhaPage.prototype.ngOnInit = function () {
    };
    NovaSenhaPage.prototype.novasenha = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loadingDialog, senha, resp, t, error_1, t;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loader.create({ message: 'Verificando nova senha...', spinner: 'crescent' })];
                    case 1:
                        loadingDialog = _a.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 7, , 10]);
                        senha = this.resetform.get("senha").value;
                        return [4 /*yield*/, this.requestProvider.put("reset_senha", { "novasenha": senha, "token": this.token }, false)];
                    case 4:
                        resp = _a.sent();
                        return [4 /*yield*/, loadingDialog.dismiss()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.toast.create({
                                message: resp.sucesso,
                                duration: 3000
                            })];
                    case 6:
                        t = _a.sent();
                        t.present();
                        this.navCtrl.navigateRoot("/login");
                        return [3 /*break*/, 10];
                    case 7:
                        error_1 = _a.sent();
                        return [4 /*yield*/, this.toast.create({
                                message: error_1.message,
                                duration: 3000
                            })];
                    case 8:
                        t = _a.sent();
                        t.present();
                        return [4 /*yield*/, loadingDialog.dismiss()];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    NovaSenhaPage = tslib_1.__decorate([
        Component({
            selector: 'app-nova-senha',
            templateUrl: './nova-senha.page.html',
            styleUrls: ['./nova-senha.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            NavParamsService,
            ToastController,
            RequestService,
            LoadingController,
            FormBuilder])
    ], NovaSenhaPage);
    return NovaSenhaPage;
}());
export { NovaSenhaPage };
//# sourceMappingURL=nova-senha.page.js.map