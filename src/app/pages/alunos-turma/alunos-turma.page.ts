import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavParamsService } from '../../service/nav-params.service';
import { RequestService } from '../../service/request.service';
import { Turma } from 'src/models/turma';
import { Aluno } from 'src/models/aluno';
import { NavController, LoadingController, ToastController, AlertController, ActionSheetController, Events } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { CameraService } from 'src/app/service/camera.service';

@Component({
  selector: 'app-alunos-turma',
  templateUrl: './alunos-turma.page.html',
  styleUrls: ['./alunos-turma.page.scss'],
})
export class AlunosTurmaPage implements OnInit {
  turma: Turma;
  alunos: Array<{aluno: Aluno, filename: string}>;
  url: string = AuthService.API_URL;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParamsService,
    private loader: LoadingController,
    private toast: ToastController,
    private requests: RequestService,
    private alertCtrl: AlertController,
    private camera: CameraService,
    private actionSheetCtrl: ActionSheetController,
    public events: Events,
    private changeDet: ChangeDetectorRef
  ) {
      this.turma = this.navParams.get('turma');
      this.load();
      events.subscribe('refresh alunos', () => { this.load(); });
  }

  ngOnInit() {
  }

  async load() {
    const loadingDialog = await this.loader.create({ message: 'Carregando Alunos da turma...', spinner: 'crescent' });
    await loadingDialog.present();

    try {
      const resp = await this.requests.get('alunos/turma/' + this.turma.id);

      this.alunos = new Array();

      resp.forEach(elem => {
        this.alunos.push({aluno: new Aluno(elem.id, elem.nome), filename: elem.foto});
      });

    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }

  async desinscrever(obj: {aluno: Aluno, filename: string}) {
    const alert = await this.alertCtrl.create({
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
            this.commitDesinscrever(obj);
          }
        }
      ]
    });
    alert.present();
  }

  async addAlunos() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Selecione o modo',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.camera.takePicture()
              .then((imageData) => this.commitAddAluno(imageData))
              .catch((error) => console.log(error));
          }
        },
        {
          text: 'Galeria',
          handler: () => {
            this.camera.getFromGallery()
              .then((imageData) => this.commitAddAluno(imageData))
              .catch((error) => console.log(error));
          }
        }
      ]
    });

    actionSheet.present();
  }

  async commitAddAluno(imageData) {
    const loadingDialog = await this.loader.create({ message: 'Enviando Foto...', spinner: 'crescent' });
    await loadingDialog.present();

    try {
      const resp = await this.requests.uploadFile(imageData, 'inscricao/rapida/turma/' + this.turma.id, {});

      this.navParams.setParams({ data: resp, turma: this.turma });
      this.navCtrl.navigateForward('/cadastro-rapido');
    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }

  async commitDesinscrever(obj: {aluno: Aluno, filename: string}) {
    const loadingDialog = await this.loader.create({ message: 'Desinscrevendo Aluno...', spinner: 'crescent' });
    await loadingDialog.present();


    try {
      const resp = await this.requests.delete('inscricao/turma/' + this.turma.id + '/aluno/' + obj.aluno.id);
      const t = await this.toast.create({
        message: resp.sucesso,
        duration: 3000
      });

      t.present();

      const indx = this.alunos.indexOf(obj);
      this.alunos.splice(indx, 1);

      this.changeDet.detectChanges();

    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }

}
