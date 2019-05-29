import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PresencaTurmaPage } from './presenca-turma.page';

const routes: Routes = [
  {
    path: '',
    component: PresencaTurmaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PresencaTurmaPage]
})
export class PresencaTurmaPageModule {}
