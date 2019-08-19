import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SecureImgComponent } from './secure-img.component';

describe('SecureImgComponent', () => {
  let component: SecureImgComponent;
  let fixture: ComponentFixture<SecureImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule],
      declarations: [ SecureImgComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
