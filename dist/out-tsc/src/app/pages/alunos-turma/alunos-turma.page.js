import * as tslib_1 from "tslib";
import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { NavParamsService } from '../../service/nav-params.service';
import { RequestService } from '../../service/request.service';
import { Aluno } from 'src/models/aluno';
import { NavController, LoadingController, ToastController, AlertController, ActionSheetController, Events, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { CameraService } from 'src/app/service/camera.service';
var AlunosTurmaPage = /** @class */ (function () {
    function AlunosTurmaPage(navCtrl, navParams, loader, toast, requests, alertCtrl, camera, actionSheetCtrl, events, changeDet, authService, plat) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loader = loader;
        this.toast = toast;
        this.requests = requests;
        this.alertCtrl = alertCtrl;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        this.events = events;
        this.changeDet = changeDet;
        this.authService = authService;
        this.plat = plat;
        this.url = AuthService.API_URL;
        this.turma = this.navParams.get('turma');
        this.load();
        events.subscribe('refresh alunos', function () { _this.load(); });
    }
    AlunosTurmaPage.prototype.ngOnInit = function () {
    };
    AlunosTurmaPage.prototype.load = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loadingDialog, resp, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loader.create({ message: 'Carregando Alunos da turma...', spinner: 'crescent' })];
                    case 1:
                        loadingDialog = _a.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, 7, 9]);
                        return [4 /*yield*/, this.requests.get('alunos/turma/' + this.turma.id)];
                    case 4:
                        resp = _a.sent();
                        this.alunos = new Array();
                        resp.alunos.forEach(function (elem) {
                            _this.alunos.push({
                                aluno: new Aluno(elem.id, elem.nome),
                                filename: elem.foto,
                                presenca: elem.presenca
                            });
                        });
                        this.qtdChamada = resp.qtdChamada;
                        return [3 /*break*/, 9];
                    case 5:
                        error_1 = _a.sent();
                        return [4 /*yield*/, this.requests.requestErrorPageHandler(error_1, this.toast, this.navCtrl)];
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
    AlunosTurmaPage.prototype.desinscrever = function (obj) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Confirme',
                            message: 'Deseja mesmo desinscrever esse aluno?',
                            buttons: [
                                {
                                    text: 'Não',
                                    role: 'cancel',
                                },
                                {
                                    text: 'Sim',
                                    handler: function () {
                                        _this.commitDesinscrever(obj);
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
    AlunosTurmaPage.prototype.addAlunos = function () {
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
                                            .then(function (imageData) { return _this.commitAddAluno(imageData); })
                                            .catch(function (error) { return console.log(error); });
                                    }
                                },
                                {
                                    text: 'Galeria',
                                    handler: function () {
                                        _this.camera.getFromGallery()
                                            .then(function (imageData) { return _this.commitAddAluno(imageData); })
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
    AlunosTurmaPage.prototype.commitAddAluno = function (imageData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loadingDialog, resp, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loader.create({ message: 'Enviando Foto...', spinner: 'crescent' })];
                    case 1:
                        loadingDialog = _a.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, 7, 9]);
                        return [4 /*yield*/, this.requests.uploadFile('inscricao/rapida/turma/' + this.turma.id, imageData, {})];
                    case 4:
                        resp = _a.sent();
                        this.navParams.setParams({ data: resp, turma: this.turma });
                        this.navCtrl.navigateForward('/cadastro-rapido');
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
    AlunosTurmaPage.prototype.commitDesinscrever = function (obj) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loadingDialog, resp, t, indx, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loader.create({ message: 'Desinscrevendo Aluno...', spinner: 'crescent' })];
                    case 1:
                        loadingDialog = _a.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, 8, 10]);
                        return [4 /*yield*/, this.requests.delete('inscricao/turma/' + this.turma.id + '/aluno/' + obj.aluno.id)];
                    case 4:
                        resp = _a.sent();
                        return [4 /*yield*/, this.toast.create({
                                message: resp.sucesso,
                                duration: 3000
                            })];
                    case 5:
                        t = _a.sent();
                        t.present();
                        indx = this.alunos.indexOf(obj);
                        this.alunos.splice(indx, 1);
                        this.changeDet.detectChanges();
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
    tslib_1.__decorate([
        ViewChild('fileInput'),
        tslib_1.__metadata("design:type", ElementRef)
    ], AlunosTurmaPage.prototype, "fileInput", void 0);
    AlunosTurmaPage = tslib_1.__decorate([
        Component({
            selector: 'app-alunos-turma',
            templateUrl: './alunos-turma.page.html',
            styleUrls: ['./alunos-turma.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            NavParamsService,
            LoadingController,
            ToastController,
            RequestService,
            AlertController,
            CameraService,
            ActionSheetController,
            Events,
            ChangeDetectorRef,
            AuthService,
            Platform])
    ], AlunosTurmaPage);
    return AlunosTurmaPage;
}());
export { AlunosTurmaPage };
//# sourceMappingURL=alunos-turma.page.js.map