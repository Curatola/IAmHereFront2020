import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { NavParamsService } from '../../service/nav-params.service';
import { RequestService } from '../../service/request.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidatorMessages } from '../../validator-messages';
import { NavController, LoadingController, ToastController, IonInput } from '@ionic/angular';
import { ConfirmSenhaValidator } from 'src/app/confirm-senha-validator';
var EditarTurmaPage = /** @class */ (function () {
    function EditarTurmaPage(navCtrl, navParams, formBuilder, requests, loader, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.requests = requests;
        this.loader = loader;
        this.toast = toast;
        this.msgs = ValidatorMessages.msgs;
        this.turma = navParams.get("turma");
        this.turmasPage = this.navParams.get("turmasPage");
        this.form = this.formBuilder.group({
            nome: new FormControl(this.turma.nome, Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern("^[a-zA-Z0-9 ]+$")])),
            ano: new FormControl(this.turma.ano, Validators.required),
            semestre: new FormControl(this.turma.semestre, Validators.required),
            senhaTurma: new FormControl("", Validators.compose([Validators.required, Validators.minLength(4)])),
            confirmSenhaTurma: new FormControl("", Validators.compose([Validators.required, Validators.minLength(4)]))
        }, { "validator": ConfirmSenhaValidator.isMatching });
        this.form.get("senhaTurma").disable();
        this.form.get("confirmSenhaTurma").disable();
    }
    EditarTurmaPage.prototype.ngOnInit = function () {
    };
    EditarTurmaPage.prototype.change = function () {
        var _this = this;
        var senhaControl = this.form.get("senhaTurma");
        var confirmControl = this.form.get("confirmSenhaTurma");
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
    };
    EditarTurmaPage.prototype.editar = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loadingDialog, nome, ano, semestre, senhaTurma, data, resp, t, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loader.create({ message: 'Salvando alterações, aguarde...', spinner: 'crescent' })];
                    case 1:
                        loadingDialog = _a.sent();
                        return [4 /*yield*/, loadingDialog.present()];
                    case 2:
                        _a.sent();
                        nome = this.form.get("nome").value;
                        ano = this.form.get("ano").value;
                        semestre = this.form.get("semestre").value;
                        senhaTurma = this.form.get("senhaTurma");
                        data = { "nome": nome, "ano": ano, "semestre": semestre };
                        if (senhaTurma.enabled)
                            data["senha"] = senhaTurma.value;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, 8, 9]);
                        return [4 /*yield*/, this.requests.put("turma/" + this.turma.id, data)];
                    case 4:
                        resp = _a.sent();
                        return [4 /*yield*/, this.toast.create({
                                message: resp.sucesso,
                                duration: 3000
                            })];
                    case 5:
                        t = _a.sent();
                        t.present();
                        this.turma.nome = nome;
                        this.turma.ano = ano;
                        this.turma.semestre = semestre;
                        this.turmasPage.ordenarTurmas();
                        this.navCtrl.pop();
                        return [3 /*break*/, 9];
                    case 6:
                        error_1 = _a.sent();
                        return [4 /*yield*/, this.requests.requestErrorPageHandler(error_1, this.toast, this.navCtrl)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        loadingDialog.dismiss();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        ViewChild("senhaInput"),
        tslib_1.__metadata("design:type", IonInput)
    ], EditarTurmaPage.prototype, "senhaInput", void 0);
    EditarTurmaPage = tslib_1.__decorate([
        Component({
            selector: 'app-editar-turma',
            templateUrl: './editar-turma.page.html',
            styleUrls: ['./editar-turma.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            NavParamsService,
            FormBuilder,
            RequestService,
            LoadingController,
            ToastController])
    ], EditarTurmaPage);
    return EditarTurmaPage;
}());
export { EditarTurmaPage };
//# sourceMappingURL=editar-turma.page.js.map