import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CameraService } from 'src/app/service/camera.service';
import { Camera } from '@ionic-native/camera/ngx';
import { AddFotoComponent } from './add-foto.component';

describe('AddFotoComponent', () => {
  let component: AddFotoComponent;
  let fixture: ComponentFixture<AddFotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFotoComponent ],
      providers: [CameraService, Camera],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
