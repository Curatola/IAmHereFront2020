import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AlunosTurmaPage } from './alunos-turma.page';
import { ComponetsModule } from 'src/app/components/componets.module';
import { DirectivesModule } from 'src/app/directives/directives.module';

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
    ComponetsModule,
    RouterModule.forChild(routes),
    DirectivesModule
  ],
  declarations: [AlunosTurmaPage]
})
export class AlunosTurmaPageModule {}
