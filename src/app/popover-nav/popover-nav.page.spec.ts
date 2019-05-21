import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverNavPage } from './popover-nav.page';

describe('PopoverNavPage', () => {
  let component: PopoverNavPage;
  let fixture: ComponentFixture<PopoverNavPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverNavPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverNavPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
