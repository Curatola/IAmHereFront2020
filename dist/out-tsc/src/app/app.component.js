import * as tslib_1 from "tslib";
import { AuthService } from './service/auth.service';
import { Component } from '@angular/core';
import { Platform, ToastController, NavController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RequestService } from './service/request.service';
import { Router } from '@angular/router';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { NavParamsService } from './service/nav-params.service';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, toast, nav, navParams, deep, requests, statusBar, splashScreen, auth, router, alert) {
        var _this = this;
        this.toast = toast;
        this.nav = nav;
        this.navParams = navParams;
        this.deep = deep;
        this.requests = requests;
        this.auth = auth;
        this.alert = alert;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            statusBar.overlaysWebView(false);
            splashScreen.hide();
            platform.backButton.subscribe(function () {
                if (router.url === '/turmas' || router.url === '/login') {
                    _this.showAlertExit();
                }
            });
            var logged = _this.auth.userIsLogged();
            if (logged)
                router.navigate(['turmas']);
            else
                router.navigate(['login']);
            _this.deep.route({
                '/confirm_email/:token': '/login',
                '/reset_senha/:token': '/nova-senha',
            }).subscribe(function (match) {
                _this.handle_deeplink(match);
            }, function (nomatch) {
                console.log('no match', nomatch);
            });
        });
    }
    AppComponent.prototype.showAlertExit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alertDialog;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alert.create({
                            header: 'Deseja mesmo sair do app?',
                            buttons: [
                                {
                                    text: 'Sim',
                                    handler: function () { return navigator['app'].exitApp(); }
                                },
                                {
                                    text: 'Não',
                                    role: 'cancel'
                                }
                            ],
                        })];
                    case 1:
                        alertDialog = _a.sent();
                        alertDialog.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.handle_deeplink = function (match) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var t, resp, msg, t, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 9]);
                        if (!this.auth.userIsLogged()) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.toast.create({
                                message: 'Faça logout primeiro!',
                                duration: 3000
                            })];
                    case 1:
                        t = _a.sent();
                        t.present();
                        return [2 /*return*/];
                    case 2:
                        if (!(match.$link.path.split('/')[1] === 'confirm_email')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.requests.put('confirm_email', { token: match.$args.token }, false)];
                    case 3:
                        resp = _a.sent();
                        msg = '';
                        if (resp.sucesso)
                            msg = resp.sucesso;
                        else if (resp.warning)
                            msg = resp.warning;
                        return [4 /*yield*/, this.toast.create({
                                message: msg,
                                duration: 3000
                            })];
                    case 4:
                        t = _a.sent();
                        t.present();
                        return [3 /*break*/, 6];
                    case 5:
                        if (match.$link.path.split('/')[1] == 'reset_senha') {
                            this.navParams.setParams({ token: match.$args.token });
                            this.nav.navigateForward('/nova-senha');
                        }
                        _a.label = 6;
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        error_1 = _a.sent();
                        return [4 /*yield*/, this.requests.requestErrorPageHandler(error_1, this.toast, this.nav)];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            ToastController,
            NavController,
            NavParamsService,
            Deeplinks,
            RequestService,
            StatusBar,
            SplashScreen,
            AuthService,
            Router,
            AlertController])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map