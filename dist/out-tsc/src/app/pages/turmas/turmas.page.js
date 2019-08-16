import * as tslib_1 from "tslib";
import { Turma } from '../../../models/turma';
import { AuthService } from '../../service/auth.service';
import { Component, ChangeDetectorRef } from '@angular/core';
import { RequestService } from '../../service/request.service';
import { Events, NavController, LoadingController, ToastController, PopoverController, AlertController, Platform } from '@ionic/angular';
import { NavParamsService } from '../../service/nav-params.service';
import { PopoverNavComponent } from '../../components/popover-nav/popover-nav.component';
import { File } from '@ionic-native/file/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
var TurmasPage = /** @class */ (function () {
    function TurmasPage(navCtrl, navParams, requests, authProvider, loader, toast, popoverCtrl, events, alertCtrl, plt, file, fcm, localNotifications, changeDet) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.requests = requests;
        this.authProvider = authProvider;
        this.loader = loader;
        this.toast = toast;
        this.popoverCtrl = popoverCtrl;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.plt = plt;
        this.file = file;
        this.fcm = fcm;
        this.localNotifications = localNotifications;
        this.changeDet = changeDet;
        this.userType = authProvider.getUserType();
        if (this.userType === AuthService.ALUNO && (this.plt.is('cordova'))) {
            this.localNotifications.hasPermission().then(function (hasPerm) {
                if (!hasPerm)
                    _this.localNotifications.requestPermission();
            });
            this.fcm.getToken().then(function (token) {
                _this.requests.post('fcm/aluno/' + token, {});
            });
            this.fcm.onTokenRefresh().subscribe(function (token) {
                _this.requests.post('fcm/aluno/' + token, {});
            });
            this.fcm.onNotification().subscribe(function (data) {
                if (!data.wasTapped) {
                    _this.localNotifications.schedule({
                        title: data.title,
                        text: data.body,
                        vibrate: true,
                        smallIcon: 'res://mipmap/ic_notification'
                    });
                }
                console.log(data);
            });
        }
        this.events.unsubscribe('refresh turmas');
        this.events.subscribe('refresh turmas', function () { _this.load(); });
        this.load();
    }
    TurmasPage.prototype.ngOnInit = function () {
    };
    TurmasPage.prototype.goPresencasTurmaPage = function (turma) {
        this.navParams.setParams({ turma: turma });
        this.navCtrl.navigateForward('presenca-turma');
    };
    TurmasPage.prototype.lockUnlock = function (turma) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var msg, loadingDialog, resp, t, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = (turma.inscricoes_aberta) ? 'Bloqueando inscrições...' : 'Liberando inscrições...';
                        return [4 /*yield*/, this.loader.create({ message: msg, spinner: 'crescent' })];
                    case 1:
                        loadingDialog = _a.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, 8, 10]);
                        return [4 /*yield*/, this.requests.post('change_inscricoes_aberta/turma/' + turma.id, { inscricoes_aberta: !turma.inscricoes_aberta })];
                    case 4:
                        resp = _a.sent();
                        turma.inscricoes_aberta = !turma.inscricoes_aberta;
                        return [4 /*yield*/, this.toast.create({
                                message: resp.sucesso,
                                duration: 6000
                            })];
                    case 5:
                        t = _a.sent();
                        t.present();
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
    TurmasPage.prototype.export = function (turma) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var resp, fileName, err_1, t, error_2, t;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 11]);
                        return [4 /*yield*/, this.requests.get('turma/' + turma.id + '/chamadas')];
                    case 1:
                        resp = _a.sent();
                        fileName = 'chamada_' + resp.turma.replace(' ', '_') + '.csv';
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 6]);
                        return [4 /*yield*/, this.file.checkDir(this.file.externalRootDirectory, 'IAmHere')];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        err_1 = _a.sent();
                        return [4 /*yield*/, this.file.createDir(this.file.externalRootDirectory, 'IAmHere', false)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 6: return [4 /*yield*/, this.file.writeFile(this.file.externalRootDirectory, 'IAmHere/' + fileName, resp.csv, { replace: true })];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.toast.create({
                                message: 'Exportação feita com sucesso: IAmHere/chamada_' +
                                    resp.turma +
                                    '.csv',
                                duration: 6000
                            })];
                    case 8:
                        t = _a.sent();
                        t.present();
                        return [3 /*break*/, 11];
                    case 9:
                        error_2 = _a.sent();
                        return [4 /*yield*/, this.toast.create({
                                message: error_2.message,
                                duration: 3000
                            })];
                    case 10:
                        t = _a.sent();
                        t.present();
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    TurmasPage.prototype.popoverDeslogar = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var popover;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.navParams.setParams({ is_logoff: true, isGoPerfil: true });
                        return [4 /*yield*/, this.popoverCtrl.create({
                                component: PopoverNavComponent,
                                event: event
                            })];
                    case 1:
                        popover = _a.sent();
                        popover.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    TurmasPage.prototype.load = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loadingDialog, resp, error_3;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loader.create({ message: 'Carregando Turmas...', spinner: 'crescent' })];
                    case 1:
                        loadingDialog = _a.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, 7, 9]);
                        return [4 /*yield*/, this.requests.get('turmas')];
                    case 4:
                        resp = _a.sent();
                        this.turmas = new Array();
                        resp.forEach(function (elem) {
                            _this.turmas.push(new Turma(elem.id, elem.nome, elem.ano, elem.semestre, elem.inscricoes_aberta));
                        });
                        return [3 /*break*/, 9];
                    case 5:
                        error_3 = _a.sent();
                        return [4 /*yield*/, this.requests.requestErrorPageHandler(error_3, this.toast, this.navCtrl)];
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
    TurmasPage.prototype.showListasPresenca = function (turma) {
        this.navParams.setParams({ turma: turma });
        this.navCtrl.navigateForward('/chamadas');
    };
    TurmasPage.prototype.add = function () {
        if (this.userType === AuthService.PROFESSOR) {
            this.navParams.setParams({ turmas: this.turmas, turmasPage: this });
            this.navCtrl.navigateForward('/criar-turma');
        }
        else {
            this.navCtrl.navigateForward('/inscricao');
        }
    };
    TurmasPage.prototype.getAlunos = function (turma) {
        this.navParams.setParams({ turma: turma });
        this.navCtrl.navigateForward('/alunos-turma');
    };
    TurmasPage.prototype.editar = function (turma) {
        this.navParams.setParams({ turma: turma, turmasPage: this });
        this.navCtrl.navigateForward('/editar-turma');
    };
    TurmasPage.prototype.apagar = function (event, turma) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Confirme',
                                message: 'Deseja mesmo apagar essa turma?',
                                buttons: [
                                    {
                                        text: 'Não',
                                        role: 'cancel',
                                    },
                                    {
                                        text: 'Sim',
                                        handler: function () {
                                            _this.commitApagar(turma);
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
    TurmasPage.prototype.ordenarTurmas = function () {
        this.turmas.sort(function (t1, t2) {
            if (t1.ano > t2.ano)
                return -1;
            else if (t1.ano < t2.ano)
                return 1;
            else {
                if (t1.semestre > t2.semestre)
                    return -1;
                else if (t1.semestre < t2.semestre)
                    return 1;
                else {
                    if (t1.nome < t2.nome)
                        return -1;
                    else if (t1.nome > t2.nome)
                        return 1;
                    return 0;
                }
            }
        });
    };
    TurmasPage.prototype.commitApagar = function (turma) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loadingDialog, resp, indx, t, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loader.create({ message: 'Apagando turma...', spinner: 'crescent' })];
                    case 1:
                        loadingDialog = _a.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, 8, 10]);
                        return [4 /*yield*/, this.requests.delete('turma/' + turma.id)];
                    case 4:
                        resp = _a.sent();
                        indx = this.turmas.indexOf(turma);
                        this.turmas.splice(indx, 1);
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
                        error_4 = _a.sent();
                        return [4 /*yield*/, this.requests.requestErrorPageHandler(error_4, this.toast, this.navCtrl)];
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
    TurmasPage.prototype.desinscrever = function (event, turma) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Confirme',
                                message: 'Deseja mesmo se desinscrever?',
                                buttons: [
                                    {
                                        text: 'Não',
                                        role: 'cancel',
                                    },
                                    {
                                        text: 'Sim',
                                        handler: function () {
                                            _this.commitDesinscricao(turma);
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
    TurmasPage.prototype.commitDesinscricao = function (turma) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loadingDialog, resp, indx, t, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loader.create({ message: 'Desinscrevendo-se...', spinner: 'crescent' })];
                    case 1:
                        loadingDialog = _a.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, 8, 10]);
                        return [4 /*yield*/, this.requests.delete('inscricao/turma/' + turma.id)];
                    case 4:
                        resp = _a.sent();
                        indx = this.turmas.indexOf(turma);
                        this.turmas.splice(indx, 1);
                        return [4 /*yield*/, this.toast.create({
                                message: resp.sucesso,
                                duration: 3000
                            })];
                    case 5:
                        t = _a.sent();
                        t.present();
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
    TurmasPage = tslib_1.__decorate([
        Component({
            selector: 'app-turmas',
            templateUrl: './turmas.page.html',
            styleUrls: ['./turmas.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            NavParamsService,
            RequestService,
            AuthService,
            LoadingController,
            ToastController,
            PopoverController,
            Events,
            AlertController,
            Platform,
            File,
            FCM,
            LocalNotifications,
            ChangeDetectorRef])
    ], TurmasPage);
    return TurmasPage;
}());
export { TurmasPage };
//# sourceMappingURL=turmas.page.js.map