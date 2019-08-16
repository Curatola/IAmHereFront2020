import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ValidatorMessages } from '../../validator-messages';
import { AuthService } from '../../service/auth.service';
import { RequestService } from '../../service/request.service';
import { NavParamsService } from '../../service/nav-params.service';
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, toast, authService, requests, loader, alertCtrl, formBuilder, navParams) {
        this.navCtrl = navCtrl;
        this.toast = toast;
        this.authService = authService;
        this.requests = requests;
        this.loader = loader;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.navParams = navParams;
        this.msgs = ValidatorMessages.msgs;
        this.form = this.formBuilder.group({
            email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
            senha: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
            remember: new FormControl(false)
        });
    }
    LoginPage.prototype.login = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loadingDialog, email, senha, remember, resp, confirm_1, error_1, t;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loader.create({ message: 'Aguarde autenticação...', spinner: 'crescent' })];
                    case 1:
                        loadingDialog = _a.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 11, 13, 15]);
                        email = this.form.get('email').value;
                        senha = this.form.get('senha').value;
                        remember = this.form.get('remember').value;
                        return [4 /*yield*/, this.authService.login(email, senha, remember)];
                    case 4:
                        _a.sent();
                        if (!(this.authService.getUserType() === 'Aluno')) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.requests.get('usuario/term_accepted')];
                    case 5:
                        resp = _a.sent();
                        if (!!resp.termAccepted) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Termos de uso',
                                message: 'Ao prosseguir você está concordando com os termos de uso',
                                buttons: [
                                    {
                                        text: 'Concordo',
                                        role: 'concordo',
                                        handler: function () {
                                            _this.acceptTerm();
                                        }
                                    },
                                    {
                                        text: 'Termos de Uso',
                                        role: 'Termo',
                                        handler: function () {
                                            _this.navCtrl.navigateForward('/termos');
                                        }
                                    }
                                ]
                            })];
                    case 6:
                        confirm_1 = _a.sent();
                        confirm_1.present();
                        confirm_1.onDidDismiss().then(function (role) {
                            if (role !== 'concordo') {
                                _this.authService.deslogar();
                            }
                        });
                        return [3 /*break*/, 8];
                    case 7:
                        this.goTurmasPage();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        this.goTurmasPage();
                        _a.label = 10;
                    case 10: return [3 /*break*/, 15];
                    case 11:
                        error_1 = _a.sent();
                        return [4 /*yield*/, this.toast.create({
                                message: error_1.message,
                                duration: 3000
                            })];
                    case 12:
                        t = _a.sent();
                        t.present();
                        return [3 /*break*/, 15];
                    case 13: return [4 /*yield*/, loadingDialog.dismiss()];
                    case 14:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.goTurmasPage = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var t;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toast.create({
                            message: 'Logado como ' + this.authService.getUserType(),
                            duration: 3000
                        })];
                    case 1:
                        t = _a.sent();
                        t.present();
                        this.navCtrl.navigateRoot('/turmas');
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.acceptTerm = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.requests.post('usuario/term_accepted', {})];
                    case 1:
                        _a.sent();
                        this.navCtrl.navigateRoot('/turmas');
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.goPageNewConfirm = function (event) {
        event.preventDefault();
        this.navParams.setParams({ requestNewPassword: false });
        this.navCtrl.navigateForward('/request-email');
    };
    LoginPage.prototype.goPageEsqueciSenha = function (event) {
        event.preventDefault();
        this.navParams.setParams({ requestNewPassword: true });
        this.navCtrl.navigateForward('/request-email');
    };
    LoginPage.prototype.goPageProfCadastro = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                event.preventDefault();
                this.navCtrl.navigateForward('/prof-cadastro');
                return [2 /*return*/];
            });
        });
    };
    LoginPage.prototype.goPageAlunoCadastro = function (event) {
        event.preventDefault();
        this.navCtrl.navigateForward('/aluno-cadastro');
    };
    LoginPage.prototype.ngOnInit = function () {
    };
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController, ToastController,
            AuthService, RequestService,
            LoadingController, AlertController,
            FormBuilder, NavParamsService])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map