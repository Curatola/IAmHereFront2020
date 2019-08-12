import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { RequestService } from '../../service/request.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidatorMessages } from '../../validator-messages';
import { NavController, ToastController, LoadingController, Events } from '@ionic/angular';
import { NavParamsService } from '../../service/nav-params.service';
var InscricaoPage = /** @class */ (function () {
    function InscricaoPage(navCtrl, navParams, requests, toast, loader, events, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.requests = requests;
        this.toast = toast;
        this.loader = loader;
        this.events = events;
        this.formBuilder = formBuilder;
        this.msgs = ValidatorMessages.msgs;
        this.form = this.formBuilder.group({
            codTurma: new FormControl("", Validators.required),
            senhaTurma: new FormControl("", Validators.compose([Validators.required, Validators.minLength(4)]))
        });
    }
    InscricaoPage.prototype.ngOnInit = function () {
    };
    InscricaoPage.prototype.confirmar = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loadingDialog, codTurma, senhaTurma, resp, t, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loader.create({ message: 'Fazendo inscrição...', spinner: 'crescent' })];
                    case 1:
                        loadingDialog = _a.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, 8, 10]);
                        codTurma = this.form.get("codTurma").value;
                        senhaTurma = this.form.get("senhaTurma").value;
                        return [4 /*yield*/, this.requests.post("inscricao/turma/" + codTurma, { senhaTurma: senhaTurma })];
                    case 4:
                        resp = _a.sent();
                        return [4 /*yield*/, this.toast.create({
                                message: resp.sucesso,
                                duration: 3000
                            })];
                    case 5:
                        t = _a.sent();
                        t.present();
                        this.events.publish("refresh turmas");
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
    InscricaoPage = tslib_1.__decorate([
        Component({
            selector: 'app-inscricao',
            templateUrl: './inscricao.page.html',
            styleUrls: ['./inscricao.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            NavParamsService,
            RequestService,
            ToastController,
            LoadingController,
            Events,
            FormBuilder])
    ], InscricaoPage);
    return InscricaoPage;
}());
export { InscricaoPage };
//# sourceMappingURL=inscricao.page.js.map