import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscricaoPage } from './inscricao.page';

describe('InscricaoPage', () => {
  let component: InscricaoPage;
  let fixture: ComponentFixture<InscricaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscricaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscricaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
