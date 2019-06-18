import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { NavParamsService } from '../../service/nav-params.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidatorMessages } from '../../validator-messages';
import { ConfirmSenhaValidator } from '../../confirm-senha-validator';
import { RequestService } from '../../service/request.service';

@Component({
  selector: 'app-prof-cadastro',
  templateUrl: './prof-cadastro.page.html',
  styleUrls: ['./prof-cadastro.page.scss'],
})
export class ProfCadastroPage implements OnInit {
  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: new FormControl("",Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern("^[a-zA-Z\u00C0-\u024F ]+$")])),
      email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
      senha: new FormControl("",Validators.compose([Validators.required, Validators.minLength(6)])),
      confirm: new FormControl("",Validators.compose([Validators.required, Validators.minLength(6)]))
    }, { "validator": ConfirmSenhaValidator.isMatching })
  }

  form: FormGroup;
  msgs = ValidatorMessages.msgs;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParamsService,
    private request: RequestService,
    private loader: LoadingController,
    private toast: ToastController,
    private formBuilder: FormBuilder) {
  }


  async cadastrar(){
    let loadingDialog = await this.loader.create({ message: 'Cadastrando, aguarde...', spinner: 'crescent' });
    await loadingDialog.present();

    let nome = this.form.get("nome").value;
    let email = this.form.get("email").value;
    let senha = this.form.get("senha").value;

    let data = {"nome": nome, "login": email, "senha": senha} 
    try{
      let resp = await this.request.post("professor", data, false)
      let t = await this.toast.create({
        message: resp.sucesso,
        duration: 3000
      });

      t.present();
      this.navCtrl.pop();
    }catch (error){
      await this.request.requestErrorPageHandler(error, this.toast, this.navCtrl);
    }finally{
      await loadingDialog.dismiss();
    }
  }
}
