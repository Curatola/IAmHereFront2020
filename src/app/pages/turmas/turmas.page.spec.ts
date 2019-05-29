import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmasPage } from './turmas.page';

describe('TurmasPage', () => {
  let component: TurmasPage;
  let fixture: ComponentFixture<TurmasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurmasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
