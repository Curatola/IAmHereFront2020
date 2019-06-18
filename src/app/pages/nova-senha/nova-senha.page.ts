import { Component, OnInit } from '@angular/core';
import { NavParamsService } from '../../service/nav-params.service';
import { RequestService } from '../../service/request.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidatorMessages } from '../../validator-messages';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { ConfirmSenhaValidator } from '../../confirm-senha-validator';

@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.page.html',
  styleUrls: ['./nova-senha.page.scss'],
})
export class NovaSenhaPage implements OnInit {

  ngOnInit() {
  }

  resetform:FormGroup;
  msgs = ValidatorMessages.msgs;
  token: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParamsService, 
    private toast: ToastController, 
    private requestProvider: RequestService,
    private loader: LoadingController, 
    private formBuilder: FormBuilder) {
      this.token = navParams.get("token");

      this.resetform = this.formBuilder.group({
        senha: new FormControl("",Validators.compose([Validators.required, Validators.minLength(6)])),
        confirm: new FormControl("",Validators.compose([Validators.required, Validators.minLength(6)]))
      },{"validator": ConfirmSenhaValidator.isMatching})
    }
    
  async novasenha() {
    let loadingDialog = await this.loader.create({ message: 'Verificando nova senha...', spinner: 'crescent' });
    await loadingDialog.present();
    try{
      let senha = this.resetform.get("senha").value;

      let resp = await this.requestProvider.put("reset_senha",{"novasenha":senha, "token": this.token},false)
      await loadingDialog.dismiss()

      let t = await this.toast.create({
        message: resp.sucesso,
        duration: 3000
      });
      
      t.present();
      this.navCtrl.navigateRoot("/login")
    } catch (error){
      let t = await this.toast.create({
        message: error.message,
        duration: 3000
      })
      
      t.present();

      await loadingDialog.dismiss();
    }
  }

}
