import * as tslib_1 from "tslib";
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, LoadingController, ToastController, ActionSheetController, AlertController, IonInfiniteScroll, Platform } from '@ionic/angular';
import { RequestService } from '../../service/request.service';
import { CameraService } from '../../service/camera.service';
import { Chamada } from 'src/models/chamada';
import { NavParamsService } from '../../service/nav-params.service';
var ChamadasPage = /** @class */ (function () {
    function ChamadasPage(navCtrl, navParams, requests, loader, toast, camera, actionSheetCtrl, alertCtrl, changeDet, plat) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.requests = requests;
        this.loader = loader;
        this.toast = toast;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.changeDet = changeDet;
        this.plat = plat;
        this.page = 1;
        this.canMakeChamada = false;
        this.turma = navParams.get('turma');
        this.load();
        this.doRefresh(null);
    }
    ChamadasPage.prototype.load = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loadingDialog;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loader.create({
                            message: 'Carregando Chamadas...',
                            spinner: 'crescent'
                        })];
                    case 1:
                        loadingDialog = _a.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.doInfinit()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, loadingDialog.dismiss()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChamadasPage.prototype.doInfinit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var resp, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        return [4 /*yield*/, this.requests.get('turma/' + this.turma.id + '/chamadas/pag/' + this.page)];
                    case 1:
                        resp = _a.sent();
                        if (!this.chamadas) {
                            this.chamadas = new Array();
                        }
                        resp.chamadas.forEach(function (elem) {
                            _this.chamadas.push(new Chamada(elem.id, elem.dateHour, elem.conteudo));
                        });
                        if (!resp.hasMorePages) {
                            this.infiniteScroll.disabled = true;
                        }
                        else {
                            this.page++;
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        return [4 /*yield*/, this.requests.requestErrorPageHandler(error_1, this.toast, this.navCtrl)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        this.infiniteScroll.complete();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChamadasPage.prototype.apagarChamada = function (event, chamada) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var msg, alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        msg = '';
                        if (!this.hasOthersChamadasInDay(chamada)) {
                            msg = 'Só existe essa chamada desse dia';
                        }
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Deseja mesmo apagar essa chamada?',
                                message: msg,
                                buttons: [
                                    {
                                        text: 'Não',
                                        role: 'cancel'
                                    },
                                    {
                                        text: 'Sim',
                                        handler: function () {
                                            _this.commitApagar(chamada);
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
    ChamadasPage.prototype.commitApagar = function (chamada) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loadingDialog, resp, indx, t, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loader.create({
                            message: 'Apagando Chamada...',
                            spinner: 'crescent'
                        })];
                    case 1:
                        loadingDialog = _a.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, 8, 10]);
                        return [4 /*yield*/, this.requests.delete('turma/' + this.turma.id + '/chamada/' + chamada.id)];
                    case 4:
                        resp = _a.sent();
                        indx = this.chamadas.indexOf(chamada);
                        this.chamadas.splice(indx, 1);
                        return [4 /*yield*/, this.toast.create({
                                message: resp.sucesso,
                                duration: 3000
                            })];
                    case 5:
                        t = _a.sent();
                        t.present();
                        this.changeDet.detectChanges();
                        return [3 /*break*/, 10];
                    case 6:
                        error_2 = _a.sent();
                        return [4 /*yield*/, this.requests.requestErrorPageHandler(error_2, this.toast, this.navCtrl)];
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
    ChamadasPage.prototype.hasOthersChamadasInDay = function (chamada) {
        var currentDate = new Date(chamada.dateHour).setHours(0, 0, 0, 0);
        return this.chamadas.some(function (c) {
            var dateC = new Date(c.dateHour).setHours(0, 0, 0, 0);
            return dateC === currentDate && c !== chamada;
        });
    };
    ChamadasPage.prototype.details = function (chamada) {
        this.navParams.setParams({ chamada: chamada, turma: this.turma });
        this.navCtrl.navigateForward('/presenca');
    };
    ChamadasPage.prototype.doRefresh = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var resp;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.requests.get('turma/' + this.turma.id + '/can_make_chamada')];
                    case 1:
                        resp = _a.sent();
                        this.canMakeChamada = resp.canMakeChamada;
                        if (event)
                            event.target.complete();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChamadasPage.prototype.uploadFile = function (filesPath) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var presentes, sucess, result, timestampPrimeiraFoto, qtdPessoasReconhecidas, i, _i, filesPath_1, filePath, loadingDialog, resp, presencas, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        presentes = new Array();
                        sucess = true;
                        timestampPrimeiraFoto = -1;
                        qtdPessoasReconhecidas = 0;
                        i = 1;
                        _i = 0, filesPath_1 = filesPath;
                        _a.label = 1;
                    case 1:
                        if (!(_i < filesPath_1.length)) return [3 /*break*/, 10];
                        filePath = filesPath_1[_i];
                        return [4 /*yield*/, this.loader.create({
                                message: 'Uploading foto ' + i + '...'
                            })];
                    case 2:
                        loadingDialog = _a.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, 8, 9]);
                        return [4 /*yield*/, this.requests.uploadFile('turma/' + this.turma.id + '/chamada', filePath, {
                                previousPresentes: presentes,
                                dataHoraOriginal: (result) ? timestampPrimeiraFoto : undefined
                            })];
                    case 5:
                        resp = _a.sent();
                        presencas = resp.presencas.filter(function (presenca) { return presenca.isPresente; });
                        presentes = presencas.map(function (presenca) { return presenca.alunoId; });
                        result = {
                            presencas: resp.presencas,
                            turma: this.turma,
                            chamadas: this.chamadas
                        };
                        if (i === 1) {
                            timestampPrimeiraFoto = resp.timestampFoto;
                        }
                        qtdPessoasReconhecidas += resp.total;
                        i++;
                        return [3 /*break*/, 9];
                    case 6:
                        error_3 = _a.sent();
                        return [4 /*yield*/, this.requests.requestErrorPageHandler(error_3, this.toast, this.navCtrl)];
                    case 7:
                        _a.sent();
                        sucess = false;
                        return [3 /*break*/, 9];
                    case 8:
                        loadingDialog.dismiss();
                        return [7 /*endfinally*/];
                    case 9:
                        _i++;
                        return [3 /*break*/, 1];
                    case 10:
                        if (sucess) {
                            result.timestampFoto = timestampPrimeiraFoto;
                            result.qtdPessoasReconhecidas = qtdPessoasReconhecidas;
                            this.navParams.setParams(result);
                            this.navCtrl.navigateForward('/confirma');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ChamadasPage.prototype.ngOnInit = function () { };
    tslib_1.__decorate([
        ViewChild(IonInfiniteScroll),
        tslib_1.__metadata("design:type", IonInfiniteScroll)
    ], ChamadasPage.prototype, "infiniteScroll", void 0);
    ChamadasPage = tslib_1.__decorate([
        Component({
            selector: 'app-chamadas',
            templateUrl: './chamadas.page.html',
            styleUrls: ['./chamadas.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            NavParamsService,
            RequestService,
            LoadingController,
            ToastController,
            CameraService,
            ActionSheetController,
            AlertController,
            ChangeDetectorRef,
            Platform])
    ], ChamadasPage);
    return ChamadasPage;
}());
export { ChamadasPage };
//# sourceMappingURL=chamadas.page.js.map