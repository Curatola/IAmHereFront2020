import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PresencaPage } from './presenca.page';
import { CanDeactivateGuard } from 'src/app/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: PresencaPage,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PresencaPage]
})
export class PresencaPageModule {}
