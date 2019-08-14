import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AlunoCadastroPage } from './aluno-cadastro.page';

describe('AlunoCadastroPage', () => {
  let component: AlunoCadastroPage;
  let fixture: ComponentFixture<AlunoCadastroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlunoCadastroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule],
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
