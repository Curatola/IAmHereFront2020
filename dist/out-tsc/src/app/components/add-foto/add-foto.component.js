import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { CameraService } from 'src/app/service/camera.service';
import { AlertController } from '@ionic/angular';
var AddFotoComponent = /** @class */ (function () {
    function AddFotoComponent(camera, alertCtrl) {
        this.camera = camera;
        this.alertCtrl = alertCtrl;
        this.max = 10;
        this.pathsFotos = new Array();
    }
    AddFotoComponent.prototype.takePicture = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var imageData, msg, alert_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.camera.takePicture()];
                    case 1:
                        imageData = _a.sent();
                        this.pathsFotos.push(imageData);
                        msg = 'Essa será a ' + (this.pathsFotos.length + 1) + 'ª foto de no máximo ' + this.max;
                        if (this.pathsFotos.length === this.max - 1) {
                            msg = 'Essa será a última foto desse conjunto!';
                        }
                        if (!(this.pathsFotos.length < this.max)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Deseja tirar mais fotos?',
                                message: msg,
                                buttons: [
                                    {
                                        text: 'Não',
                                        handler: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                            return tslib_1.__generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, this.uploadFunction(this.pathsFotos)];
                                                    case 1:
                                                        _a.sent();
                                                        this.pathsFotos = new Array();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); }
                                    },
                                    {
                                        text: 'Sim',
                                        handler: function () {
                                            _this.takePicture();
                                        }
                                    }
                                ]
                            })];
                    case 2:
                        alert_1 = _a.sent();
                        alert_1.present();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.uploadFunction(this.pathsFotos)];
                    case 4:
                        _a.sent();
                        this.pathsFotos = new Array();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AddFotoComponent.prototype.getFromGallery = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var imageData, msg, alert_2, error_2;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.camera.getFromGallery()];
                    case 1:
                        imageData = _a.sent();
                        this.pathsFotos.push(imageData);
                        msg = 'Essa será a ' + (this.pathsFotos.length + 1) + 'ª foto de no máximo ' + this.max;
                        if (this.pathsFotos.length === this.max - 1) {
                            msg = 'Essa será a última foto desse conjunto!';
                        }
                        if (!(this.pathsFotos.length < this.max)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Deseja selecionar mais fotos?',
                                message: msg,
                                buttons: [
                                    {
                                        text: 'Não',
                                        handler: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                            return tslib_1.__generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, this.uploadFunction(this.pathsFotos)];
                                                    case 1:
                                                        _a.sent();
                                                        this.pathsFotos = new Array();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); }
                                    },
                                    {
                                        text: 'Sim',
                                        handler: function () {
                                            _this.getFromGallery();
                                        }
                                    }
                                ]
                            })];
                    case 2:
                        alert_2 = _a.sent();
                        alert_2.present();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.uploadFunction(this.pathsFotos)];
                    case 4:
                        _a.sent();
                        this.pathsFotos = new Array();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Function)
    ], AddFotoComponent.prototype, "uploadFunction", void 0);
    AddFotoComponent = tslib_1.__decorate([
        Component({
            selector: 'app-add-foto',
            templateUrl: './add-foto.component.html',
            styleUrls: ['./add-foto.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [CameraService,
            AlertController])
    ], AddFotoComponent);
    return AddFotoComponent;
}());
export { AddFotoComponent };
//# sourceMappingURL=add-foto.component.js.map