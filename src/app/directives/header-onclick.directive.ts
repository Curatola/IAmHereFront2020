import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHeaderOnclick]',
  host: {
    '(click)': 'onClick()'
  }
})
export class HeaderOnclickDirective {

// tslint:disable-next-line: no-input-rename
  @Input() header: any;
  isHided = false;

  constructor(public element: ElementRef, public renderer: Renderer2) {
  }

  ngOnInit() {
    this.renderer.setStyle(this.header.el, 'top', '-56px');
    this.renderer.setStyle(this.header.el, 'webkitTransition', 'top 700ms');
    this.renderer.setStyle(this.header.el, 'top', '0px');
  }

  onClick(){
    if (this.isHided){
      this.renderer.setStyle(this.header.el, 'top', '0px');
    }else{
      this.renderer.setStyle(this.header.el, 'top', '-56px');
    }

    this.isHided = !this.isHided;
  }
}
