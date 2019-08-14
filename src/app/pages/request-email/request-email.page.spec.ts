import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestEmailPage } from './request-email.page';
import { ReactiveFormsModule } from '@angular/forms';

describe('RequestEmailPage', () => {
  let component: RequestEmailPage;
  let fixture: ComponentFixture<RequestEmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestEmailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
