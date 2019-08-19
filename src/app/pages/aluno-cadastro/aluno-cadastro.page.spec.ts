import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoCadastroPage } from './aluno-cadastro.page';
import { ReactiveFormsModule } from '@angular/forms';

describe('AlunoCadastroPage', () => {
  let component: AlunoCadastroPage;
  let fixture: ComponentFixture<AlunoCadastroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlunoCadastroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [AlunoCadastroPage, ReactiveFormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoCadastroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
