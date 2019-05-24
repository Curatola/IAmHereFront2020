import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NavController,
  LoadingController,
  ToastController,
  ActionSheetController,
  AlertController,
  IonInfiniteScroll
} from '@ionic/angular';
import { RequestService } from '../request.service';
import { CameraService } from '../camera.service';
import { Chamada } from 'src/models/chamada';
import { Turma } from 'src/models/turma';
import { File } from '@ionic-native/file/ngx';
import { NavParamsService } from '../nav-params.service';

@Component({
  selector: 'app-chamadas',
  templateUrl: './chamadas.page.html',
  styleUrls: ['./chamadas.page.scss']
})
export class ChamadasPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  chamadas: Array<Chamada>;
  page = 1;
  turma: Turma;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParamsService,
    public requests: RequestService,
    private loader: LoadingController,
    public toast: ToastController,
    public file: File,
    public camera: CameraService,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController
  ) {
    this.turma = navParams.get('turma');

    this.load();
  }

  async export() {
    try {
      const resp = await this.requests.get(
        'turma/' + this.turma.id + '/chamadas'
      );
      const fileName = 'chamada_' + resp.turma.replace(' ', '_') + '.csv';
      try {
        await this.file.checkDir(this.file.externalRootDirectory, 'IAmHere');
      } catch (err) {
        await this.file.createDir(
          this.file.externalRootDirectory,
          'IAmHere',
          false
        );
      }

      await this.file.writeFile(
        this.file.externalRootDirectory,
        'IAmHere/' + fileName,
        resp.csv,
        { replace: true }
      );

      const t = await this.toast.create({
        message:
          'Exportação feita com sucesso: IAmHere/chamada_' +
          resp.turma +
          '.csv',
        duration: 6000
      });
      t.present();
    } catch (error) {
      const t = await this.toast
        .create({
          message: error.message,
          duration: 3000
        });
      t.present();
    }
  }

  async load() {
    const loadingDialog = await this.loader.create({
      message: 'Carregando Chamadas...',
      spinner: 'crescent'
    });
    await loadingDialog.present();
    await this.doInfinit(this.infiniteScroll);
    await loadingDialog.dismiss();
  }

  async optionsClick(event, chamada: Chamada) {
    event.stopPropagation();
    event.preventDefault();
    
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Chamada ' + chamada.dateStr + ' ' + chamada.timeStr,
      buttons: [{
        text: 'Apagar',
        icon: 'trash',
        cssClass: 'trash-icon',
        handler: () => {
          this.apagarChamada(chamada);
        }
      }]
    });

    actionSheet.present();
  }

  async doInfinit(infiniteScroll: IonInfiniteScroll) {
    try {
      const resp = await this.requests.get(
        'turma/' + this.turma.id + '/chamadas/pag/' + this.page
      );
      if (!this.chamadas) {
        this.chamadas = new Array();
      }
      resp.chamadas.forEach(elem => {
        this.chamadas.push(new Chamada(elem.id, elem.dateHour, elem.conteudo));
      });

      if (!resp.hasMorePages) {
        // tslint:disable-next-line:no-unused-expression
        infiniteScroll.disabled;
      } else {
        this.page++;
      }
    } catch (error) {
      await this.requests.requestErrorPageHandler(
        error,
        this.toast,
        this.navCtrl
      );
    }

    infiniteScroll.complete();
  }

  async apagarChamada(chamada: Chamada) {
    if (!this.hasOthersChamadasInDay(chamada)) {
      const alert = await this.alertCtrl.create({
        header: 'Só existe essa chamada desse dia',
        message: 'Deseja mesmo apagar essa chamada?',
        buttons: [
          {
            text: 'Não',
            role: 'cancel'
          },
          {
            text: 'Sim',
            handler: () => {
              this.commitApagar(chamada);
            }
          }
        ]
      });
      alert.present();
    } else {
      this.commitApagar(chamada);
    }
  }

  async commitApagar(chamada: Chamada) {
    const loadingDialog = await this.loader.create({
      message: 'Apagando Chamada...',
      spinner: 'crescent'
    });
    await loadingDialog.present();

    try {
      const resp = await this.requests.delete(
        'turma/' + this.turma.id + '/chamada/' + chamada.id
      );
      const indx = this.chamadas.indexOf(chamada);
      this.chamadas.splice(indx, 1);

      const t = await this.toast
        .create({
          message: resp.sucesso,
          duration: 3000
        });
      t.present();
    } catch (error) {
      await this.requests.requestErrorPageHandler(
        error,
        this.toast,
        this.navCtrl
      );
    } finally {
      await loadingDialog.dismiss();
    }
  }

  private hasOthersChamadasInDay(chamada: Chamada) {
    const currentDate = new Date(chamada.dateHour).setHours(0, 0, 0, 0);
    return this.chamadas.some((c: Chamada) => {
      const dateC = new Date(c.dateHour).setHours(0, 0, 0, 0);
      return dateC === currentDate && c !== chamada;
    });
  }

  details(chamada: Chamada): void {
    this.navParams.setParams( { chamada: chamada, turma: this.turma })
    this.navCtrl.navigateForward('/presenca');
  }

  async uploadFile(filePath: string) {
    const loadingDialog = await this.loader.create({
      message: 'Uploading...'
    });
    await loadingDialog.present();

    try {
      const resp = await this.requests.uploadFile(
        filePath,
        'turma/' + this.turma.id + '/chamada',
        { previousPresentes: [] }
      );

      this.navParams.setParams({
        presencas: resp.presencas,
        timestampFoto: resp.timestampFoto,
        qtdPessoasReconhecidas: resp.total,
        turma: this.turma,
        chamadas: this.chamadas
      });
      this.navCtrl.navigateForward("/confirma");
    } catch (error) {
      await this.requests.requestErrorPageHandler(
        error,
        this.toast,
        this.navCtrl
      );
    } finally {
      await loadingDialog.dismiss();
    }
  }
  ngOnInit() {}
}
