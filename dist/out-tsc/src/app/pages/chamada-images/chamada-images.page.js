import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { NavParamsService } from '../../service/nav-params.service';
import { RequestService } from '../../service/request.service';
import { NavController, ToastController, IonSlides } from '@ionic/angular';
import { AuthService } from '../../service/auth.service';
import { StatusBar } from "@ionic-native/status-bar/ngx";
var ChamadaImagesPage = /** @class */ (function () {
    function ChamadaImagesPage(navCtrl, navParams, requests, toast, statusBar) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.requests = requests;
        this.toast = toast;
        this.statusBar = statusBar;
        this.url = AuthService.API_URL;
        this.turma = navParams.get("turma");
        this.chamada = navParams.get("chamada");
        this.statusBar.hide();
        this.getFilenamesImg();
    }
    ChamadaImagesPage.prototype.ngOnInit = function () {
    };
    ChamadaImagesPage.prototype.event = function (data) {
        if (data.type === "swipe") {
            this.slides.lockSwipes(true);
        }
        else if (data.type === "touchend") {
            this.slides.lockSwipes(false);
        }
    };
    ChamadaImagesPage.prototype.showStatusBar = function () {
        this.statusBar.show();
    };
    ChamadaImagesPage.prototype.getFilenamesImg = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var resp, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        return [4 /*yield*/, this.requests.get("img/filename/turma/" + this.turma.id + "/chamada/" + this.chamada.id)];
                    case 1:
                        resp = _a.sent();
                        this.filenames = Array();
                        resp.forEach(function (elem) {
                            _this.filenames.push(elem);
                        });
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        return [4 /*yield*/, this.requests.requestErrorPageHandler(error_1, this.toast, this.navCtrl)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        ViewChild(IonSlides),
        tslib_1.__metadata("design:type", IonSlides)
    ], ChamadaImagesPage.prototype, "slides", void 0);
    ChamadaImagesPage = tslib_1.__decorate([
        Component({
            selector: 'app-chamada-images',
            templateUrl: './chamada-images.page.html',
            styleUrls: ['./chamada-images.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            NavParamsService,
            RequestService,
            ToastController,
            StatusBar])
    ], ChamadaImagesPage);
    return ChamadaImagesPage;
}());
export { ChamadaImagesPage };
//# sourceMappingURL=chamada-images.page.js.map