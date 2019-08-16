import * as tslib_1 from "tslib";
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidatorMessages } from '../../validator-messages';
import { NavController, LoadingController, ToastController, ActionSheetController, Platform } from '@ionic/angular';
import { NavParamsService } from '../../service/nav-params.service';
import { RequestService } from '../../service/request.service';
import { ConfirmSenhaValidator } from '../../confirm-senha-validator';
import { CameraService } from '../../service/camera.service';
var AlunoCadastroPage = /** @class */ (function () {
    function AlunoCadastroPage(navCtrl, navParams, request, loader, toast, actionSheetCtrl, camera, formBuilder, plat) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.request = request;
        this.loader = loader;
        this.toast = toast;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.formBuilder = formBuilder;
        this.plat = plat;
        this.msgs = ValidatorMessages.msgs;
        this.form = this.formBuilder.group({
            nome: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z\u00C0-\u024F ]+$')])),
            matricula: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')])),
            email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
            senha: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
            confirm: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
            termosUso: new FormControl(null, Validators.requiredTrue)
        }, { validator: ConfirmSenhaValidator.isMatching });
    }
    AlunoCadastroPage.prototype.cadastrar = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.plat.is('cordova')) return [3 /*break*/, 1];
                        this.fileInput.nativeElement.click();
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.actionSheetCtrl.create({
                            header: 'Selecione o modo',
                            buttons: [
                                {
                                    text: 'Camera',
                                    handler: function () {
                                        _this.camera.takePicture()
                                            .then(function (imageData) { return _this.upload(imageData); })
                                            .catch(function (error) { return console.log(error); });
                                    }
                                },
                                {
                                    text: 'Galeria',
                                    handler: function () {
                                        _this.camera.getFromGallery()
                                            .then(function (imageData) { return _this.upload(imageData); })
                                            .catch(function (error) { return console.log(error); });
                                    }
                                }
                            ]
                        })];
                    case 2:
                        actionSheet = _a.sent();
                        actionSheet.present();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AlunoCadastroPage.prototype.goTermosUso = function (event) {
        event.preventDefault();
        this.navCtrl.navigateForward('/termos');
    };
    AlunoCadastroPage.prototype.upload = function (imageData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loadingDialog, nome, matricula, email, senha, data, resp, t, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loader.create({ message: 'Cadastrando, aguarde...', spinner: 'crescent' })];
                    case 1:
                        loadingDialog = _a.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 2:
                        _a.sent();
                        nome = this.form.get('nome').value;
                        matricula = this.form.get('matricula').value;
                        email = this.form.get('email').value;
                        senha = this.form.get('senha').value;
                        data = { nome: nome, matricula: matricula, login: email, senha: senha };
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, 8, 10]);
                        return [4 /*yield*/, this.request.uploadFile('aluno', imageData, data, false)];
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
    AlunoCadastroPage.prototype.ngOnInit = function () {
    };
    tslib_1.__decorate([
        ViewChild('fileInput'),
        tslib_1.__metadata("design:type", ElementRef)
    ], AlunoCadastroPage.prototype, "fileInput", void 0);
    AlunoCadastroPage = tslib_1.__decorate([
        Component({
            selector: 'app-aluno-cadastro',
            templateUrl: './aluno-cadastro.page.html',
            styleUrls: ['./aluno-cadastro.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            NavParamsService,
            RequestService,
            LoadingController,
            ToastController,
            ActionSheetController,
            CameraService,
            FormBuilder,
            Platform])
    ], AlunoCadastroPage);
    return AlunoCadastroPage;
}());
export { AlunoCadastroPage };
//# sourceMappingURL=aluno-cadastro.page.js.map