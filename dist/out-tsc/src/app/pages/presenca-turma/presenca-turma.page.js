import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { NavParamsService } from '../../service/nav-params.service';
import { RequestService } from '../../service/request.service';
import { IonInfiniteScroll, NavController, LoadingController, ToastController } from '@ionic/angular';
var PresencaTurmaPage = /** @class */ (function () {
    function PresencaTurmaPage(navCtrl, navParams, requests, loader, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.requests = requests;
        this.loader = loader;
        this.toast = toast;
        this.page = 1;
        this.turma = navParams.get("turma");
        this.load();
    }
    PresencaTurmaPage.prototype.ngOnInit = function () {
    };
    PresencaTurmaPage.prototype.load = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loadingDialog;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loader.create({ message: 'Carregando Chamadas...', spinner: 'crescent' })];
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
    PresencaTurmaPage.prototype.doInfinit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var resp, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        return [4 /*yield*/, this.requests.get("turma/" + this.turma.id + "/presencas/pag/" + this.page)];
                    case 1:
                        resp = _a.sent();
                        if (!this.presencas)
                            this.presencas = new Array();
                        resp.presencas.forEach(function (elem) {
                            _this.presencas.push(new PresencasTurma(elem.isPresente, elem.dateHour));
                        });
                        this.qtdChamada = resp.qtdChamada;
                        this.qtdPresenca = resp.qtdPresenca;
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
    tslib_1.__decorate([
        ViewChild(IonInfiniteScroll),
        tslib_1.__metadata("design:type", IonInfiniteScroll)
    ], PresencaTurmaPage.prototype, "infiniteScroll", void 0);
    PresencaTurmaPage = tslib_1.__decorate([
        Component({
            selector: 'app-presenca-turma',
            templateUrl: './presenca-turma.page.html',
            styleUrls: ['./presenca-turma.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            NavParamsService,
            RequestService,
            LoadingController,
            ToastController])
    ], PresencaTurmaPage);
    return PresencaTurmaPage;
}());
export { PresencaTurmaPage };
var PresencasTurma = /** @class */ (function () {
    function PresencasTurma(isPresente, dateHour) {
        this.isPresente = isPresente;
        this.dateHour = dateHour;
        this.dateStr = this.getDateStr();
        this.dateShort = this.getDateShort();
        this.timeStr = this.getTimeStr();
    }
    PresencasTurma.prototype.getDateStr = function () {
        var options = { month: 'long', day: '2-digit' };
        return new Date(this.dateHour * 1000).toLocaleDateString('pt-BR', options);
    };
    PresencasTurma.prototype.getTimeStr = function () {
        var options = { hour: '2-digit', minute: '2-digit' };
        return new Date(this.dateHour * 1000).toLocaleTimeString('pt-BR', options);
    };
    PresencasTurma.prototype.getDateShort = function () {
        var options = { month: '2-digit', day: '2-digit' };
        return new Date(this.dateHour).toLocaleDateString('pt-BR', options);
    };
    return PresencasTurma;
}());
//# sourceMappingURL=presenca-turma.page.js.map