import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, PopoverController, AlertController } from '@ionic/angular';
import { NavParamsService } from 'src/app/service/nav-params.service';
import { AuthService } from 'src/app/service/auth.service';
import { RequestService } from 'src/app/service/request.service';
import { Chamada } from 'src/models/chamada';
import { SyncronizationService } from 'src/app/service/syncronization.service';

@Component({
  selector: 'app-popover-nav',
  templateUrl: './popover-nav.component.html',
  styleUrls: ['./popover-nav.component.scss'],
})
export class PopoverNavComponent implements OnInit {

  ngOnInit() {}

  isLogoff: any;
  isGoPerfil: boolean;
  chamada: Chamada;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParamsService,
    public auth: AuthService,
    private popoverController: PopoverController,
    private loader: LoadingController,
    public toast: ToastController,
    private requests: RequestService,
    private alertCtrl: AlertController,
    private sync: SyncronizationService
    ) {
      this.isLogoff = navParams.get('is_logoff');
      this.isGoPerfil = navParams.get('isGoPerfil');
  }

  async logoff() {
    const alert = await this.alertCtrl.create({
      header: 'Confirme!',
      message: 'Deseja mesmo fazer logoff?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: () => {
            this.commitLogoff();
          }
        }
      ]
    });
    alert.present();
  }

  async sincronizar() {
    this.sync.makeSync(false);
    this.popoverController.dismiss();
  }

  async commitLogoff() {
    const loadingDialog = await this.loader.create({ message: 'Fazendo logoff...', spinner: 'crescent' });
    await loadingDialog.present();
    try {
      await this.auth.deslogar();
      this.sync.removeAccount();

      await this.popoverController.dismiss();
      await this.navCtrl.navigateRoot('/login');
    } catch (error) {
      await this.popoverController.dismiss();
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }

  async goPerfil() {
    this.popoverController.dismiss();
    this.navCtrl.navigateForward('/perfil-usuario');
  }
}
