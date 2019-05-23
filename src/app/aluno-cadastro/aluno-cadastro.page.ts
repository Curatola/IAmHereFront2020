import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidatorMessages } from '../validator-messages';
import { NavController, LoadingController, ToastController, ActionSheetController } from '@ionic/angular';
import { NavParamsService } from '../nav-params.service';
import { RequestService } from '../request.service';
import { ConfirmSenhaValidator } from '../confirm-senha-validator';
import { TermosUsoPage } from '../termos-uso/termos-uso.page';
import { LoginPage } from '../login/login.page';
import { CameraService } from '../camera.service';

@Component({
  selector: 'app-aluno-cadastro',
  templateUrl: './aluno-cadastro.page.html',
  styleUrls: ['./aluno-cadastro.page.scss'],
})
export class AlunoCadastroPage implements OnInit {
  ngOnInit() {
  }
  form: FormGroup;
  msgs = ValidatorMessages.msgs;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParamsService,
    private request: RequestService,
    private loader: LoadingController,
    private toast: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private camera: CameraService,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nome: new FormControl("", Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern("^[a-zA-Z\u00C0-\u024F ]+$")])),
      matricula: new FormControl("", Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9 ]+$")])),
      email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
      senha: new FormControl("", Validators.compose([Validators.required, Validators.minLength(6)])),
      confirm: new FormControl("", Validators.compose([Validators.required, Validators.minLength(6)])),
      termosUso: new FormControl(null, Validators.requiredTrue)
    }, { "validator": ConfirmSenhaValidator.isMatching })
  }

  async cadastrar() {
    let actionSheet = await this.actionSheetCtrl.create({
      header: 'Selecione o modo',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.camera.takePicture()
              .then((imageData) => this.upload(imageData))
              .catch((error) => console.log(error))
          }
        },
        {
          text: 'Galeria',
          handler: () => {
            this.camera.getFromGallery()
              .then((imageData) => this.upload(imageData))
              .catch((error) => console.log(error))
          }
        }
      ]
    });

    actionSheet.present();
  }

  goTermosUso(event) {
    event.preventDefault();
    this.navCtrl.navigateForward("/termos");
  }

  async upload(imageData) {
    let loadingDialog = await this.loader.create({ message: 'Cadastrando, aguarde...', spinner: 'crescent' });
    await loadingDialog.present();

    let nome = this.form.get("nome").value;
    let matricula = this.form.get("matricula").value;
    let email = this.form.get("email").value;
    let senha = this.form.get("senha").value;

    let data = { "nome": nome, "matricula": matricula, "login": email, "senha": senha }

    try {
      let resp = await this.request.uploadFile(imageData, "aluno", data);
      
      let t = await this.toast.create({
        message: resp.sucesso,
        duration: 3000
      });
      
      t.present();
      this.navCtrl.pop();
    } catch (error) {
      await this.request.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss()
    }
  }
}
