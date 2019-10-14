import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SincronizadorPage } from './sincronizador.page';

describe('SincronizadorPage', () => {
  let component: SincronizadorPage;
  let fixture: ComponentFixture<SincronizadorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SincronizadorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SincronizadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
