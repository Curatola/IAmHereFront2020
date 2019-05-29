import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadaImagesPage } from './chamada-images.page';

describe('ChamadaImagesPage', () => {
  let component: ChamadaImagesPage;
  let fixture: ComponentFixture<ChamadaImagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChamadaImagesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamadaImagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
