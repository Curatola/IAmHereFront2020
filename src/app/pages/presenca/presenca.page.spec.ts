import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresencaPage } from './presenca.page';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('PresencaPage', () => {
  let component: PresencaPage;
  let fixture: ComponentFixture<PresencaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresencaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule,ReactiveFormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresencaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
