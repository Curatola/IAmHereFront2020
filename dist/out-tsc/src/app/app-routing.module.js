import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    { path: 'aluno-cadastro', loadChildren: './pages/aluno-cadastro/aluno-cadastro.module#AlunoCadastroPageModule' },
    { path: 'alunos-turma', loadChildren: './pages/alunos-turma/alunos-turma.module#AlunosTurmaPageModule' },
    { path: 'chamada-images', loadChildren: './pages/chamada-images/chamada-images.module#ChamadaImagesPageModule' },
    { path: 'chamadas', loadChildren: './pages/chamadas/chamadas.module#ChamadasPageModule' },
    { path: 'confirma', loadChildren: './pages/confirma/confirma.module#ConfirmaPageModule' },
    { path: 'criar-turma', loadChildren: './pages/criar-turma/criar-turma.module#CriarTurmaPageModule' },
    { path: 'editar-turma', loadChildren: './pages/editar-turma/editar-turma.module#EditarTurmaPageModule' },
    { path: 'inscricao', loadChildren: './pages/inscricao/inscricao.module#InscricaoPageModule' },
    { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
    { path: 'nova-senha', loadChildren: './pages/nova-senha/nova-senha.module#NovaSenhaPageModule' },
    { path: 'perfil-usuario', loadChildren: './pages/perfil-usuario/perfil-usuario.module#PerfilUsuarioPageModule' },
    { path: 'presenca', loadChildren: './pages/presenca/presenca.module#PresencaPageModule' },
    { path: 'presenca-turma', loadChildren: './pages/presenca-turma/presenca-turma.module#PresencaTurmaPageModule' },
    { path: 'prof-cadastro', loadChildren: './pages/prof-cadastro/prof-cadastro.module#ProfCadastroPageModule' },
    { path: 'request-email', loadChildren: './pages/request-email/request-email.module#RequestEmailPageModule' },
    { path: 'termos', loadChildren: './pages/termos-uso/termos-uso.module#TermosUsoPageModule' },
    { path: 'turmas', loadChildren: './pages/turmas/turmas.module#TurmasPageModule' },
    { path: 'aluno-cadastro', loadChildren: './pages/aluno-cadastro/aluno-cadastro.module#AlunoCadastroPageModule' },
    { path: 'cadastro-rapido', loadChildren: './pages/cadastro-rapido/cadastro-rapido.module#CadastroRapidoPageModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map