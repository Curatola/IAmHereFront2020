import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { map, switchMap } from "rxjs/operators";
var SecureImgComponent = /** @class */ (function () {
    // we need HttpClient to load the image
    function SecureImgComponent(http, sanitizer) {
        var _this = this;
        this.http = http;
        this.sanitizer = sanitizer;
        this.src$ = new BehaviorSubject(this.src);
        this.loaded = false;
        // this stream will contain the actual url that our img tag will load
        // everytime the src changes, the previous call would be canceled and the
        // new resource would be loaded
        this.dataUrl$ = this.src$.pipe(switchMap(function (url) { return _this.loadImage(url); }));
    }
    SecureImgComponent.prototype.ngOnChanges = function () {
        this.src$.next(this.src);
    };
    SecureImgComponent.prototype.loadImage = function (url) {
        var _this = this;
        return this.http
            .get(url, { responseType: 'blob', withCredentials: true })
            .pipe(map(function (blob) {
            _this.loaded = true;
            return _this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
        }));
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SecureImgComponent.prototype, "src", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SecureImgComponent.prototype, "spinnerColor", void 0);
    SecureImgComponent = tslib_1.__decorate([
        Component({
            selector: 'app-secure-img',
            templateUrl: './secure-img.component.html',
            styleUrls: ['./secure-img.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, DomSanitizer])
    ], SecureImgComponent);
    return SecureImgComponent;
}());
export { SecureImgComponent };
//# sourceMappingURL=secure-img.component.js.map