import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavParamsService } from '../../service/nav-params.service';
import { RequestService } from '../../service/request.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidatorMessages } from '../../validator-messages';
import { Turma } from 'src/models/turma';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
var CriarTurmaPage = /** @class */ (function () {
    function CriarTurmaPage(navCtrl, navParams, formBuilder, requests, loader, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.requests = requests;
        this.loader = loader;
        this.toast = toast;
        this.msgs = ValidatorMessages.msgs;
        this.turmas = this.navParams.get("turmas");
        this.turmasPage = this.navParams.get("turmasPage");
        this.form = this.formBuilder.group({
            nome: new FormControl("", Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern("^[a-zA-Z0-9\u00C0-\u024F ]+$")])),
            ano: new FormControl("", Validators.required),
            semestre: new FormControl("", Validators.compose([Validators.required, Validators.max(2), Validators.min(1)])),
            senhaTurma: new FormControl("", Validators.compose([Validators.required, Validators.minLength(4)]))
        });
    }
    CriarTurmaPage.prototype.ngOnInit = function () {
    };
    CriarTurmaPage.prototype.criar = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loadingDialog, nome, ano, semestre, senhaTurma, data, resp, t, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loader.create({ message: 'Cadastrando, aguarde...', spinner: 'crescent' })];
                    case 1:
                        loadingDialog = _a.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 2:
                        _a.sent();
                        nome = this.form.get("nome").value;
                        ano = this.form.get("ano").value;
                        semestre = this.form.get("semestre").value;
                        senhaTurma = this.form.get("senhaTurma").value;
                        data = { "nome": nome, "ano": ano, "semestre": semestre, "senha": senhaTurma };
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, 8, 10]);
                        return [4 /*yield*/, this.requests.post("turma", data)];
                    case 4:
                        resp = _a.sent();
                        return [4 /*yield*/, this.toast.create({
                                message: resp.sucesso,
                                duration: 3000
                            })];
                    case 5:
                        t = _a.sent();
                        t.present();
                        this.turmas.push(new Turma(resp.id, nome, ano, semestre, true));
                        this.turmasPage.ordenarTurmas();
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
    CriarTurmaPage = tslib_1.__decorate([
        Component({
            selector: 'app-criar-turma',
            templateUrl: './criar-turma.page.html',
            styleUrls: ['./criar-turma.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            NavParamsService,
            FormBuilder,
            RequestService,
            LoadingController,
            ToastController])
    ], CriarTurmaPage);
    return CriarTurmaPage;
}());
export { CriarTurmaPage };
//# sourceMappingURL=criar-turma.page.js.map