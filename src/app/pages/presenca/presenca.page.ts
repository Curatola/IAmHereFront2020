import { Component, OnInit } from '@angular/core';
import { NavParamsService } from '../../service/nav-params.service';
import { RequestService } from '../../service/request.service';
import { Presenca } from 'src/models/presenca';
import { Turma } from 'src/models/turma';
import { Chamada } from 'src/models/chamada';
import {
  NavController,
  LoadingController,
  ToastController,
  AlertController
} from '@ionic/angular';
import { Aluno } from 'src/models/aluno';
import { ComponentCanDeactivate } from 'src/app/component-can-deactivate';

@Component({
  selector: 'app-presenca',
  templateUrl: './presenca.page.html',
  styleUrls: ['./presenca.page.scss']
})

export class PresencaPage extends ComponentCanDeactivate implements OnInit {
  presentes: Array<Presenca>;
  ausentes: Array<Presenca>;
  turma: Turma;
  chamada: Chamada;
  conteudo: string = "";
  qtdPessoasReconhecidas: number;
  comparecimento = 'areAusentes';

  ngOnInit() {}

  onChange() {
    this.isToDoBack = false;
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParamsService,
    public requests: RequestService,
    private loader: LoadingController,
    public toast: ToastController,
    public alertCtrl: AlertController
  ) {
    super(alertCtrl, navCtrl);
    this.presentes = new Array();
    this.ausentes = new Array();

    this.turma = navParams.get('turma');
    this.chamada = navParams.get('chamada');

    this.conteudo = this.chamada.conteudo;
    this.load();
  }

  async showImages() {
    this.ignore = true;
    this.navParams.setParams({ turma: this.turma, chamada: this.chamada });
    await this.navCtrl.navigateForward('/chamada-images');
    this.ignore = false;
  }

  async load() {
    const loadingDialog = await this.loader.create({
      message: 'Carregando Presencas...',
      spinner: 'crescent'
    });
    await loadingDialog.present();

    try {
      const resp = await this.requests.get(
        'turma/' + this.turma.id + '/chamada/' + this.chamada.id
      );

      this.presentes = new Array();
      this.ausentes = new Array();
      resp.presencas.forEach(elem => {
        if (elem.is_presente) {
          this.presentes.push(
            new Presenca(
              elem.id,
              elem.is_presente,
              new Aluno(elem.aluno.id, elem.aluno.nome)
            )
          );
        } else {
          this.ausentes.push(
            new Presenca(
              elem.id,
              elem.is_presente,
              new Aluno(elem.aluno.id, elem.aluno.nome)
            )
          );
        }
      });

      this.qtdPessoasReconhecidas = resp.qtdPessoasReconhecidas;
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

  async done() {
    let presencas: any[] = this.presentes.filter(
      (presenca: any) => {
        return presenca.isPresent;
      }
    );
    presencas = presencas.concat(
      this.ausentes.filter((presenca: any) => {
        return presenca.isPresent;
      })
    );
    const alunosPresentesId: any[] = presencas.map(
      (presenca: any) => {
        return presenca.aluno.id;
      }
    );

    const loadingDialog = await this.loader.create({
      message: 'Editando a chamada...',
      spinner: 'crescent'
    });
    await loadingDialog.present();

    try {
      const resp = await this.requests.put(
        'turma/' + this.turma.id + '/chamada/' + this.chamada.id,
        {
          presentes: alunosPresentesId,
          conteudo: this.conteudo
        }
      );

      const t = await this.toast.create({
        message: resp.sucesso,
        duration: 3000
      });

      t.present();
      this.chamada.conteudo = this.conteudo;

      this.navCtrl.pop();
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
}
