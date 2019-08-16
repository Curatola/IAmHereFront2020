import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonSlides, IonContent, IonInput, NavController, LoadingController, ToastController, Platform } from '@ionic/angular';
import { NavParamsService } from '../../service/nav-params.service';
import { RequestService } from '../../service/request.service';
import { AuthService } from '../../service/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmSenhaValidator } from '../../confirm-senha-validator';
import { ValidatorMessages } from '../../validator-messages';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild('senhaInput') senhaInput: IonInput;

  form: FormGroup;
  msgs = ValidatorMessages.msgs;

  userType: string;
  enableSenha: boolean;

  url: string = AuthService.API_URL;
  email: string;

  imgsLoaded = false;

  filenames: Array<string> = new Array();

  constructor(
      public navCtrl: NavController,
      public navParams: NavParamsService,
      private formBuilder: FormBuilder,
      private requests: RequestService,
      public authProvider: AuthService,
      private loader: LoadingController,
      private toast: ToastController,
      private changeDet: ChangeDetectorRef,
      public plat: Platform
    ) {
      this.form = this.formBuilder.group({
        nome: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z\u00C0-\u024F ]+$')])),
        senha: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
        confirm: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
      }, { validator: ConfirmSenhaValidator.isMatching });

      this.form.get('senha').disable();
      this.form.get('confirm').disable();
      this.userType = authProvider.getUserType();

      if (this.userType === 'Aluno') this.form.addControl('matricula', new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')])),)

      this.load();
  }

  ngOnInit() {
  }

  async getFilenamesImg() {
    try {
      const resp = await this.requests.get('/img/filename/aluno');
      resp.forEach(elem => {
        this.filenames.push(elem);
      });
    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    }
  }

  async onImageLoad() {
    if (this.imgsLoaded) this.slides.slideTo(await this.slides.length() - 1);
  }

  async load() {
    const loadingDialog = await this.loader.create({ message: 'Carregando Perfil, aguarde...', spinner: 'crescent' });
    await loadingDialog.present();

    if (this.userType == 'Aluno') this.getFilenamesImg();

    try {
      const resp = await this.requests.get('/perfil');
      this.form.get('nome').setValue(resp.nome);
      this.email = resp.email;

      if (this.userType === 'Aluno') this.form.get('matricula').setValue(resp.matricula);

    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }

  async change() {
    const senhaControl = this.form.get('senha');
    const confirmControl = this.form.get('confirm');
    if (this.enableSenha) {
      senhaControl.enable();
      confirmControl.enable();
      setTimeout(() => {
        this.senhaInput.setFocus();
      }, 50);
    } else {
      senhaControl.disable();
      confirmControl.disable();
    }
  }

  async editar() {
    const loadingDialog = await this.loader.create({ message: 'Salvando alterações, aguarde...', spinner: 'crescent' });
    await loadingDialog.present();

    const nome = this.form.get('nome').value;
    const senha = this.form.get('senha');

    const data = { nome };

    if (senha.enabled) data['senha'] = senha.value
    if (this.form.get('matricula')) data['matricula'] = this.form.get('matricula').value;

    try {
      const resp = await this.requests.put('/' + this.authProvider.getUserType().toLowerCase(), data);

      const t = await this.toast.create({
        message: resp.sucesso,
        duration: 3000
      });

      t.present();

    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }

  async apagarFoto() {
    if (this.filenames.length === 1) {
      const t = await this.toast.create({
        message: 'Você deve ter pelo menos 1 foto cadastrada!',
        duration: 3000
      });

      t.present();

      return;
    }

    const loadingDialog = await this.loader.create({ message: 'Apagando foto, aguarde...', spinner: 'crescent' });
    await loadingDialog.present();

    try {
      const filename = this.filenames[ await this.slides.getActiveIndex()];
      const resp = await this.requests.delete('/img/aluno/' + filename);

      const t = await this.toast.create({
        message: resp.sucesso,
        duration: 3000
      });

      t.present();

      this.filenames = this.filenames.filter((elem) => elem !== filename);
      this.slides.slidePrev();

      this.changeDet.detectChanges();

    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }

  async upload(imageData) {
    const loadingDialog = await this.loader.create({ message: 'Cadastrando, aguarde...', spinner: 'crescent' });
    await loadingDialog.present();
    try {
      const resp = await this.requests.uploadFile('/img/aluno', imageData, {}, true, 'PUT');
      resp.filenames.forEach(elem => {
        this.filenames.push(elem);
      });

      const t = await this.toast.create({
        message: resp.sucesso,
        duration: 3000
      });

      t.present();

      this.imgsLoaded = true;
    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }

}
