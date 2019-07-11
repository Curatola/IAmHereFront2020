import { Component, OnInit } from '@angular/core';
import { NavParamsService } from '../../service/nav-params.service';
import { RequestService } from '../../service/request.service';
import { Turma } from 'src/models/turma';
import { Aluno } from 'src/models/aluno';
import { NavController, LoadingController, ToastController, AlertController, ActionSheetController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { CameraService } from 'src/app/service/camera.service';

@Component({
  selector: 'app-alunos-turma',
  templateUrl: './alunos-turma.page.html',
  styleUrls: ['./alunos-turma.page.scss'],
})
export class AlunosTurmaPage implements OnInit {

  ngOnInit() {
  }

  turma: Turma;
  alunos: Array<{aluno: Aluno, filename: string}>;
  url: string = AuthService.API_URL;

  imgs: Array<string> = new Array();

  constructor(public navCtrl: NavController,
    public navParams: NavParamsService,
    private loader: LoadingController,
    private toast: ToastController,
    private requests: RequestService,
    private alertCtrl: AlertController,
    private camera: CameraService,
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
        this.alunos.push({aluno: new Aluno(elem.id,elem.nome), filename: elem.foto})
      });
      
    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }

  async desinscrever(obj: {aluno: Aluno, filename: string}){
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
            this.commitDesinscrever(obj);
          }
        }
      ]
    });
    alert.present();
  }

  async addAlunos(){
    let actionSheet = await this.actionSheetCtrl.create({
      header: 'Selecione o modo',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.camera.takePicture()
              .then((imageData) => this.commitAddAluno(imageData))
              .catch((error) => console.log(error))
          }
        },
        {
          text: 'Galeria',
          handler: () => {
            this.camera.getFromGallery()
              .then((imageData) => this.commitAddAluno(imageData))
              .catch((error) => console.log(error))
          }
        }
      ]
    });

    actionSheet.present();
  }

  async commitAddAluno(imageData) {
    let loadingDialog = await this.loader.create({ message: 'Enviando Foto...', spinner: 'crescent' });
    await loadingDialog.present();
    
    try {
      let resp = await this.requests.uploadFile(imageData,"inscricao/rapida/turma/" + this.turma.id, {});

      resp.forEach(elem => {
        this.imgs.push("data:image/jpeg;base64,"+elem[0]);
      });
    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }

  async commitDesinscrever(obj: {aluno: Aluno, filename: string}){
    let loadingDialog = await this.loader.create({ message: 'Desinscrevendo Aluno...', spinner: 'crescent' });
    await loadingDialog.present();
    

    try {
      let resp = await this.requests.delete("inscricao/turma/" + this.turma.id + "/aluno/" + obj.aluno.id);
      let t = await this.toast.create({
        message: resp.sucesso,
        duration: 3000
      });

      t.present();

      let indx = this.alunos.indexOf(obj);
      this.alunos.splice(indx,1);

    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }

}
