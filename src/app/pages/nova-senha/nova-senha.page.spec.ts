import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaSenhaPage } from './nova-senha.page';

describe('NovaSenhaPage', () => {
  let component: NovaSenhaPage;
  let fixture: ComponentFixture<NovaSenhaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaSenhaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaSenhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
