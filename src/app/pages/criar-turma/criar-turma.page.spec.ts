import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarTurmaPage } from './criar-turma.page';

describe('CriarTurmaPage', () => {
  let component: CriarTurmaPage;
  let fixture: ComponentFixture<CriarTurmaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarTurmaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarTurmaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
