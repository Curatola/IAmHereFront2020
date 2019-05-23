import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'aluno-cadastro', loadChildren: './aluno-cadastro/aluno-cadastro.module#AlunoCadastroPageModule' },
  { path: 'alunos-turma', loadChildren: './alunos-turma/alunos-turma.module#AlunosTurmaPageModule' },
  { path: 'chamada-images', loadChildren: './chamada-images/chamada-images.module#ChamadaImagesPageModule' },
  { path: 'chamadas', loadChildren: './chamadas/chamadas.module#ChamadasPageModule' },
  { path: 'confirma', loadChildren: './confirma/confirma.module#ConfirmaPageModule' },
  { path: 'criar-turma', loadChildren: './criar-turma/criar-turma.module#CriarTurmaPageModule' },
  { path: 'editar-turma', loadChildren: './editar-turma/editar-turma.module#EditarTurmaPageModule' },
  { path: 'inscricao', loadChildren: './inscricao/inscricao.module#InscricaoPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'nova-senha', loadChildren: './nova-senha/nova-senha.module#NovaSenhaPageModule' },
  { path: 'perfil-usuario', loadChildren: './perfil-usuario/perfil-usuario.module#PerfilUsuarioPageModule' },
  { path: 'popover-nav', loadChildren: './popover-nav/popover-nav.module#PopoverNavPageModule' },
  { path: 'presenca', loadChildren: './presenca/presenca.module#PresencaPageModule' },
  { path: 'presenca-turma', loadChildren: './presenca-turma/presenca-turma.module#PresencaTurmaPageModule' },
  { path: 'prof-cadastro', loadChildren: './prof-cadastro/prof-cadastro.module#ProfCadastroPageModule' },
  { path: 'request-email', loadChildren: './request-email/request-email.module#RequestEmailPageModule' },
  { path: 'termos', loadChildren: './termos-uso/termos-uso.module#TermosUsoPageModule' },
  { path: 'turmas', loadChildren: './turmas/turmas.module#TurmasPageModule' },
  { path: 'aluno-cadastro', loadChildren: './aluno-cadastro/aluno-cadastro.module#AlunoCadastroPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
