import { Turma } from './../../models/turma';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Events, NavController, LoadingController, ToastController, PopoverController, AlertController, ActionSheetController, Platform } from '@ionic/angular';
import { NavParamsService } from '../nav-params.service';

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
    //public imageLoaderConfig: ImageLoaderConfig,
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

    /*
    const headers = new HttpHeaders().set("Authorization", "Bearer " + authProvider.getToken());
    this.imageLoaderConfig.setHttpHeaders(headers);
    */

    this.load();
  }

  goPresencasTurmaPage(turma: Turma){
    this.navParams.setParams({"turmas": this.turmas});
    this.navCtrl.navigateForward("presenca-turma");
  }

  async optionsClick(event, turma: Turma){
    let actionSheet;
    
    if (this.userType == "Professor"){
      actionSheet = await this.actionSheetCtrl.create({
        header: turma.nome + " - " + turma.ano+"/"+turma.semestre,
        buttons: [
          {
            text: "Editar",
            icon: "create",
            //handler: () => this.editar(turma)
          },
          {
            text: "Alunos",
            icon: "people",
            //handler: () => this.getAlunos(turma)
          }
        ]
      });
      
    } else {
      actionSheet = await this.actionSheetCtrl.create({
        header: turma.nome + " - " + turma.ano+"/"+turma.semestre,
        buttons: [
          {
            text: "Desinscrever-se",
            icon: "trash",
            cssClass: "trash-icon",
            //handler: () => this.desinscrever(turma)
          }
        ]
      });
    }
    
    actionSheet.present();
    event.stopPropagation();
    event.preventDefault();
  }

  /*goPerfil(){
    this.navCtrl.push(PerfilUsuarioPage);
  }

  popoverDeslogar(event) {
    this.popoverCtrl.create(PopoverNavPage, {"is_logoff": true})
      .present({ ev: event });
  }*/

  async load() {
    let loadingDialog = await this.loader.create({ message: 'Carregando Turmas...', spinner: 'crescent' });
    await loadingDialog.present();

    try {
      let resp = await this.requests.get("turmas");

      this.turmas = new Array();
      resp.forEach(elem => {
        this.turmas.push(new Turma(elem.id,elem.nome,elem.ano,elem.semestre))
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

  /*
  add(){
    if (this.userType === AuthProvider.PROFESSOR){
      this.navCtrl.push(CriarTurmaPage, {"turmas": this.turmas, "turmasPage": this});
    } else {
      this.navCtrl.push(InscricaoPage);
    }
  }

  getAlunos(turma: Turma){
    this.navCtrl.push(AlunosTurmaPage, {"turma": turma});
  }

  editar(turma: Turma){
    this.navCtrl.push(EditarTurmaPage, {"turma": turma, "turmasPage": this})
  }

  apagar(turma: Turma){
    let alert = this.alertCtrl.create({
      title: 'Confirme',
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

  ordenarTurmas(){
    this.turmas.sort((t1: Turma, t2:Turma) => {
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

  async commitApagar(turma: Turma){
    let loadingDialog = this.loader.create({ content: 'Apagando turma...', spinner: 'crescent' });
    await loadingDialog.present();

    try{
      let resp = await this.requests.delete("turma/" + turma.id)
      let indx = this.turmas.indexOf(turma);
      this.turmas.splice(indx,1);

      this.toast.create({
        message: resp.sucesso,
        duration: 3000
      }).present();
    } catch (error){
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl, LoginPage);
    }finally{
      await loadingDialog.dismiss();
    }
  }

  desinscrever(turma: Turma){
    let alert = this.alertCtrl.create({
      title: 'Confirme',
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

  async commitDesinscricao(turma: Turma){
    let loadingDialog = this.loader.create({ content: 'Desinscrevendo-se...', spinner: 'crescent' });
    await loadingDialog.present();

    try{
      let resp = await this.requests.delete("inscricao/turma/" + turma.id)
      let indx = this.turmas.indexOf(turma);
      this.turmas.splice(indx,1);

      this.toast.create({
        message: resp.sucesso,
        duration: 3000
      }).present();
    } catch (error){
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl, LoginPage);
    }finally{
      await loadingDialog.dismiss();
    }
  }
*/


}
