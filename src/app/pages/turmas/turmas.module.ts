import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TurmasPage } from './turmas.page';
import { ComponetsModule } from '../../components/componets.module';

const routes: Routes = [
  {
    path: '',
    component: TurmasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponetsModule
  ],
  declarations: [TurmasPage]
})
export class TurmasPageModule { }
