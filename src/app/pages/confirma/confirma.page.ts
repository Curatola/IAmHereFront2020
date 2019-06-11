import { Component, OnInit } from '@angular/core';
import { NavParamsService } from '../../service/nav-params.service';
import { RequestService } from '../../service/request.service';
import { AuthService } from '../../service/auth.service';
import { Presenca } from 'src/models/presenca';
import { Chamada } from 'src/models/chamada';
import { Turma } from 'src/models/turma';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Aluno } from 'src/models/aluno';
import { CameraService } from '../../service/camera.service';
import { ComponentCanDeactivate } from 'src/app/component-can-deactivate';

@Component({
  selector: 'app-confirma',
  templateUrl: './confirma.page.html',
  styleUrls: ['./confirma.page.scss'],
})
export class ConfirmaPage extends ComponentCanDeactivate implements OnInit {

  ngOnInit() {
  }

  onChange() {
    this.isToDoBack = false;
  }

  presentes: Array<Presenca>
  ausentes: Array<Presenca>
  conteudo: string = ''
  chamadas: Array<Chamada>;

  turma: Turma
  comparecimento: string = 'areAusentes'
  timestampFoto: number;
  qtdPessoasReconhecidas: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParamsService,
    public requests: RequestService,
    public authProvider: AuthService,
    private loader: LoadingController,
    public toast: ToastController,
    public camera: CameraService,
    public alertCtrl: AlertController,
  ) {
    super(alertCtrl, navCtrl);

    this.turma = navParams.get('turma');
    this.timestampFoto = navParams.get("timestampFoto")
    let presencas = navParams.get('presencas');
    this.qtdPessoasReconhecidas = navParams.get("qtdPessoasReconhecidas")
    this.chamadas = navParams.get("chamadas");
    this.atualizaListas(presencas);
  }

  atualizaListas(presencas: [any]) {
    this.presentes = new Array();
    this.ausentes = new Array();

    presencas.forEach(elem => {
      let presenca: any = new Presenca(0, elem.isPresente, new Aluno(elem.alunoId, elem.alunoNome))
      if (presenca.isPresent) this.presentes.push(presenca);
      else this.ausentes.push(presenca);
    })
  }

  async getConteudo() {
    const prompt = await this.alertCtrl.create({
      header: 'Conteúdo da Aula',
      message: "Descreva o conteúdo da aula.",
      inputs: [
        {
          name: 'conteudo',
          placeholder: 'Conteúdo',
          value: this.conteudo
        },
      ],
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            this.conteudo = data.conteudo

          }
        }
      ]
    });
    prompt.present();

  }

  async done() {
    let presencas: any[] = this.presentes.filter((presenca: any, index, presencas: Presenca[]) => { return !presenca.checked });
    presencas = presencas.concat(this.ausentes.filter((presenca: any, index, presencas: Presenca[]) => { return presenca.checked }));
    let alunosPresentesId: any[] = presencas.map((presenca: any, index, presencas: Presenca[]) => { return presenca.aluno.id });

    let loadingDialog = await this.loader.create({ message: 'Confirmando nova chamada...', spinner: 'crescent' });
    await loadingDialog.present();

    try {
      let resp = await this.requests.post("turma/" + this.turma.id + "/chamada",
        {
          "presentes": alunosPresentesId,
          "dataHora": this.timestampFoto,
          "qtdPessoasReconhecidas": this.qtdPessoasReconhecidas,
          "conteudo": this.conteudo
        });

      let t = await this.toast.create({
        message: resp.sucesso,
        duration: 3000
      });

      t.present();

      this.chamadas.push(new Chamada(resp.id, this.timestampFoto, this.conteudo));
      this.chamadas.sort((c1: Chamada, c2: Chamada) => {
        if (c1.dateHour > c2.dateHour) return -1;
        else if (c1.dateHour < c2.dateHour) return 1;

        return 0;
      })

      this.navCtrl.pop();
    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }

  async uploadFile(filePath: string) {
    let loadingDialog = await this.loader.create({ message: "Uploading...", spinner: 'crescent' });
    await loadingDialog.present();

    let presencas: any[] = this.presentes.filter((presenca: any, index, presencas: Presenca[]) => { return !presenca.checked });
    presencas = presencas.concat(this.ausentes.filter((presenca: any, index, presencas: Presenca[]) => { return presenca.checked }));
    let alunosPresentesId: any[] = presencas.map((presenca: any, index, presencas: Presenca[]) => { return presenca.aluno.id });

    try {
      let resp = await this.requests.uploadFile(
        filePath,
        "turma/" + this.turma.id + "/chamada",
        {
          "previousPresentes": alunosPresentesId,
          "dataHoraOriginal": this.timestampFoto
        })

      this.atualizaListas(resp.presencas);
      this.qtdPessoasReconhecidas += resp.total
    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }
}
