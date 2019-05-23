import { Component, OnInit } from '@angular/core';
import { NavParamsService } from '../nav-params.service';
import { RequestService } from '../request.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidatorMessages } from '../validator-messages';
import { NavController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-request-email',
  templateUrl: './request-email.page.html',
  styleUrls: ['./request-email.page.scss'],
})
export class RequestEmailPage implements OnInit {

  ngOnInit() {
  }

  formulario: FormGroup;
  msgs = ValidatorMessages.msgs;
  requestNewPassword: boolean
  

  constructor(public navCtrl: NavController, public navParams: NavParamsService,
    private toast: ToastController, private requestProvider: RequestService,
    private loader: LoadingController,
    private formBuilder: FormBuilder) {
      this.requestNewPassword = this.navParams.get("requestNewPassword")

      this.formulario = this.formBuilder.group({
        email: new FormControl("", Validators.compose([Validators.email, Validators.required]))
      })
  }

  async requestEmail() {
    let loadingDialog = await this.loader.create({ message: 'Verificando email...', spinner: 'crescent' });
    await loadingDialog.present();
    try{

      let email = this.formulario.get("email").value;
      let rota = this.requestNewPassword ? "reset_senha" : "confirm_email"
      let resp = await this.requestProvider.post(rota, {"email": email}, false);
      await loadingDialog.dismiss()

      if (resp.sucesso){
        let t = await this.toast.create({
          message: resp.sucesso,
          duration: 3000
        });
        
        t.present();
      } else {
        let t = await this.toast.create({
          message: resp.warning,
          duration: 3000
        });
        
        t.present();
      }
    } catch (error){
      let t = await this.toast.create({
        message: error.message,
        duration: 3000
      }); 
      
      t.present();
      await loadingDialog.dismiss();
    }
  }

}
