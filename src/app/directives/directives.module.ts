import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderOnclickDirective } from './header-onclick.directive';

@NgModule({
  declarations: [HeaderOnclickDirective],
  imports: [
    CommonModule
  ],
  exports: [HeaderOnclickDirective]
})
export class DirectivesModule { }
