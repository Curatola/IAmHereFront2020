import { Component, OnInit } from '@angular/core';
import { NavParamsService } from 'src/app/service/nav-params.service';
import { RequestService } from 'src/app/service/request.service';
import { LoadingController, ToastController, NavController, Events, AlertController } from '@ionic/angular';
import { Turma } from 'src/models/turma';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ValidatorMessages } from 'src/app/validator-messages';
import { ComponentCanDeactivate } from 'src/app/component-can-deactivate';

class ImgData {
  img: string;
  encodings: any;
  nome: string;

  constructor(img: string, encodings: any) {
    this.img = img;
    this.encodings = encodings;
  }
}

@Component({
  selector: 'app-cadastro-rapido',
  templateUrl: './cadastro-rapido.page.html',
  styleUrls: ['./cadastro-rapido.page.scss'],
})
export class CadastroRapidoPage extends ComponentCanDeactivate implements OnInit {
  imgs: Array<ImgData> = new Array();
  turma: Turma;
  form: FormGroup;
  msgs = ValidatorMessages.msgs;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParamsService,
    private requests: RequestService,
    private loader: LoadingController,
    private toast: ToastController,
    public events: Events,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController
  ) {
    super(alertCtrl, navCtrl);

    this.isToDoBack = false;
    this.turma = navParams.get('turma');

    const inputsGroup = {};
    navParams.get('data').forEach(elem => {
      inputsGroup['nome' + this.imgs.length] = new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z\u00C0-\u024F ]+$')]));
      this.imgs.push(new ImgData(elem[0], elem[1]));
    });

    this.form = this.formBuilder.group(inputsGroup);
  }

  ngOnInit() {
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  async cadastrar() {
    const loadingDialog = await this.loader.create({ message: 'Cadastrando novos Alunos...', spinner: 'crescent' });
    await loadingDialog.present();

    try {
      const resp = await this.requests.post('/inscricao/rapida/turma/' + this.turma.id, { pessoas: this.imgs });

      const t = await this.toast.create({
        message: resp.sucesso,
        duration: 3000
      });

      t.present();
      this.ignore = true;
      this.events.publish('refresh alunos');
      this.navCtrl.back();
    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }
}
