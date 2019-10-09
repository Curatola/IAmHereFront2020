import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {
  NavController,
  LoadingController,
  ToastController,
  ActionSheetController,
  AlertController,
  IonInfiniteScroll,
  Platform
} from '@ionic/angular';
import { RequestService } from '../../service/request.service';
import { Chamada } from 'src/models/chamada';
import { Turma } from 'src/models/turma';
import { NavParamsService } from '../../service/nav-params.service';
import { SyncronizationService } from 'src/app/service/syncronization.service';

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
  canMakeChamada = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParamsService,
    public requests: RequestService,
    private loader: LoadingController,
    public toast: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    private changeDet: ChangeDetectorRef,
    public plat: Platform,
    private sync: SyncronizationService
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
    await this.doInfinit();
    await loadingDialog.dismiss();
  }

  async doInfinit() {
    try {
      const resp = await this.requests.get(
        '/turma/' + this.turma.id + '/chamadas/pag/' + this.page
      );
      if (!this.chamadas) {
        this.chamadas = new Array();
      }
      resp.chamadas.forEach(elem => {
        this.chamadas.push(new Chamada(elem.id, elem.dateHour, elem.conteudo, elem.is_commited, elem.is_edited));
      });

      if (!resp.hasMorePages) {
        this.infiniteScroll.disabled = true;
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

    this.infiniteScroll.complete();
  }

  async apagarChamada(event, chamada: Chamada) {
    event.stopPropagation();

    const alert = await this.alertCtrl.create({
      header: 'Deseja mesmo apagar essa chamada?',
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
  }

  async commitApagar(chamada: Chamada) {
    const loadingDialog = await this.loader.create({
      message: 'Apagando Chamada...',
      spinner: 'crescent'
    });
    await loadingDialog.present();

    try {
      const resp = await this.requests.delete(
        '/turma/' + this.turma.id + '/chamada/' + chamada.id
      );
      const indx = this.chamadas.indexOf(chamada);
      this.chamadas.splice(indx, 1);

      const t = await this.toast.create({
        message: resp.sucesso,
        duration: 3000
      });
      t.present();

      this.sync.setIsSync(false);

      this.changeDet.detectChanges();
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

  details(chamada: Chamada): void {
    this.navParams.setParams( { chamada, turma: this.turma });
    this.navCtrl.navigateForward('/presenca');
  }

  async doRefresh(event) {
    const resp = await this.requests.get('/turma/' + this.turma.id + '/can_make_chamada');
    this.canMakeChamada = resp.canMakeChamada;
    if (event) event.target.complete();
  }

  async uploadFile(data: any) {
    const pathFotos: Array<string> = data.pathFotos;
    const chamadaApagar: Chamada = data.chamadaApagar;

    if (chamadaApagar) {
      await this.commitApagar(chamadaApagar);
    }

    let presentes: Array<number> = new Array();
    let sucess = true;
    let result: any;
    let timestampPrimeiraFoto = -1;
    let qtdPessoasReconhecidas = 0;

    let i = 1;

    for (const pathFoto of pathFotos) {
      const loadingDialog = await this.loader.create({
        message: 'Uploading foto ' + i + '...'
      });
      await loadingDialog.present();

      try {
        const resp = await this.requests.uploadFile(
          '/turma/' + this.turma.id + '/chamada',
          pathFoto,
          {
            previousPresentes: presentes,
            dataHoraOriginal: (result) ? timestampPrimeiraFoto : undefined
          }
        );

        const presencas: any[] = resp.presencas.filter((presenca: any) => presenca.isPresente);
        presentes = presencas.map((presenca: any) => presenca.alunoId);

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
        await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);

        sucess = false;
      } finally {
        loadingDialog.dismiss();
      }
    }

    if (sucess) {
      result.timestampFoto = timestampPrimeiraFoto;
      result.qtdPessoasReconhecidas = qtdPessoasReconhecidas;
      
      this.sync.setIsSync(false);
      this.navParams.setParams(result);
      this.navCtrl.navigateForward('/confirma');
    }
  }

  ngOnInit(): void {}
}
