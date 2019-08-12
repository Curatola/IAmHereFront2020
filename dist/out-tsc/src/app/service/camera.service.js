import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
/*
  Generated class for the CameraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var CameraService = /** @class */ (function () {
    function CameraService(camera) {
        this.camera = camera;
    }
    CameraService.prototype.takePicture = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {
                            quality: 100,
                            saveToPhotoAlbum: true,
                            sourceType: this.camera.PictureSourceType.CAMERA,
                            correctOrientation: true
                        };
                        return [4 /*yield*/, this.camera.getPicture(options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CameraService.prototype.getFromGallery = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {
                            quality: 100,
                            destinationType: this.camera.DestinationType.FILE_URI,
                            mediaType: this.camera.MediaType.PICTURE,
                            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                            encodingType: this.camera.EncodingType.JPEG
                        };
                        return [4 /*yield*/, this.camera.getPicture(options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CameraService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Camera])
    ], CameraService);
    return CameraService;
}());
export { CameraService };
//# sourceMappingURL=camera.service.js.map