import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AlunosTurmaPage } from './alunos-turma.page';
import { ComponentsModule } from 'src/app/components/components.module';
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
    DirectivesModule
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AlunosTurmaPage]
})
export class AlunosTurmaPageModule {}
