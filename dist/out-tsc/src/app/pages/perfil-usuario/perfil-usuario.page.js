import * as tslib_1 from "tslib";
import { Component, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { IonSlides, IonContent, IonInput, NavController, LoadingController, ToastController, ActionSheetController, Platform } from '@ionic/angular';
import { NavParamsService } from '../../service/nav-params.service';
import { RequestService } from '../../service/request.service';
import { AuthService } from '../../service/auth.service';
import { CameraService } from '../../service/camera.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmSenhaValidator } from '../../confirm-senha-validator';
import { ValidatorMessages } from '../../validator-messages';
var PerfilUsuarioPage = /** @class */ (function () {
    function PerfilUsuarioPage(navCtrl, navParams, formBuilder, requests, authProvider, loader, toast, actionSheetCtrl, camera, changeDet, plat) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.requests = requests;
        this.authProvider = authProvider;
        this.loader = loader;
        this.toast = toast;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.changeDet = changeDet;
        this.plat = plat;
        this.msgs = ValidatorMessages.msgs;
        this.url = AuthService.API_URL;
        this.imgsLoaded = false;
        this.filenames = new Array();
        this.form = this.formBuilder.group({
            nome: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z\u00C0-\u024F ]+$')])),
            senha: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
            confirm: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
        }, { validator: ConfirmSenhaValidator.isMatching });
        this.form.get('senha').disable();
        this.form.get('confirm').disable();
        this.userType = authProvider.getUserType();
        if (this.userType === 'Aluno')
            this.form.addControl('matricula', new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')])));
        this.load();
    }
    PerfilUsuarioPage.prototype.ngOnInit = function () {
    };
    PerfilUsuarioPage.prototype.getFilenamesImg = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var resp, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        return [4 /*yield*/, this.requests.get('img/filename/aluno')];
                    case 1:
                        resp = _a.sent();
                        resp.forEach(function (elem) {
                            _this.filenames.push(elem);
                        });
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        return [4 /*yield*/, this.requests.requestErrorPageHandler(error_1, this.toast, this.navCtrl)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PerfilUsuarioPage.prototype.onImgClick = function (img) {
        // TODO
    };
    PerfilUsuarioPage.prototype.onImageLoad = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.imgsLoaded) return [3 /*break*/, 2];
                        _b = (_a = this.slides).slideTo;
                        return [4 /*yield*/, this.slides.length()];
                    case 1:
                        _b.apply(_a, [(_c.sent()) - 1]);
                        _c.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    PerfilUsuarioPage.prototype.load = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loadingDialog, resp, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loader.create({ message: 'Carregando Perfil, aguarde...', spinner: 'crescent' })];
                    case 1:
                        loadingDialog = _a.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 2:
                        _a.sent();
                        if (this.userType == 'Aluno')
                            this.getFilenamesImg();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, 7, 9]);
                        return [4 /*yield*/, this.requests.get('perfil')];
                    case 4:
                        resp = _a.sent();
                        this.form.get('nome').setValue(resp.nome);
                        this.email = resp.email;
                        if (this.userType === 'Aluno')
                            this.form.get('matricula').setValue(resp.matricula);
                        return [3 /*break*/, 9];
                    case 5:
                        error_2 = _a.sent();
                        return [4 /*yield*/, this.requests.requestErrorPageHandler(error_2, this.toast, this.navCtrl)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, loadingDialog.dismiss()];
                    case 8:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    PerfilUsuarioPage.prototype.change = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var senhaControl, confirmControl;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                senhaControl = this.form.get('senha');
                confirmControl = this.form.get('confirm');
                if (this.enableSenha) {
                    senhaControl.enable();
                    confirmControl.enable();
                    setTimeout(function () {
                        _this.senhaInput.setFocus();
                    }, 50);
                }
                else {
                    senhaControl.disable();
                    confirmControl.disable();
                }
                return [2 /*return*/];
            });
        });
    };
    PerfilUsuarioPage.prototype.editar = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loadingDialog, nome, senha, data, resp, t, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loader.create({ message: 'Salvando alterações, aguarde...', spinner: 'crescent' })];
                    case 1:
                        loadingDialog = _a.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 2:
                        _a.sent();
                        nome = this.form.get('nome').value;
                        senha = this.form.get('senha');
                        data = { nome: nome };
                        if (senha.enabled)
                            data['senha'] = senha.value;
                        if (this.form.get('matricula'))
                            data['matricula'] = this.form.get('matricula').value;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, 8, 10]);
                        return [4 /*yield*/, this.requests.put(this.authProvider.getUserType().toLowerCase(), data)];
                    case 4:
                        resp = _a.sent();
                        return [4 /*yield*/, this.toast.create({
                                message: resp.sucesso,
                                duration: 3000
                            })];
                    case 5:
                        t = _a.sent();
                        t.present();
                        return [3 /*break*/, 10];
                    case 6:
                        error_3 = _a.sent();
                        return [4 /*yield*/, this.requests.requestErrorPageHandler(error_3, this.toast, this.navCtrl)];
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
    PerfilUsuarioPage.prototype.apagarFoto = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var t, loadingDialog, filename_1, _a, resp, t, error_4;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.filenames.length === 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.toast.create({
                                message: 'Você deve ter pelo menos 1 foto cadastrada!',
                                duration: 3000
                            })];
                    case 1:
                        t = _b.sent();
                        t.present();
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, this.loader.create({ message: 'Apagando foto, aguarde...', spinner: 'crescent' })];
                    case 3:
                        loadingDialog = _b.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 9, 11, 13]);
                        _a = this.filenames;
                        return [4 /*yield*/, this.slides.getActiveIndex()];
                    case 6:
                        filename_1 = _a[_b.sent()];
                        return [4 /*yield*/, this.requests.delete('img/aluno/' + filename_1)];
                    case 7:
                        resp = _b.sent();
                        return [4 /*yield*/, this.toast.create({
                                message: resp.sucesso,
                                duration: 3000
                            })];
                    case 8:
                        t = _b.sent();
                        t.present();
                        this.filenames = this.filenames.filter(function (elem) { return elem !== filename_1; });
                        this.slides.slidePrev();
                        this.changeDet.detectChanges();
                        return [3 /*break*/, 13];
                    case 9:
                        error_4 = _b.sent();
                        return [4 /*yield*/, this.requests.requestErrorPageHandler(error_4, this.toast, this.navCtrl)];
                    case 10:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 11: return [4 /*yield*/, loadingDialog.dismiss()];
                    case 12:
                        _b.sent();
                        return [7 /*endfinally*/];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    PerfilUsuarioPage.prototype.addNewPhoto = function () {
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
    PerfilUsuarioPage.prototype.upload = function (imageData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loadingDialog, resp, t, error_5;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loader.create({ message: 'Cadastrando, aguarde...', spinner: 'crescent' })];
                    case 1:
                        loadingDialog = _a.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, 8, 10]);
                        return [4 /*yield*/, this.requests.uploadFile('img/aluno', imageData, {}, true, 'PUT')];
                    case 4:
                        resp = _a.sent();
                        resp.filenames.forEach(function (elem) {
                            _this.filenames.push(elem);
                        });
                        return [4 /*yield*/, this.toast.create({
                                message: resp.sucesso,
                                duration: 3000
                            })];
                    case 5:
                        t = _a.sent();
                        t.present();
                        this.imgsLoaded = true;
                        return [3 /*break*/, 10];
                    case 6:
                        error_5 = _a.sent();
                        return [4 /*yield*/, this.requests.requestErrorPageHandler(error_5, this.toast, this.navCtrl)];
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
    tslib_1.__decorate([
        ViewChild('fileInput'),
        tslib_1.__metadata("design:type", ElementRef)
    ], PerfilUsuarioPage.prototype, "fileInput", void 0);
    tslib_1.__decorate([
        ViewChild(IonContent),
        tslib_1.__metadata("design:type", IonContent)
    ], PerfilUsuarioPage.prototype, "content", void 0);
    tslib_1.__decorate([
        ViewChild(IonSlides),
        tslib_1.__metadata("design:type", IonSlides)
    ], PerfilUsuarioPage.prototype, "slides", void 0);
    tslib_1.__decorate([
        ViewChild('senhaInput'),
        tslib_1.__metadata("design:type", IonInput)
    ], PerfilUsuarioPage.prototype, "senhaInput", void 0);
    PerfilUsuarioPage = tslib_1.__decorate([
        Component({
            selector: 'app-perfil-usuario',
            templateUrl: './perfil-usuario.page.html',
            styleUrls: ['./perfil-usuario.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            NavParamsService,
            FormBuilder,
            RequestService,
            AuthService,
            LoadingController,
            ToastController,
            ActionSheetController,
            CameraService,
            ChangeDetectorRef,
            Platform])
    ], PerfilUsuarioPage);
    return PerfilUsuarioPage;
}());
export { PerfilUsuarioPage };
//# sourceMappingURL=perfil-usuario.page.js.map