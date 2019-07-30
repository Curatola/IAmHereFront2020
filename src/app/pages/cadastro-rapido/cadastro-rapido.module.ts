import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroRapidoPage } from './cadastro-rapido.page';
import { CanDeactivateGuard } from 'src/app/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: CadastroRapidoPage,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CadastroRapidoPage]
})
export class CadastroRapidoPageModule {}
