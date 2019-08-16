import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
var AuthService = /** @class */ (function () {
    function AuthService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
    }
    AuthService_1 = AuthService;
    AuthService.erroHandler = function (httpError) {
        console.log(httpError);
        if (httpError.status === 400)
            throw new Error(httpError.error.error);
        else if (httpError.status === 401)
            throw new Error('401');
        else if (httpError.status === 0)
            throw new Error('Não foi possivel se conectar ao servidor!');
        else
            throw new Error('Erro desconhecido');
    };
    AuthService.prototype.userIsLogged = function () {
        return this.cookieService.check('access_token_cookie');
    };
    AuthService.prototype.getUserType = function () {
        return localStorage.getItem('user') || sessionStorage.getItem('user');
    };
    AuthService.prototype.isAdmin = function () {
        return JSON.parse(localStorage.getItem('isAdmin')) || JSON.parse(sessionStorage.getItem('isAdmin'));
    };
    AuthService.prototype.deslogarOnlyOnApp = function () {
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        localStorage.removeItem('isAdmin');
        sessionStorage.removeItem('isAdmin');
    };
    AuthService.prototype.deslogar = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http
                                .post(AuthService_1.API_URL + 'logoff', {}, { withCredentials: true })
                                .toPromise()];
                    case 1:
                        _a.sent();
                        this.deslogarOnlyOnApp();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        AuthService_1.erroHandler(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.login = function (email, password, isPersistent) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var header, result, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        header = new HttpHeaders();
                        header = header.set('Authorization', 'Basic ' + btoa(email + ':' + password));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http
                                .get(AuthService_1.API_URL + 'login', { headers: header, withCredentials: true })
                                .toPromise()];
                    case 2:
                        result = _a.sent();
                        if (isPersistent) {
                            localStorage.setItem('user', result.userType);
                            localStorage.setItem('isAdmin', result.isAdmin);
                        }
                        else {
                            sessionStorage.setItem('user', result.userType);
                            sessionStorage.setItem('isAdmin', result.isAdmin);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        if (error_2.status === 401) {
                            throw new Error('Não é possivel logar com essas informações');
                        }
                        else {
                            AuthService_1.erroHandler(error_2);
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    var AuthService_1;
    AuthService.API_URL = 'http://192.168.0.7:5000/';
    AuthService.PROFESSOR = 'Professor';
    AuthService.ALUNO = 'Aluno';
    AuthService = AuthService_1 = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, CookieService])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map