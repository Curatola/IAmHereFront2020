import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavParamsService } from '../../service/nav-params.service';
import { RequestService } from '../../service/request.service';
import { Presenca } from 'src/models/presenca';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Aluno } from 'src/models/aluno';
import { ComponentCanDeactivate } from 'src/app/component-can-deactivate';
var PresencaPage = /** @class */ (function (_super) {
    tslib_1.__extends(PresencaPage, _super);
    function PresencaPage(navCtrl, navParams, requests, loader, toast, alertCtrl) {
        var _this = _super.call(this, alertCtrl, navCtrl) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.requests = requests;
        _this.loader = loader;
        _this.toast = toast;
        _this.alertCtrl = alertCtrl;
        _this.conteudo = "";
        _this.comparecimento = 'areAusentes';
        _this.presentes = new Array();
        _this.ausentes = new Array();
        _this.turma = navParams.get('turma');
        _this.chamada = navParams.get('chamada');
        _this.conteudo = _this.chamada.conteudo;
        _this.load();
        return _this;
    }
    PresencaPage.prototype.ngOnInit = function () { };
    PresencaPage.prototype.onChange = function () {
        if (this.isLoaded) {
            this.isToDoBack = false;
        }
    };
    PresencaPage.prototype.showImages = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.ignore = true;
                        this.navParams.setParams({ turma: this.turma, chamada: this.chamada });
                        return [4 /*yield*/, this.navCtrl.navigateForward('/chamada-images')];
                    case 1:
                        _a.sent();
                        this.ignore = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    PresencaPage.prototype.load = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loadingDialog, resp, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loader.create({
                            message: 'Carregando Presencas...',
                            spinner: 'crescent'
                        })];
                    case 1:
                        loadingDialog = _a.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, 7, 9]);
                        return [4 /*yield*/, this.requests.get('turma/' + this.turma.id + '/chamada/' + this.chamada.id)];
                    case 4:
                        resp = _a.sent();
                        this.presentes = new Array();
                        this.ausentes = new Array();
                        resp.presencas.forEach(function (elem) {
                            if (elem.is_presente) {
                                _this.presentes.push(new Presenca(elem.id, elem.is_presente, new Aluno(elem.aluno.id, elem.aluno.nome)));
                            }
                            else {
                                _this.ausentes.push(new Presenca(elem.id, elem.is_presente, new Aluno(elem.aluno.id, elem.aluno.nome)));
                            }
                        });
                        this.qtdPessoasReconhecidas = resp.qtdPessoasReconhecidas;
                        return [3 /*break*/, 9];
                    case 5:
                        error_1 = _a.sent();
                        return [4 /*yield*/, this.requests.requestErrorPageHandler(error_1, this.toast, this.navCtrl)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 7:
                        this.isLoaded = true;
                        return [4 /*yield*/, loadingDialog.dismiss()];
                    case 8:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    PresencaPage.prototype.done = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var presencas, alunosPresentesId, loadingDialog, resp, t, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        presencas = this.presentes.filter(function (presenca) {
                            return presenca.isPresent;
                        });
                        presencas = presencas.concat(this.ausentes.filter(function (presenca) {
                            return presenca.isPresent;
                        }));
                        alunosPresentesId = presencas.map(function (presenca) {
                            return presenca.aluno.id;
                        });
                        return [4 /*yield*/, this.loader.create({
                                message: 'Editando a chamada...',
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
                        return [4 /*yield*/, this.requests.put('turma/' + this.turma.id + '/chamada/' + this.chamada.id, {
                                presentes: alunosPresentesId,
                                conteudo: this.conteudo
                            })];
                    case 4:
                        resp = _a.sent();
                        return [4 /*yield*/, this.toast.create({
                                message: resp.sucesso,
                                duration: 3000
                            })];
                    case 5:
                        t = _a.sent();
                        t.present();
                        this.chamada.conteudo = this.conteudo;
                        this.ignore = true;
                        this.navCtrl.pop();
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
    PresencaPage = tslib_1.__decorate([
        Component({
            selector: 'app-presenca',
            templateUrl: './presenca.page.html',
            styleUrls: ['./presenca.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            NavParamsService,
            RequestService,
            LoadingController,
            ToastController,
            AlertController])
    ], PresencaPage);
    return PresencaPage;
}(ComponentCanDeactivate));
export { PresencaPage };
//# sourceMappingURL=presenca.page.js.map