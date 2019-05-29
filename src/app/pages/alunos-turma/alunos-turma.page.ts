import { Component, OnInit } from '@angular/core';
import { NavParamsService } from '../../service/nav-params.service';
import { RequestService } from '../../service/request.service';
import { Turma } from 'src/models/turma';
import { Aluno } from 'src/models/aluno';
import { NavController, LoadingController, ToastController, AlertController, ActionSheetController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-alunos-turma',
  templateUrl: './alunos-turma.page.html',
  styleUrls: ['./alunos-turma.page.scss'],
})
export class AlunosTurmaPage implements OnInit {

  ngOnInit() {
  }

  turma: Turma;
  alunos: Array<Aluno>;
  inscritos: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParamsService,
    private loader: LoadingController,
    private toast: ToastController,
    private requests: RequestService,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController
    ) {

      this.turma = this.navParams.get("turma");
      this.load();
  }

  async load() {
    let loadingDialog = await this.loader.create({ message: 'Carregando Alunos da turma...', spinner: 'crescent' });
    await loadingDialog.present();

    try {
      let resp = await this.requests.get("alunos/turma/" + this.turma.id);

      this.alunos = new Array();
      resp.forEach(elem => {
        this.alunos.push(new Aluno(elem.id,elem.nome))
      });
      this.inscritos =this.alunos.length;
      
    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }

  async optionsClick(event, aluno: Aluno){
    let actionSheet = await this.actionSheetCtrl.create({
      header: aluno.nome,
      buttons: [{
        text: "Desinscrever",
        icon: "trash",
        cssClass: "trash-icon",
        handler: () => {this.desinscrever(aluno)}
      }]
    });
   
    
    actionSheet.present();
    event.stopPropagation();
  }

  async desinscrever(aluno: Aluno){
    let alert = await this.alertCtrl.create({
      header: 'Confirme',
      message: 'Deseja mesmo desinscrever esse aluno?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: () => {
            this.commitDesinscrever(aluno);
          }
        }
      ]
    });
    alert.present();
  }

  async commitDesinscrever(aluno: Aluno){
    let loadingDialog = await this.loader.create({ message: 'Desinscrevendo Aluno...', spinner: 'crescent' });
    await loadingDialog.present();

    try {
      let resp = await this.requests.delete("inscricao/turma/" + this.turma.id + "/aluno/" + aluno.id);
      let t = await this.toast.create({
        message: resp.sucesso,
        duration: 3000
      });

      t.present();

      let indx = this.alunos.indexOf(aluno);
      this.alunos.splice(indx,1);

    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }

}
