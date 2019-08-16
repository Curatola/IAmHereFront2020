import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidatorMessages } from '../../validator-messages';
import { NavController, LoadingController, ToastController, Platform } from '@ionic/angular';
import { NavParamsService } from '../../service/nav-params.service';
import { RequestService } from '../../service/request.service';
import { ConfirmSenhaValidator } from '../../confirm-senha-validator';

@Component({
  selector: 'app-aluno-cadastro',
  templateUrl: './aluno-cadastro.page.html',
  styleUrls: ['./aluno-cadastro.page.scss'],
})
export class AlunoCadastroPage implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;

  form: FormGroup;
  msgs = ValidatorMessages.msgs;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParamsService,
    private request: RequestService,
    private loader: LoadingController,
    private toast: ToastController,
    private formBuilder: FormBuilder,
    public plat: Platform
    ) {
    this.form = this.formBuilder.group({
      nome: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z\u00C0-\u024F ]+$')])),
      matricula: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      senha: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      confirm: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      termosUso: new FormControl(null, Validators.requiredTrue)
    }, { validator: ConfirmSenhaValidator.isMatching });
  }

  goTermosUso(event) {
    event.preventDefault();
    this.navCtrl.navigateForward('/termos');
  }

  async upload(imageData) {
    const loadingDialog = await this.loader.create({ message: 'Cadastrando, aguarde...', spinner: 'crescent' });
    await loadingDialog.present();

    const nome = this.form.get('nome').value;
    const matricula = this.form.get('matricula').value;
    const email = this.form.get('email').value;
    const senha = this.form.get('senha').value;

    const data = { nome, matricula, login: email, senha };

    try {
      const resp = await this.request.uploadFile('/aluno', imageData, data, false);

      const t = await this.toast.create({
        message: resp.sucesso,
        duration: 3000
      });

      t.present();
      this.navCtrl.pop();
    } catch (error) {
      await this.request.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }

  ngOnInit() {
  }
}
