import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NavController,
  LoadingController,
  ToastController,
  ActionSheetController,
  AlertController,
  IonInfiniteScroll
} from '@ionic/angular';
import { RequestService } from '../../service/request.service';
import { CameraService } from '../../service/camera.service';
import { Chamada } from 'src/models/chamada';
import { Turma } from 'src/models/turma';
import { NavParamsService } from '../../service/nav-params.service';

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
  canMakeChamada: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParamsService,
    public requests: RequestService,
    private loader: LoadingController,
    public toast: ToastController,
    public camera: CameraService,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController
  ) {
    this.turma = navParams.get('turma');

    this.load();
    this.doRefresh(null);
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

  async apagarChamada(event, chamada: Chamada) {
    event.stopPropagation();
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

      const t = await this.toast.create({
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
    this.navParams.setParams( { chamada, turma: this.turma });
    this.navCtrl.navigateForward('/presenca');
  }

  async doRefresh(event){
    let resp = await this.requests.get("turma/" + this.turma.id + "/can_make_chamada");
    this.canMakeChamada = resp.canMakeChamada
    if (event) event.target.complete();
  }

  async uploadFile(filesPath: Array<string>) {
    let presentes: Array<number> = new Array();
    let sucess: boolean = true;
    let result: any;
    let timestampPrimeiraFoto: string = "";
    let qtdPessoasReconhecidas: number= 0;

    let i: number = 1;

    for (let filePath of filesPath) {
      const loadingDialog = await this.loader.create({
        message: 'Uploading foto ' + i + '...'
      });
      await loadingDialog.present();
      

      try {
        const resp = await this.requests.uploadFile(
          filePath,
          'turma/' + this.turma.id + '/chamada',
          {
            previousPresentes: presentes,
            dataHoraOriginal: (result) ? timestampPrimeiraFoto : undefined
          }
        );

        let presencas: any[] = resp.presencas.filter((presenca: any) => { return presenca.isPresente });
        presentes = presencas.map((presenca: any) => { return presenca.alunoId });

        result = {
          presencas: resp.presencas,
          turma: this.turma,
          chamadas: this.chamadas
        };

        if (i === 1) {
          timestampPrimeiraFoto = resp.timestampFoto;
        }

        qtdPessoasReconhecidas += resp.total;
        i++;
      } catch (error) {
        await this.requests.requestErrorPageHandler(
          error,
          this.toast,
          this.navCtrl
        );

        sucess = false;
      } finally {
        loadingDialog.dismiss();
      }
    }

    if (sucess) {
      result.timestampFoto = timestampPrimeiraFoto;
      result.qtdPessoasReconhecidas = qtdPessoasReconhecidas;

      this.navParams.setParams(result);
      this.navCtrl.navigateForward("/confirma");
    }
  }

  ngOnInit(): void {}
}
