import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavParamsService } from '../../service/nav-params.service';
import { RequestService } from '../../service/request.service';
import { AuthService } from '../../service/auth.service';
import { Presenca } from 'src/models/presenca';
import { Chamada } from 'src/models/chamada';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Aluno } from 'src/models/aluno';
import { CameraService } from '../../service/camera.service';
import { ComponentCanDeactivate } from 'src/app/component-can-deactivate';
var ConfirmaPage = /** @class */ (function (_super) {
    tslib_1.__extends(ConfirmaPage, _super);
    function ConfirmaPage(navCtrl, navParams, requests, authProvider, loader, toast, camera, alertCtrl) {
        var _this = _super.call(this, alertCtrl, navCtrl) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.requests = requests;
        _this.authProvider = authProvider;
        _this.loader = loader;
        _this.toast = toast;
        _this.camera = camera;
        _this.alertCtrl = alertCtrl;
        _this.conteudo = '';
        _this.comparecimento = 'areAusentes';
        _this.turma = navParams.get('turma');
        _this.timestampFoto = navParams.get("timestampFoto");
        var presencas = navParams.get('presencas');
        _this.qtdPessoasReconhecidas = navParams.get("qtdPessoasReconhecidas");
        _this.chamadas = navParams.get("chamadas");
        _this.atualizaListas(presencas);
        return _this;
    }
    ConfirmaPage.prototype.ngOnInit = function () {
        this.isToDoBack = false;
    };
    ConfirmaPage.prototype.atualizaListas = function (presencas) {
        var _this = this;
        this.presentes = new Array();
        this.ausentes = new Array();
        presencas.forEach(function (elem) {
            var presenca = new Presenca(0, elem.isPresente, new Aluno(elem.alunoId, elem.alunoNome));
            if (presenca.isPresent)
                _this.presentes.push(presenca);
            else
                _this.ausentes.push(presenca);
        });
    };
    ConfirmaPage.prototype.done = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var presencas, alunosPresentesId, loadingDialog, resp, t, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        presencas = this.presentes.filter(function (presenca, index, presencas) { return presenca.isPresent; });
                        presencas = presencas.concat(this.ausentes.filter(function (presenca, index, presencas) { return presenca.isPresent; }));
                        alunosPresentesId = presencas.map(function (presenca, index, presencas) { return presenca.aluno.id; });
                        return [4 /*yield*/, this.loader.create({ message: 'Confirmando nova chamada...', spinner: 'crescent' })];
                    case 1:
                        loadingDialog = _a.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, 8, 10]);
                        return [4 /*yield*/, this.requests.post("turma/" + this.turma.id + "/chamada", {
                                "presentes": alunosPresentesId,
                                "dataHora": this.timestampFoto,
                                "qtdPessoasReconhecidas": this.qtdPessoasReconhecidas,
                                "conteudo": this.conteudo
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
                        this.chamadas.push(new Chamada(resp.id, this.timestampFoto, this.conteudo));
                        this.chamadas.sort(function (c1, c2) {
                            if (c1.dateHour > c2.dateHour)
                                return -1;
                            else if (c1.dateHour < c2.dateHour)
                                return 1;
                            return 0;
                        });
                        this.ignore = true;
                        this.navCtrl.pop();
                        return [3 /*break*/, 10];
                    case 6:
                        error_1 = _a.sent();
                        return [4 /*yield*/, this.requests.requestErrorPageHandler(error_1, this.toast, this.navCtrl)];
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
    ConfirmaPage = tslib_1.__decorate([
        Component({
            selector: 'app-confirma',
            templateUrl: './confirma.page.html',
            styleUrls: ['./confirma.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            NavParamsService,
            RequestService,
            AuthService,
            LoadingController,
            ToastController,
            CameraService,
            AlertController])
    ], ConfirmaPage);
    return ConfirmaPage;
}(ComponentCanDeactivate));
export { ConfirmaPage };
//# sourceMappingURL=confirma.page.js.map