import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ValidatorMessages } from '../../validator-messages';
import { AuthService } from '../../service/auth.service';
import { RequestService } from '../../service/request.service';
import { NavParamsService } from '../../service/nav-params.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  msgs = ValidatorMessages.msgs;

  constructor(
    private navCtrl: NavController, private toast: ToastController,
    private authService: AuthService, private requests: RequestService,
    private loader: LoadingController, private alertCtrl: AlertController,
    private formBuilder: FormBuilder, public navParams: NavParamsService) {
      this.form = this.formBuilder.group({
        email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
        senha: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
        remember: new FormControl(false)
      });
  }

  async login() {
    const loadingDialog = await this.loader.create({ message: 'Aguarde autenticação...', spinner: 'crescent' });
    await loadingDialog.present();
    try {

      const email = this.form.get('email').value;
      const senha = this.form.get('senha').value;
      const remember = this.form.get('remember').value;

      await this.authService.login(email, senha, remember);

      if (this.authService.getUserType() === 'Aluno') {
        const resp =  await this.requests.get('/usuario/term_accepted');

        if (!resp.termAccepted) {
          const confirm = await this.alertCtrl.create({
            header: 'Termos de uso',
            message: 'Ao prosseguir você está concordando com os termos de uso',
            buttons: [
              {
                text: 'Concordo',
                role: 'concordo',
                handler: () => {
                  this.acceptTerm();
                }
              },
              {
                text: 'Termos de Uso',
                role: 'Termo',
                handler: () => {
                  this.navCtrl.navigateForward('/termos');
                }
              }
            ]
          });
          confirm.present();
          confirm.onDidDismiss().then(role => {
            if (role !== 'concordo') {
              this.authService.deslogar();
            }
          });
        } else {
          this.goTurmasPage();
        }
      } else {
        this.goTurmasPage();
      }

    } catch (error) {
      const t = await this.toast.create({
        message: error.message,
        duration: 3000
      });
      t.present();

    } finally {
      await loadingDialog.dismiss();
    }
  }

  async goTurmasPage() {
    const t = await this.toast.create({
      message: 'Logado como ' + this.authService.getUserType(),
      duration: 3000
    });
    t.present();
    this.navCtrl.navigateRoot('/turmas');
  }

  async acceptTerm() {
    await this.requests.post('/usuario/term_accepted', {});
    this.navCtrl.navigateRoot('/turmas');
  }

  goPageNewConfirm(event) {
    event.preventDefault();
    this.navParams.setParams({requestNewPassword: false});
    this.navCtrl.navigateForward('/request-email');
  }

  goPageEsqueciSenha(event) {
    event.preventDefault();
    this.navParams.setParams({requestNewPassword: true});
    this.navCtrl.navigateForward('/request-email');
  }

  async goPageProfCadastro(event) {
    event.preventDefault();
    this.navCtrl.navigateForward('/prof-cadastro');
  }

  goPageAlunoCadastro(event) {
    event.preventDefault();
    this.navCtrl.navigateForward('/aluno-cadastro');
  }

  ngOnInit(): void {
  }
}
