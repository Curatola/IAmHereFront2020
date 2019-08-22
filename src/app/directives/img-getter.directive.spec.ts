import { ImgGetterDirective } from './img-getter.directive';
import { Platform, ActionSheetController } from '@ionic/angular';
import { CameraService } from '../service/camera.service';

describe('ImgGetterDirective', () => {
  let plat:Platform;
  let camera:CameraService;
  let action:ActionSheetController;

  it('should create an instance', () => {
    const directive = new ImgGetterDirective(plat,camera,action);
    expect(directive).toBeTruthy();
  });
});
