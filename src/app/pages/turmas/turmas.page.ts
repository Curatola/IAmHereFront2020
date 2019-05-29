import { Turma } from '../../../models/turma';
import { AuthService } from '../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../service/request.service';
import { Events, NavController, LoadingController, ToastController, PopoverController, AlertController, ActionSheetController, Platform } from '@ionic/angular';
import { NavParamsService } from '../../service/nav-params.service';
import { ImageLoaderConfigService } from 'ionic-image-loader';
import { HttpHeaders } from '@angular/common/http';
import { PopoverNavComponent } from '../../components/popover-nav/popover-nav.component';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.page.html',
  styleUrls: ['./turmas.page.scss'],
})
export class TurmasPage implements OnInit {

  ngOnInit() {
  }

  turmas: Array<Turma>
  userType: string;

  constructor(public navCtrl: NavController,
    private navParams: NavParamsService,
    public requests: RequestService,
    public authProvider: AuthService,
    private loader: LoadingController,
    public toast: ToastController,
    public popoverCtrl: PopoverController,
    public events: Events,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    public imageLoaderConfig: ImageLoaderConfigService,
    public plt: Platform,
    //private fcm: FCM,
    //public localNotifications: LocalNotifications,
  ) {

    this.userType = authProvider.getUserType();

    /*if (this.userType == AuthProvider.ALUNO && (!this.plt.is('core'))){
      this.localNotifications.hasPermission().then(hasPerm => {
        if (!hasPerm) this.localNotifications.requestPermission();
      })

      this.fcm.getToken().then(token => {
        this.requests.post("fcm/aluno/"+token, {});
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        this.requests.post("fcm/aluno/"+token, {});
      })

     
      this.fcm.onNotification().subscribe(data => {
        if(!data.wasTapped){
          this.localNotifications.schedule({
            title: data.title,
            text: data.body,
            vibrate: true
          });
        }

        console.log(data);
      });

    }*/

    this.events.unsubscribe("refresh turmas")
    this.events.subscribe("refresh turmas", () => { this.load() });

    const headers = new HttpHeaders().set("Authorization", "Bearer " + authProvider.getToken());
    this.imageLoaderConfig.setHttpHeaders(headers);

    this.load();
  }

  goPresencasTurmaPage(turma: Turma) {
    this.navParams.setParams({ "turma": turma });
    this.navCtrl.navigateForward("presenca-turma");
  }

  async optionsClick(event, turma: Turma) {
    event.stopPropagation();
    event.preventDefault();

    let actionSheet;

    if (this.userType == "Professor") {
      actionSheet = await this.actionSheetCtrl.create({
        header: turma.nome + " - " + turma.ano + "/" + turma.semestre,
        buttons: [
          {
            text: "Editar",
            icon: "create",
            handler: () => this.editar(turma)
          },
          {
            text: "Alunos",
            icon: "people",
            handler: () => this.getAlunos(turma)
          },
          {
            text: "Apagar",
            icon: "trash",
            cssClass: "trash-icon",
            handler: () => { this.apagar(turma) }
          }
        ]
      });

    } else {
      actionSheet = await this.actionSheetCtrl.create({
        header: turma.nome + " - " + turma.ano + "/" + turma.semestre,
        buttons: [
          {
            text: "Desinscrever-se",
            icon: "trash",
            cssClass: "trash-icon",
            handler: () => { this.desinscrever(turma) }
          }
        ]
      });
    }

    actionSheet.present();

  }

  goPerfil() {
    this.navCtrl.navigateForward('/perfil-usuario');
  }

  async popoverDeslogar(event) {
    this.navParams.setParams({ "is_logoff": true });
    let popover = await this.popoverCtrl.create({
      component: PopoverNavComponent,
      event: event
    });

    popover.present();
  }

  async load() {
    let loadingDialog = await this.loader.create({ message: 'Carregando Turmas...', spinner: 'crescent' });
    await loadingDialog.present();

    try {
      let resp = await this.requests.get("turmas");

      this.turmas = new Array();
      resp.forEach(elem => {
        this.turmas.push(new Turma(elem.id, elem.nome, elem.ano, elem.semestre))
      })

    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }

  showListasPresenca(turma: Turma): void {
    this.navParams.setParams({ 'turma': turma });
    this.navCtrl.navigateForward("/chamadas");
  }

  add() {
    if (this.userType === AuthService.PROFESSOR) {
      this.navParams.setParams({ "turmas": this.turmas, "turmasPage": this })
      this.navCtrl.navigateForward('/criar-turma');
    } else {
      this.navCtrl.navigateForward('/inscricao');
    }
  }

  getAlunos(turma: Turma) {
    this.navParams.setParams({ "turma": turma });
    this.navCtrl.navigateForward('/alunos-turma');
  }

  editar(turma: Turma) {
    this.navParams.setParams({ "turma": turma, "turmasPage": this });
    this.navCtrl.navigateForward('/editar-turma')
  }

  async apagar(turma: Turma) {
    let alert = await this.alertCtrl.create({
      header: 'Confirme',
      message: 'Deseja mesmo apagar essa turma?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: () => {
            this.commitApagar(turma);
          }
        }
      ]
    });
    alert.present();
  }

  ordenarTurmas() {
    this.turmas.sort((t1: Turma, t2: Turma) => {
      if (t1.ano > t2.ano) return -1;
      else if (t1.ano < t2.ano) return 1;
      else {
        if (t1.semestre > t2.semestre) return -1;
        else if (t1.semestre < t2.semestre) return 1;
        else {
          if (t1.nome < t2.nome) return -1;
          else if (t1.nome > t2.nome) return 1;
          return 0;
        }
      }
    });
  }

  async commitApagar(turma: Turma) {
    let loadingDialog = await this.loader.create({ message: 'Apagando turma...', spinner: 'crescent' });
    await loadingDialog.present();

    try {
      let resp = await this.requests.delete("turma/" + turma.id)
      let indx = this.turmas.indexOf(turma);
      this.turmas.splice(indx, 1)

      let t = await this.toast.create({
        message: resp.sucesso,
        duration: 3000
      });

      t.present();
    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }

  async desinscrever(turma: Turma) {
    let alert = await this.alertCtrl.create({
      header: 'Confirme',
      message: 'Deseja mesmo se desinscrever?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: () => {
            this.commitDesinscricao(turma);
          }
        }
      ]
    });
    alert.present();
  }

  async commitDesinscricao(turma: Turma) {
    let loadingDialog = await this.loader.create({ message: 'Desinscrevendo-se...', spinner: 'crescent' });
    await loadingDialog.present();

    try {
      let resp = await this.requests.delete("inscricao/turma/" + turma.id)
      let indx = this.turmas.indexOf(turma);
      this.turmas.splice(indx, 1);

      let t = await this.toast.create({
        message: resp.sucesso,
        duration: 3000
      });

      t.present();
    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }
}
