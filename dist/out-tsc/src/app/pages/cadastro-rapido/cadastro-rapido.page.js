import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavParamsService } from 'src/app/service/nav-params.service';
import { RequestService } from 'src/app/service/request.service';
import { LoadingController, ToastController, NavController, Events, AlertController } from '@ionic/angular';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { ValidatorMessages } from 'src/app/validator-messages';
import { ComponentCanDeactivate } from 'src/app/component-can-deactivate';
var ImgData = /** @class */ (function () {
    function ImgData(img, encodings) {
        this.img = img;
        this.encodings = encodings;
    }
    return ImgData;
}());
var CadastroRapidoPage = /** @class */ (function (_super) {
    tslib_1.__extends(CadastroRapidoPage, _super);
    function CadastroRapidoPage(navCtrl, navParams, requests, loader, toast, events, formBuilder, alertCtrl) {
        var _this = _super.call(this, alertCtrl, navCtrl) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.requests = requests;
        _this.loader = loader;
        _this.toast = toast;
        _this.events = events;
        _this.formBuilder = formBuilder;
        _this.alertCtrl = alertCtrl;
        _this.imgs = new Array();
        _this.msgs = ValidatorMessages.msgs;
        _this.isToDoBack = false;
        _this.turma = navParams.get('turma');
        var inputsGroup = {};
        navParams.get('data').forEach(function (elem) {
            inputsGroup['nome' + _this.imgs.length] = new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z\u00C0-\u024F ]+$')]));
            _this.imgs.push(new ImgData(elem[0], elem[1]));
        });
        _this.form = _this.formBuilder.group(inputsGroup);
        return _this;
    }
    CadastroRapidoPage.prototype.ngOnInit = function () {
    };
    CadastroRapidoPage.prototype.trackByIndex = function (index, obj) {
        return index;
    };
    CadastroRapidoPage.prototype.cadastrar = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loadingDialog, resp, t, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loader.create({ message: 'Cadastrando novos Alunos...', spinner: 'crescent' })];
                    case 1:
                        loadingDialog = _a.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, 8, 10]);
                        return [4 /*yield*/, this.requests.post('inscricao/rapida/turma/' + this.turma.id, { pessoas: this.imgs })];
                    case 4:
                        resp = _a.sent();
                        return [4 /*yield*/, this.toast.create({
                                message: resp.sucesso,
                                duration: 3000
                            })];
                    case 5:
                        t = _a.sent();
                        t.present();
                        this.ignore = true;
                        this.events.publish('refresh alunos');
                        this.navCtrl.back();
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
    CadastroRapidoPage = tslib_1.__decorate([
        Component({
            selector: 'app-cadastro-rapido',
            templateUrl: './cadastro-rapido.page.html',
            styleUrls: ['./cadastro-rapido.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            NavParamsService,
            RequestService,
            LoadingController,
            ToastController,
            Events,
            FormBuilder,
            AlertController])
    ], CadastroRapidoPage);
    return CadastroRapidoPage;
}(ComponentCanDeactivate));
export { CadastroRapidoPage };
//# sourceMappingURL=cadastro-rapido.page.js.map