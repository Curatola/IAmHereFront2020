import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AlunosTurmaPage } from './alunos-turma.page';
import { IonicImageLoader } from 'ionic-image-loader';
import { ComponetsModule } from 'src/app/components/componets.module';

const routes: Routes = [
  {
    path: '',
    component: AlunosTurmaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicImageLoader,
    ComponetsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AlunosTurmaPage]
})
export class AlunosTurmaPageModule {}
