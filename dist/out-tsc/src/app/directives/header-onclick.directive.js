import * as tslib_1 from "tslib";
import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
var HeaderOnclickDirective = /** @class */ (function () {
    function HeaderOnclickDirective(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.isHided = false;
    }
    HeaderOnclickDirective.prototype.ngOnInit = function () {
        this.renderer.setStyle(this.header.el, 'top', '-56px');
        this.renderer.setStyle(this.header.el, 'webkitTransition', 'top 700ms');
        this.renderer.setStyle(this.header.el, 'top', '0px');
    };
    HeaderOnclickDirective.prototype.onClick = function () {
        if (this.isHided) {
            this.renderer.setStyle(this.header.el, 'top', '0px');
        }
        else {
            this.renderer.setStyle(this.header.el, 'top', '-56px');
        }
        this.isHided = !this.isHided;
    };
    tslib_1.__decorate([
        Input("header"),
        tslib_1.__metadata("design:type", Object)
    ], HeaderOnclickDirective.prototype, "header", void 0);
    HeaderOnclickDirective = tslib_1.__decorate([
        Directive({
            selector: '[appHeaderOnclick]',
            host: {
                '(click)': 'onClick()'
            }
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef, Renderer2])
    ], HeaderOnclickDirective);
    return HeaderOnclickDirective;
}());
export { HeaderOnclickDirective };
//# sourceMappingURL=header-onclick.directive.js.map