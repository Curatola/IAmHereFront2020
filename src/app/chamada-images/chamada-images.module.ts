import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChamadaImagesPage } from './chamada-images.page';
import { IonicImageLoader } from 'ionic-image-loader';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { DirectivesModule } from '../directives/directives.module';

const routes: Routes = [
  {
    path: '',
    component: ChamadaImagesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    IonicImageLoader,
    PinchZoomModule,
    DirectivesModule
  ],
  declarations: [ChamadaImagesPage]
})
export class ChamadaImagesPageModule {}
