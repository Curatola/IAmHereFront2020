import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { NavParamsService } from '../../service/nav-params.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidatorMessages } from '../../validator-messages';
import { ConfirmSenhaValidator } from '../../confirm-senha-validator';
import { RequestService } from '../../service/request.service';
var ProfCadastroPage = /** @class */ (function () {
    function ProfCadastroPage(navCtrl, navParams, request, loader, toast, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.request = request;
        this.loader = loader;
        this.toast = toast;
        this.formBuilder = formBuilder;
        this.msgs = ValidatorMessages.msgs;
    }
    ProfCadastroPage.prototype.ngOnInit = function () {
        this.form = this.formBuilder.group({
            nome: new FormControl("", Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern("^[a-zA-Z\u00C0-\u024F ]+$")])),
            email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
            senha: new FormControl("", Validators.compose([Validators.required, Validators.minLength(6)])),
            confirm: new FormControl("", Validators.compose([Validators.required, Validators.minLength(6)]))
        }, { "validator": ConfirmSenhaValidator.isMatching });
    };
    ProfCadastroPage.prototype.cadastrar = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loadingDialog, nome, email, senha, data, resp, t, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loader.create({ message: 'Cadastrando, aguarde...', spinner: 'crescent' })];
                    case 1:
                        loadingDialog = _a.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 2:
                        _a.sent();
                        nome = this.form.get("nome").value;
                        email = this.form.get("email").value;
                        senha = this.form.get("senha").value;
                        data = { "nome": nome, "login": email, "senha": senha };
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, 8, 10]);
                        return [4 /*yield*/, this.request.post("professor", data, false)];
                    case 4:
                        resp = _a.sent();
                        return [4 /*yield*/, this.toast.create({
                                message: resp.sucesso,
                                duration: 3000
                            })];
                    case 5:
                        t = _a.sent();
                        t.present();
                        this.navCtrl.pop();
                        return [3 /*break*/, 10];
                    case 6:
                        error_1 = _a.sent();
                        return [4 /*yield*/, this.request.requestErrorPageHandler(error_1, this.toast, this.navCtrl)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, loadingDialog.dismiss()];
                    case 9:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    ProfCadastroPage = tslib_1.__decorate([
        Component({
            selector: 'app-prof-cadastro',
            templateUrl: './prof-cadastro.page.html',
            styleUrls: ['./prof-cadastro.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            NavParamsService,
            RequestService,
            LoadingController,
            ToastController,
            FormBuilder])
    ], ProfCadastroPage);
    return ProfCadastroPage;
}());
export { ProfCadastroPage };
//# sourceMappingURL=prof-cadastro.page.js.map