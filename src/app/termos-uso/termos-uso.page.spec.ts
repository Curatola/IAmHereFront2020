import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermosUsoPage } from './termos-uso.page';

describe('TermosUsoPage', () => {
  let component: TermosUsoPage;
  let fixture: ComponentFixture<TermosUsoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermosUsoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermosUsoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
