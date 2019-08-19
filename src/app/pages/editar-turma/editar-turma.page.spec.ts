import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTurmaPage } from './editar-turma.page';
import { ReactiveFormsModule } from '@angular/forms';

describe('EditarTurmaPage', () => {
  let component: EditarTurmaPage;
  let fixture: ComponentFixture<EditarTurmaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarTurmaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTurmaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
