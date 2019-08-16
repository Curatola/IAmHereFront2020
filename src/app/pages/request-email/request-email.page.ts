import { Component, OnInit } from '@angular/core';
import { NavParamsService } from '../../service/nav-params.service';
import { RequestService } from '../../service/request.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidatorMessages } from '../../validator-messages';
import { NavController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-request-email',
  templateUrl: './request-email.page.html',
  styleUrls: ['./request-email.page.scss'],
})
export class RequestEmailPage implements OnInit {
  formulario: FormGroup;
  msgs = ValidatorMessages.msgs;
  requestNewPassword: boolean;

  constructor(
    public navCtrl: NavController, public navParams: NavParamsService,
    private toast: ToastController, private requestProvider: RequestService,
    private loader: LoadingController,
    private formBuilder: FormBuilder) {
      this.requestNewPassword = this.navParams.get('requestNewPassword');

      this.formulario = this.formBuilder.group({
        email: new FormControl('', Validators.compose([Validators.email, Validators.required]))
      });
  }

  async requestEmail() {
    const loadingDialog = await this.loader.create({ message: 'Verificando email...', spinner: 'crescent' });
    await loadingDialog.present();
    try {

      const email = this.formulario.get('email').value;
      const rota = this.requestNewPassword ? '/reset_senha' : '/confirm_email';
      const resp = await this.requestProvider.post(rota, { email }, false);
      await loadingDialog.dismiss();

      if (resp.sucesso) {
        const t = await this.toast.create({
          message: resp.sucesso,
          duration: 3000
        });

        t.present();
      } else {
        const t = await this.toast.create({
          message: resp.warning,
          duration: 3000
        });

        t.present();
      }
    } catch (error) {
      const t = await this.toast.create({
        message: error.message,
        duration: 3000
      });

      t.present();
      await loadingDialog.dismiss();
    }
  }

  ngOnInit() {
  }
}
