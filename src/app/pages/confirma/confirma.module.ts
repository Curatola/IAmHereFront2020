import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConfirmaPage } from './confirma.page';
import { CanDeactivateGuard } from 'src/app/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: ConfirmaPage,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ConfirmaPage]
})
export class ConfirmaPageModule {}
