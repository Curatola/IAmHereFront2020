import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderOnclickDirective } from './header-onclick.directive';
import { ImgGetterDirective } from './img-getter.directive';

@NgModule({
  declarations: [HeaderOnclickDirective, ImgGetterDirective],
  imports: [
    CommonModule
  ],
  exports: [HeaderOnclickDirective, ImgGetterDirective]
})
export class DirectivesModule { }
