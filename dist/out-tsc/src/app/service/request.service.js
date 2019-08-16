import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { File } from '@ionic-native/file/ngx';
var RequestService = /** @class */ (function () {
    function RequestService(http, auth, file) {
        this.http = http;
        this.auth = auth;
        this.file = file;
    }
    RequestService.prototype.get = function (rota, withAuthorization) {
        if (withAuthorization === void 0) { withAuthorization = true; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http
                                .get(AuthService.API_URL + rota, { withCredentials: true })
                                .toPromise()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        error_1 = _a.sent();
                        AuthService.erroHandler(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RequestService.prototype.post = function (rota, data, withAuthorization) {
        if (withAuthorization === void 0) { withAuthorization = true; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http
                                .post(AuthService.API_URL + rota, data, { withCredentials: withAuthorization })
                                .toPromise()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        error_2 = _a.sent();
                        AuthService.erroHandler(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RequestService.prototype.put = function (rota, data, withAuthorization) {
        if (withAuthorization === void 0) { withAuthorization = true; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http
                                .put(AuthService.API_URL + rota, data, { withCredentials: withAuthorization })
                                .toPromise()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        error_3 = _a.sent();
                        AuthService.erroHandler(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RequestService.prototype.delete = function (rota) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http
                                .delete(AuthService.API_URL + rota, { withCredentials: true })
                                .toPromise()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        error_4 = _a.sent();
                        AuthService.erroHandler(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RequestService.prototype.uploadFile = function (rota, file, data, withAuthorization, httpMethod) {
        if (withAuthorization === void 0) { withAuthorization = true; }
        if (httpMethod === void 0) { httpMethod = 'POST'; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var formData, key, imgBlob, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        formData = new FormData();
                        for (key in data) {
                            if (data[key] !== undefined) {
                                if (typeof data[key] !== 'string') {
                                    formData.append(key.toString(), JSON.stringify(data[key]));
                                }
                                else {
                                    formData.append(key.toString(), data[key]);
                                }
                            }
                        }
                        if (!(typeof file === 'string')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.readFile(file)];
                    case 1:
                        imgBlob = _a.sent();
                        formData.set('imagefile', imgBlob);
                        return [3 /*break*/, 3];
                    case 2:
                        formData.set('imagefile', file);
                        _a.label = 3;
                    case 3:
                        if (!(httpMethod === 'POST')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.commitUploadPost(rota, formData, withAuthorization)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        if (!(httpMethod === 'PUT')) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.commitUploadPut(rota, formData, withAuthorization)];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_5 = _a.sent();
                        AuthService.erroHandler(error_5);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    RequestService.prototype.readFile = function (filePath) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var entry;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.file.resolveLocalFilesystemUrl(filePath)];
                    case 1:
                        entry = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                entry.file(function (file) {
                                    var fileReader = new FileReader();
                                    fileReader.readAsArrayBuffer(file);
                                    fileReader.onloadend = function () {
                                        var imgBlob = new Blob([fileReader.result], {
                                            type: file.type
                                        });
                                        resolve(imgBlob);
                                    };
                                });
                            })];
                }
            });
        });
    };
    RequestService.prototype.commitUploadPost = function (rota, data, withAuthorization) {
        if (withAuthorization === void 0) { withAuthorization = true; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http
                            .post(AuthService.API_URL + rota, data, { withCredentials: withAuthorization })
                            .toPromise()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    RequestService.prototype.commitUploadPut = function (rota, data, withAuthorization) {
        if (withAuthorization === void 0) { withAuthorization = true; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http
                            .put(AuthService.API_URL + rota, data, { withCredentials: withAuthorization })
                            .toPromise()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    RequestService.prototype.requestErrorPageHandler = function (error, toast, navCtrl) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var t, t;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(error.message === '401')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.auth.deslogarOnlyOnApp()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, navCtrl.navigateRoot('/login')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, toast.create({
                                message: 'Você foi deslogado. Faça login novamente!',
                                duration: 3000
                            })];
                    case 3:
                        t = _a.sent();
                        t.present();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, toast.create({
                            message: error.message,
                            duration: 3000
                        })];
                    case 5:
                        t = _a.sent();
                        t.present();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    RequestService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            AuthService,
            File])
    ], RequestService);
    return RequestService;
}());
export { RequestService };
//# sourceMappingURL=request.service.js.map